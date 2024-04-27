import json
import os
import re
import sys
from typing import Any

import psycopg2
from django.conf import settings
from django.template.response import TemplateResponse
from psycopg2 import sql

from backend.databases.models import UserDatabaseSession


def create_tables_from_dict(database_schema: dict[str, Any]):

    conn = psycopg2.connect(database="postgres", user="postgres", password="postgres", host="localhost", port="5432")
    conn.autocommit = True
    cur = conn.cursor()

    db_name = database_schema["name"].lower()
    cur.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{db_name}'")
    exists = cur.fetchone()
    if not exists:
        cur.execute(f'CREATE DATABASE {db_name}')

    conn = psycopg2.connect(database=db_name, user="postgres", password="postgres", host="localhost", port="5432")
    cur = conn.cursor()


    # Создание таблиц
    tables = database_schema["tables"]
    for table in tables:
        create_table(cur, table)

    # Создание связей
    relations = database_schema["relations"]
    for relation in relations:
        create_relation(cur, relation)

    conn.commit()
    conn.close()


def create_table(cur, table):
    table_name = table["title"]
    props = table["props"]

    create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} ("

    for prop in props:
        prop_name = prop["name"]
        prop_type = prop["type"]
        is_key = "PRIMARY KEY" if prop["is_key"] else ""
        create_table_query += f"{prop_name} {prop_type} {is_key}, "

    create_table_query = create_table_query.rstrip(", ") + ")"

    cur.execute(create_table_query)
    print(f"Table {table_name} created")


# Функция для создания связи между таблицами
def create_relation(cur, relation):
    source_table = relation["source"]["table_name"]
    source_field = relation["source"]["field_name"]
    target_table = relation["target"]["table_name"]
    target_field = relation["target"]["field_name"]

    create_relation_query = f"ALTER TABLE {target_table} ADD CONSTRAINT fk_{target_table}_{target_field} FOREIGN KEY ({target_field}) REFERENCES {source_table}({source_field})"

    # Выполнение запроса на создание связи
    cur.execute(create_relation_query)


def create_user_database(db_name: str, user_id: int):
    conn = psycopg2.connect(database="postgres", user="postgres", password="postgres", host="localhost", port="5432")
    conn.autocommit = True
    cur = conn.cursor()

    cur.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{db_name}_{user_id}'")
    exists = cur.fetchone()
    if not exists:
        cur.execute(f"CREATE DATABASE {db_name}_{user_id} WITH TEMPLATE {db_name} OWNER postgres;")

    conn.close()


def execute_query_at_sandbox(db_name: str, raw_query: str):
    conn = psycopg2.connect(database=db_name.lower(), user="postgres", password="postgres", host="127.0.0.1", port="5432")
    cur = conn.cursor()

    cur.execute(raw_query)

    # TODO Обработка ошибок
    if cur.description:
        result = cur.fetchall()
        columns = [desc[0] for desc in cur.description]
        response = {
            "columns": columns,
            "rows": []
        }
        for row in result:
            response['rows'].append(dict(zip(columns, row)))
    else:
        response = {
            "columns": ["result"],
            "rows": [
                {
                    "result": cur.statusmessage
                }
            ]
        }

    conn.commit()
    conn.close()

    return response


#####################################
def get_database_schema_from_psql(database_name: str = "aggregator"):
    # Выполняем команду psql для получения списка таблиц
    import subprocess
    psql_list_tables = subprocess.Popen(['psql', '-d', database_name, '-c', '\dt'], stdout=subprocess.PIPE)
    output_list_tables = psql_list_tables.communicate()[0]

    # Парсим вывод и находим строки с информацией о таблицах
    pattern = re.compile(r'public\s*\|\s*([\w_-]+)\s*\|')
    matches = pattern.findall(output_list_tables.decode())

    if not matches:
        return None

    # Создаем структуру database_schema
    database_schema = {
        'title': database_name,
        'name': database_name,
        'description': '',
        'tables': [],
        'relations': []
    }

    # Получаем информацию о каждой таблице
    for table_name in matches:
        # обработать отдельно таблицу user
        if table_name == 'user':
            # table_name = "users"
            continue

        table_schema = {
            'title': table_name,
            'name': table_name,
            'description': '',
            'props': []
        }

        # Выполняем команду psql для получения списка столбцов таблицы
        psql_list_columns = subprocess.Popen(['psql', '-d', database_name, '-c', f'\\d {table_name}'], stdout=subprocess.PIPE)
        output_list_columns = psql_list_columns.communicate()[0].decode(sys.stdout.encoding)

        matches_columns = [column_row.split("|") for column_row in output_list_columns.split("\n")[1:]]

        # Получаем информацию о каждом столбце
        for column in matches_columns[2:]:
            if column[0] == 'Indexes:':
                break

            column_name = column[0].strip()
            column_type = column[1].strip()

            prop_schema = {
                'is_key': True if column_name == "id" else False,
                'name': column_name,
                'type': column_type,
                'description': ''
            }
            table_schema['props'].append(prop_schema)

        database_schema['tables'].append(table_schema)

    # Выполняем команду psql для получения списка внешних ключей таблиц
    q = "SELECT conrelid::regclass AS table_name, conname AS foreign_key, pg_get_constraintdef(oid) FROM pg_constraint WHERE contype = 'f' AND connamespace = 'public'::regnamespace ORDER BY conrelid::regclass::text, contype DESC;"
    conn = psycopg2.connect(database=database_name, user="postgres", password="postgres", host="127.0.0.1", port="5432")
    cur = conn.cursor()
    cur.execute(q)
    output_list_fkeys = cur.fetchall()

    pattern = re.compile(r'\((.*?)\)[^\(]*\((.*?)\)')

    # Получаем информацию о каждом внешнем ключе
    for row in output_list_fkeys:
        table_name = row[0]
        foreign_key = pattern.findall(row[2])[0][0]
        foreign_table, target_column, _ = foreign_key.partition("_id")
        target_column = target_column.removeprefix("_")

        # Находим соответствующую таблицу и свойства
        table_schema = [table for table in database_schema['tables'] if table['name'] == table_name]
        target_table_schema = [table for table in database_schema['tables'] if table['name'] == foreign_table]
        if not target_table_schema:
            foreign_table = row[2].split()[4].removesuffix('(id)')
            target_table_schema = [table for table in database_schema['tables'] if table['name'] == foreign_table]

        if table_schema and target_table_schema:
            # Создаем отношение между таблицами
            # TODO проверить правильность, мб перепутаны местами source и target - вроде ок
            relation_schema = {
                # 'target': {
                'source': {
                    "table_name": table_name,
                    "field_name": foreign_key,
                },
                # 'source': {
                'target': {
                    "table_name": foreign_table,
                    "field_name": target_column,
                },
                'type': 'one-to-many'  # В данном примере предполагаем, что отношение является один-ко-многим
            }
            database_schema['relations'].append(relation_schema)

    return database_schema


def create_db_from_dump(file):
    file.name = file.name.replace(' ', '_')
    file.name = file.name.replace('-', '_')
    db_name, extension = file.name.split('.')
    with open(os.path.join("/tmp", file.name), "wb") as f:
            f.write(file.read())

    import subprocess
    path = os.path.join("/tmp", file.name)
    subprocess.call(['ls'], stdout=subprocess.PIPE)
    subprocess.call(['psql', '-U', "postgres", '-c', f'create database {db_name}', ], stdout=subprocess.PIPE)
    load_dump = subprocess.Popen(f"psql {db_name} < {path}", shell=True, env={'PGPASSWORD': 'postgres', "PGUSER": "postgres", "PATH": "/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"})
    os.waitpid(load_dump.pid, 0)

    os.remove(os.path.join("/tmp", file.name))

    return db_name

# def upload_sql_db_dump(file):
#     # model = modeladmin.model

    # Обработка загрузки файла
    # create_db_from_dump(file)

        # Обработка файла, доступного в file

        # Вывод сообщения об успешной загрузке файла или обработка ошибок

    # Отобразить страницу с формой загрузки файла
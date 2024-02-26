import psycopg2


def create_database(json_schema: dict, db_name: str) -> None:
    conn = psycopg2.connect(
        database="postgres",
        user='postgres',
        password='password',
        host='127.0.0.1',
        port='5432'
    )
    conn.autocommit = True

    cursor = conn.cursor()

    # Preparing query to create a database
    sql = f"CREATE database {db_name};"

    # Creating a database
    cursor.execute(sql)
    # Closing the connection
    conn.close()

    conn = psycopg2.connect(
        database=db_name,
        user='postgres',
        password='password',
        host='127.0.0.1',
        port='5432'
    )
    # Create a cursor object using the cursor() method
    cursor = conn.cursor()

    # Create tables based on the JSON data
    for table in json_schema[0]["tables"]:
        table_name = table["id"]
        columns = [f"{prop['name']} {prop['type']}" for prop in table["props"]]
        columns_str = ", ".join(columns)
        create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} ({columns_str})"
        cursor.execute(create_table_query)

    # Commit your changes
    conn.commit()

    # Close the cursor and connection
    cursor.close()
    conn.close()
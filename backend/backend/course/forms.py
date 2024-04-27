from django import forms

from backend.course.models import PracticalTask, UserTask


class TaskListForm(forms.Form):
    type = forms.ChoiceField(choices=PracticalTask.Type.choices, required=False)
    status = forms.ChoiceField(choices=UserTask.Status.choices, required=False)
    difficulty = forms.ChoiceField(choices=PracticalTask.Difficulty.choices, required=False)
    order_by = forms.ChoiceField(
        choices=(
            ("task_order", "task_order"),
            ("difficulty", "difficulty"),
            ("-difficulty", "-difficulty"),
        ),
        required=False
    )


class PracticalTaskFormAdmin(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self._request_user = kwargs.pop("_request_user", None)
        super().__init__(*args, **kwargs)

    def clean(self):
        cleaned_data = super().clean()
        if cleaned_data["database"].author_id != self._request_user.id and self._request_user.is_superuser is False:
            raise forms.ValidationError({"database": "Нельзя добавлять задания в чужую базу данных"})

        return cleaned_data


class TaskAnswerForm(forms.Form):
    practical_task_id = forms.IntegerField(required=True)
    answer = forms.CharField(required=True)

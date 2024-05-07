from django import forms


class UsernameForm(forms.Form):
    username = forms.CharField()


class UsernamePasswordForm(UsernameForm):
    password = forms.CharField()


class UserRegistrationForm(forms.Form):
    link = forms.CharField(max_length=128, required=False)

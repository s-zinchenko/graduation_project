from django import forms


class UsernameForm(forms.Form):
    username = forms.CharField()


class UsernamePasswordForm(UsernameForm):
    password = forms.CharField()

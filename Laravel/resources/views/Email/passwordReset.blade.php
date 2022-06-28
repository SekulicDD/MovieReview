@component('mail::message')
# Reset password request

Click on the button bellow to change your password.

@component('mail::button', ['url' => 'http://localhost:4200/reset-password-response?token='.$token])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent

@component('mail::message')
{{__("mail.passwordReset")["created"]}}

<div class="wrap">
    <div class="mail">
        <p class="title">
            {{--<span class="sub02 bold">소셜크롤러</span>(으)로부터 --}}<span class="bold">비밀번호 초기화</span> 메일이 도착했습니다.
        </p>

        <div class="align-center">
            <a href="{{$url}}" class="button--middle bg-sub02">
                {{__("mail.passwordReset")["name"]}}
            </a>
        </div>
    </div>
    <div class="copyright">
        © {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')
    </div>
</div>


@endcomponent

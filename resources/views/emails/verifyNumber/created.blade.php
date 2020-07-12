@component('mail::message')
    <div class="wrap">
        <div class="mail">
            <p class="title">
                {{--<span class="sub02 bold">소셜크롤러</span>(으)로부터 --}}<span class="bold">인증번호</span>가 도착했습니다.
            </p>

            <div class="box-number align-center">
               <span class="bold">인증번호</span> : <span class="sub02 bold">{{$verifyNumber->number}}</span>
            </div>

            <div class="align-center">
                <a href="{{config('app.url')}}" class="button--middle bg-sub02">사이트로 이동</a>
            </div>
        </div>
        <div class="copyright">
            © {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')
        </div>
    </div>

@endcomponent

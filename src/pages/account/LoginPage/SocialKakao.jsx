import KakaoLoginSymbol from '../../../assets/socialSymbol/KakaoSymbol.svg';
import Button from '../../../components/Button';

const SocialKakao = ()=>
{
    const Rest_api_key = import.meta.env.VITE_KAKAO_KEY
    const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URL
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }
    return (
        <Button mode="custom" onClick={handleLogin} isLong={true} customStyle="grid grid-cols-[10%_90%] place-items-center !text-black/[0.85] bg-[#FEE500] border-[#FEE500] hover:!text-[#FEE500]">
            <img src={KakaoLoginSymbol} width={25} fill='#000000' alt='카카오 소셜 로그인' />
            <div>카카오 계정으로 로그인</div>
        </Button>
    )
}
export default SocialKakao
import NaverSymbol from "../../../assets/socialSymbol/NaverSymbol.png";
import Button from "../../../components/Button";

const SocialNaver = ()=>
{
    const Rest_api_key = import.meta.env.VITE_NAVER_KEY
    const redirect_uri = import.meta.env.VITE_NAVER_REDIRECT_URL
    const state = import.meta.env.VITE_NAVER_STATE
    // oauth 요청 URL
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&state=${state}`;
    const handleLogin = ()=>{
        window.location.href = naverURL;
    }
    return (
        <Button mode="custom" onClick={handleLogin} isLong={true} customStyle="grid grid-cols-[10%_90%] place-items-center !text-white/[0.85] bg-[#03C75A] border-[#03C75A] hover:!text-[#03C75A]">
            <img width={25} src={NaverSymbol} alt="네이버 심볼" />
            <div>네이버 계정으로 로그인</div>
        </Button>
    )
}

export default SocialNaver;

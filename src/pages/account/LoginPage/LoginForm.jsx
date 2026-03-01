import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
// import GoogleSymbol from '../../../assets/socialSymbol/GoogleSymbol.png';
import SocialKakao from './SocialKakao';
import SocialNaver from './SocialNaver';

function LoginForm({setIsLogin}) {

    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")

    const nav = useNavigate();

    const onIdHandler = (e) => {
        setId(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const url = import.meta.env.VITE_API_URL + "/accounts/login/";
        const req = {
            'username': Id,
            'password': Password,
        };
        const config = {"Content-Type": 'application/json'};

        axios.post(url, req, config)
            .then(res => {
                console.log("Login success");
                sessionStorage.setItem('aivle19_username', req.username);
                sessionStorage.setItem('aivle19_token', res.data.token);
                setIsLogin(true);
                nav('/');
            }).catch(err => {
                // 에러 처리
                console.log(err.response.data.message);
                alert("아이디 또는 비밀번호를 확인해 주세요.")
            });
      };

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center', display:'flex', flexDirection:'column' }}
            className='w-full m-auto p-2'
        >
            <h3 className='md:text-2xl text-xl'>환영합니다!</h3>
            <h3 className='md:text-2xl text-xl'>귀하의 계정에 로그인하십시오.</h3>
            
            <form className="flex flex-col w-full max-w-sm mt-10">
                <Input label='아이디' value={Id} onChange={onIdHandler} type='text' placeholder='Your ID' />
                <Input label='비밀번호' value={Password} onChange={onPasswordHandler} type='password' placeholder='******************' />
                <br />
                <Button mode="primary" onClick={onSubmitHandler} isLong={true}>로그인</Button>
                {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}

                <div className='m-auto mt-2 flex align-middle font-normal'>
                    <span className='text-gray-500'>아직 계정이 없으신가요?</span>
                    <a href={import.meta.env.VITE_PUBLIC_URL+"/signup"} className='ml-2 hover:text-[black] text-blue-600 visited:text-purple-600 ...'>회원가입</a>
                </div>
                <div className='w-full mt-8 flex flex-col gap-2'>
                    <SocialKakao />
                    <SocialNaver />
                </div>
            </form>
        </div>
    )
}

export default LoginForm
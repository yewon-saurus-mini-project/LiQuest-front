import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '../../../components';
import MyPageNav from './MyPageNav';
import { Card, CardBody } from "@nextui-org/react";

function MyInfo() {
    const [userData, setUserData] = useState(null);
    const token = sessionStorage.getItem('aivle19_token')

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + '/accounts/user/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(response.data) setUserData(response.data)
        })
        .catch(error => {
            console.error(error);
        });
    }, [token]);

  return (
    <div>
        <MyPageNav />
        <div className='pt-[63px] min-h-screen' style={{ padding:'63px', marginLeft:'256px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <Card className="py-2 lg:w-1/2 h-fit">
                <CardBody>
                    <Input isReadOnly label='이름' value={userData !== null ? `${userData.user.last_name}${userData.user.first_name}` : 'Loading...'} onChange={() => {}} type='text' />
                    <br />
                    <Input isReadOnly label='아이디' value={userData !== null ? `${userData.user.username}` : 'Loading...'} onChange={() => {}} type='text' />
                    <br />
                    <Input isReadOnly label='이메일 주소' value={userData !== null ? `${userData.user.email}` : 'Loading...'} onChange={() => {}} type='email' />
                    <br />
                    <Input isReadOnly label='최근 로그인' value={userData !== null ? new Date(userData.user.last_login).toLocaleString() : 'Loading...'} onChange={() => {}} type='text' />
                    <br />
                    <Input isReadOnly label='가입일' value={userData !== null ? new Date(userData.user.date_joined).toLocaleString() : 'Loading...'} onChange={() => {}} type='text' />
                </CardBody>
            </Card>
        </div>
    </div>
  )
}

export default MyInfo
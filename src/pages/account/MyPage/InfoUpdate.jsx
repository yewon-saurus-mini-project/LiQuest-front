import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sidebar2, Button, ConfirmPopup, Input } from '../../../components';

function InfoUpdate() {
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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [Firstname, setFirstname] = useState(userData !== null ? userData.user.First_name : '');
  const [FirstnameInitial, setFirstnameInitial] = useState(true);
  const [Lastname, setLastname] = useState(userData !== null ? userData.user.last_name : '');
  const [LastnameInitial, setLastnameInitial] = useState(true);
  const [Email, setEmail] = useState(userData !== null ? userData.user.email : '');
  const [EmailInitial, setEmailInitial] = useState(true);
  const [NewPassword, setNewPassword] = useState("");
  const [OldPassword, setOldPassword] = useState("");

  const nav = useNavigate();

  const onFirstnameHandler = (e) => {
      setFirstname(e.currentTarget.value)
      setFirstnameInitial(false);
  }

  const onLastnameHandler = (e) => {
    setLastname(e.currentTarget.value)
    setLastnameInitial(false);
  }

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
    setEmailInitial(false);
  }

  const onNewPasswordHandler = (e) => {
      setNewPassword(e.currentTarget.value)
  }

  const onOldPasswordHandler = (e) => {
    setOldPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
      e.preventDefault()

      const url = import.meta.env.VITE_API_URL + "/accounts/user/update/";
      const req = {
          'last_name': LastnameInitial ? userData?.user.last_name : Lastname,
          'first_name': FirstnameInitial ? userData?.user.first_name : Firstname,
          'email': EmailInitial ? userData?.user.email : Email,
          'password': NewPassword,
          'old_password': OldPassword
      };

      axios.put(url, req, {
        headers: {
          "Authorization": `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
          .then(res => {
              console.log("200 OK");
              nav('/myinfo');
          }).catch(err => {
              // 에러 처리
              console.log(err.response.data.message);
              alert("현재 비밀번호를 확인해 주세요.")
          });
    };

  return (
    <div>
      <Sidebar2 />
      <div className='pt-[63px] min-h-screen' style={{padding:'63px', marginLeft:'256px'}}>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12"></div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">개인정보 수정</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <Input label='이름' value={(FirstnameInitial && userData !== null) ? userData.user.first_name : Firstname} onChange={onFirstnameHandler} type='text' />
            </div>
            <div className="sm:col-span-2">
              <Input label='성' value={(LastnameInitial && userData !== null) ? userData.user.last_name : Lastname} onChange={onLastnameHandler} type='text' />
            </div>

            <div className="sm:col-span-4">
              <Input label='이메일 주소' value={(EmailInitial && userData !== null) ? userData.user.email : Email} onChange={onEmailHandler} type='email' />
            </div>

            <div className="sm:col-span-4">
              <Input label='새로운 비밀번호' value={NewPassword} onChange={onNewPasswordHandler} type='password' />
            </div>

            <div className="sm:col-span-4">
              <Input label='현재 비밀번호' value={OldPassword} onChange={onOldPasswordHandler} type='password' />
            </div>

          </div>
        </div>

      </div>

        <div className="mt-3 flex items-center justify-end gap-x-2">
          <Button mode='cancle' onClick={() => nav('/myinfo')}>취소</Button>
          <Button mode='primary' onClick={() => setIsPopupOpen(true)}>수정</Button>

          {
            isPopupOpen &&
            <ConfirmPopup
              onClose={() => setIsPopupOpen(false)}
              onConfirm={onSubmitHandler}
              title='회원 정보 수정'
              message='변경된 내용을 저장하시겠습니까?'
            />
          }
        </div>
      </form>
      </div>
    </div> 
  )
}

export default InfoUpdate
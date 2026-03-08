import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../../../components";
import axios from "axios";

function SignupForm() {
  const [LastName, setLastName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [Email, setEmail] = useState("");
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [CheckPassword, setCheckPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const nav = useNavigate();
  const [errors, setErrors] = useState({});

  const onFirstNameHandler = (e) => {
    setFirstName(e.currentTarget.value);
  };

  const onLastNameHandler = (e) => {
    setLastName(e.currentTarget.value);
  };

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);

    setPasswordsMatch(e.target.value === CheckPassword);
  };

  const onCheckPasswordHandler = (e) => {
    setCheckPassword(e.currentTarget.value);
    // 비밀번호 확인이 변경될 때마다 일치 여부를 다시 확인
    setPasswordsMatch(e.currentTarget.value === Password);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let req = {
      last_name: LastName,
      first_name: FirstName,
      email: Email,
      username: Id,
      password: Password,
    };

    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/accounts/signup/",
        req,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("회원가입 성공");
      nav("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      setErrors(error.response.data);
    }
  };
  return (
    <div className="items-center justify-center flex flex-col w-full m-auto p-2">
      <div>
        <span className="font-semibold">회원가입</span>
      </div>

      <form class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <Input
            label="이름"
            value={FirstName}
            onChange={onFirstNameHandler}
            type="text"
            placeholder="이름"
          />
          {errors.last_name && (
            <small style={{ color: "red" }}>{errors.last_name}</small>
          )}
        </div>
        <div className="sm:col-span-2">
          <Input
            label="성"
            value={LastName}
            onChange={onLastNameHandler}
            type="text"
            placeholder="성"
          />
          {errors.first_name && (
            <small style={{ color: "red" }}>{errors.first_name}</small>
          )}
        </div>

        <div className="sm:col-span-4">
          <Input
            label="이메일 주소"
            value={Email}
            onChange={onEmailHandler}
            type="email"
            placeholder="your@example.com"
          />
          {errors.email && (
            <small style={{ color: "red" }}>{errors.email}</small>
          )}
        </div>
        <div className="sm:col-span-4">
          <Input
            label="아이디"
            value={Id}
            onChange={onIdHandler}
            type="text"
            placeholder="ID"
          />
          {errors.username && (
            <small style={{ color: "red" }}>{errors.username}</small>
          )}
        </div>
        <div className="sm:col-span-4">
          <Input
            label="비밀번호"
            value={Password}
            onChange={onPasswordHandler}
            type="password"
            placeholder="******************"
          />
          {errors.password && (
            <small style={{ color: "red" }}>
              {errors.password.password || errors.password}
            </small>
          )}
        </div>
        <div className="sm:col-span-4">
          <Input
            label="비밀번호 확인"
            value={CheckPassword}
            onChange={onCheckPasswordHandler}
            type="password"
            placeholder="******************"
          />
          {!passwordsMatch && (
            <small style={{ color: "red" }}>
              비밀번호가 일치하지 않습니다.
            </small>
          )}
        </div>
        <div className="sm:col-span-4">
          <Button
            onClick={onSubmitHandler}
            isLong={true}
            disabled={!passwordsMatch}
          >
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;

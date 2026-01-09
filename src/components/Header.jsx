import { Sidebar, ConfirmPopup } from "./";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

import { LuMenu } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";

function Header({
    isLogin,
    setIsLogin,
    username
}) {
    const nav = useNavigate();

    const SIDEBAR_WIDTH = 320;
    const [userrank, setUserrank] = useState(0);
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(SIDEBAR_WIDTH);
    const [logoutPopup, setLogoutPopup] = useState({ open: false, title: "", message: "" }); // 로그아웃 팝업
    
    // button 클릭 시 토글
    const toggleMenu = () => {
        if (xPosition > 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(SIDEBAR_WIDTH);
            setOpen(false);
        }
    };

    const onClickLogout = () => {
        setLogoutPopup({ open: !(logoutPopup.open), title: '로그아웃', message: '로그아웃 하시겠습니까?' });
    }
    const handleConfirm = () => {
        sessionStorage.removeItem('aivle19_username');
        sessionStorage.removeItem('aivle19_token');
        setIsLogin(false);
        nav('/');
    }

    return (
        <div className="w-full flex justify-center bg-white z-50 top-0 fixed">
            {
                logoutPopup.open &&
                <ConfirmPopup
                    onOpenAlert={onClickLogout}
                    onConfirm={handleConfirm}
                    title={logoutPopup.title}
                    message={logoutPopup.message}
                />
            }

            <div className="w-full flex justify-between items-center px-4 py-2">
                <div className="flex items-center gap-[1em]">
                    <div className="lg:hidden">
                        <div className="flex">
                            <button onClick={() => toggleMenu()} >
                                <LuMenu size={30} color="var(--color-primary-600)" />
                            </button>
                        </div>
                        <Sidebar
                            width={SIDEBAR_WIDTH}
                            isLogin={isLogin}
                            isOpen={isOpen}
                            setOpen={setOpen}
                            setX={setX}
                            xPosition={xPosition}
                            onClickLogout={onClickLogout}
                            username={username}
                            userrank={userrank}
                        />
                    </div>
                    <a href={import.meta.env.VITE_PUBLIC_URL + "/"} className="flex items-center gap-2">
                        <img className="w-10 h-10" src={import.meta.env.VITE_PUBLIC_URL + '/logo192.png'} alt="LiQuest Logo" />
                        <h1 className="text-xl">LiQuest</h1>
                    </a>
                </div>
                <div className="lg:flex hidden">
                    {
                        isLogin ?
                        <div className="flex items-center gap-[2em]">
                            <Link to="/we" className="text-[var(--color-primary-900)] hover:text-[var(--color-primary-600)]">개발팀 소개</Link>
                            <Link to="/notice" className="text-[var(--color-danger-500)] hover:text-[var(--color-primary-600)]">공지사항</Link>
                            <Link to="/board" className="hover:text-[var(--color-primary-600)]">커뮤니티</Link>
                            <Link to="/rank" className="flex hover:text-[var(--color-primary-600)]">전체랭킹</Link>
                            <Link to="/myinfo" className="hover:text-[var(--color-primary-600)]">{username} 님</Link>
                            {/* <a href="" className="hover:text-[var(--color-primary-600)]" >찬스 --개</a> */}
                            {/* <a href="" className="hover:text-[var(--color-primary-600)]" >포인트 --점</a>  */}
                            <button className="flex hover:text-[var(--color-warning-600)]" onClick={onClickLogout}><IoMdLogOut style={{width: '20px', height: 'auto',}} /><span>&nbsp;&nbsp;로그아웃</span></button>
                        </div>
                        :
                        <div className="flex items-center gap-[2em]">
                            <Link to="/we" className="text-[var(--color-primary-900)] hover:text-[var(--color-primary-600)]">개발팀 소개</Link>
                            <Link to="/notice" className="text-[var(--color-danger-500)] hover:text-[var(--color-primary-600)]">공지사항</Link>
                            <Link to="/login" className="hover:text-[var(--color-primary-600)]">로그인</Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;
import GoToLatestAndQuizList from "./GoToLatestAndQuizList";
import { Link } from "react-router-dom";

import { IoMdLogOut, IoMdLogIn } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { FaRankingStar } from "react-icons/fa6";
import { GoCommentDiscussion } from "react-icons/go";
import { MdDeveloperMode, MdOutlineNotificationImportant  } from "react-icons/md";

const StyledLink = ({ to, icon: Icon, label, color = "hover:text-[var(--color-primary-500)]"}) => (
    <Link to={to} className={`flex justify-end ${color}`}>
        <Icon size={25} />
        <span>&nbsp;&nbsp;{label}</span>
    </Link>
);

const NavItem = ({ children, full = false }) => (
    <div className={`p-2 ${full ? '' : 'flex-1'}`}>
        {children}
    </div>
);

const Sidebar = (props) => {
    const menuItems = {
        loggedIn: [
            { position: 'solo', content: { type: 'button', onClick: props.onClickLogout, icon: IoMdLogOut, label: '로그아웃', color: 'hover:text-[var(--color-warning-500)]' } },
            { position: 'row', items: [
                { to: "/rank", icon: FaRankingStar, label: '전체랭킹' },
                { to: "/myinfo", icon: CiUser, label: props.username + ' 님', border: true }
            ]},
            { position: 'row', items: [
                { to: "/notice", icon: MdOutlineNotificationImportant, label: '공지사항', color: 'text-[var(--color-danger-500)] hover:text-[var(--color-primary-600)]' },
                { to: "/board", icon: GoCommentDiscussion, label: '커뮤니티', border: true }
            ]},
            { position: 'solo', content: { type: 'link', to: "/we", icon: MdDeveloperMode, label: '개발팀 소개', color: 'text-[var(--color-primary-900)] hover:text-[var(--color-primary-500)]' } }
        ],
        loggedOut: [
            { position: 'solo', content: { type: 'link', to: "/login", icon: IoMdLogIn, label: '로그인' }, message: true },
            { position: 'solo', content: { type: 'link', to: "/we", icon: MdDeveloperMode, label: '개발팀 소개', color: 'text-[var(--color-primary-900)] hover:text-[var(--color-primary-500)]' } },
            { position: 'solo', content: { type: 'link', to: "/notice", icon: MdOutlineNotificationImportant, label: '공지사항', color: 'text-[var(--color-danger-500)] hover:text-[var(--color-primary-600)]' } }
        ]
    };

    const renderMenu = (items) => (
        <div className="w-full text-right flex flex-col gap-1">
            {items.map((item, idx) => item.position === 'solo' ? (
                <div key={idx} className="flex justify-end gap-0">
                    <div className="p-2 w-full">
                        {item.content.type === 'button' ? (
                            <button onClick={item.content.onClick} className={`flex justify-end w-full ${item.content.color}`}>
                                <item.content.icon size={25} />
                                <span>&nbsp;&nbsp;{item.content.label}</span>
                            </button>
                        ) : (
                            <>
                                <Link to={item.content.to} className={`flex justify-end ${item.content.color}`}>
                                    <item.content.icon size={25} />
                                    <span>&nbsp;&nbsp;{item.content.label}</span>
                                </Link>
                                {item.message && (
                                    <div className="w-full text-right text-xs mt-2 mb-4">
                                        <div>로그인 정보가 없습니다.</div>
                                        <div>로그인하고 서비스를 이용해 보세요.</div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div key={idx} className="flex justify-end gap-0">
                    {item.items.map((link, lidx) => (
                        <NavItem key={lidx}>
                            <StyledLink to={link.to} icon={link.icon} label={link.label} color={link.color} />
                        </NavItem>
                    ))}
                </div>
            ))}
        </div>
    );

    return (
        <div
            ref={props.side}
            className={`bg-white fixed top-0 bottom-0 left-0 transition-all h-full -z-10 ${props.isOpen === true? 'drop-shadow-[25px_25px_100px_var(--color-primary-900)]' : 'drop-shadow-none'}`}
            style={{ width: `${props.width}px`, height: '100%',  transform: `translatex(${-props.xPosition}px)`}}
        >
            <div className="h-screen w-full relative py-16">
                <div className="lg:hidden">
                    {renderMenu(props.isLogin ? menuItems.loggedIn : menuItems.loggedOut)}
                </div>
                <div>
                    { props.isLogin && <GoToLatestAndQuizList /> }
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
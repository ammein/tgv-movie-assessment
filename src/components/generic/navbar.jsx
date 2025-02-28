import {NavLink, useLocation} from "react-router";
import Logo from '../../assets/logo.svg?react'
import {useContext} from "react";
import {AuthContext} from "../authentication";

const useAuth = () => {
    return useContext(AuthContext);
}

const Navbar = ({ props }) => {
    const { session, token, onLogin, onLogout } = useAuth();
    const location = useLocation()

    return (
        <nav className="z-50 w-full !h-fit md:h-[80px] sm:h-[60px] md:px-20 sm:px-[162px] lg:px-[16px] !py-[30px] bg-gradient-to-b to-black-08/0 from-black-08 !justify-between !items-center !inline-flex fixed top-0" {...props}>
            <div>
                <Logo />
            </div>
            <div className={`!px-10 !py-2.5 ${location.pathname === "/" && "!hidden"} hidden sm:inline-flex !rounded-xl !justify-start !items-center !gap-[30px] !overflow-hidden`}>
                <NavLink className="!px-6 !py-3.5 bg-black-10 rounded-lg border border-black-10 justify-start items-center gap-2.5 inline-flex !text-white !text-lg !font-medium font-manrope !leading-[27px]" to={``}>Home</NavLink>
            </div>
            <button
                className="!h-fit !w-fit !px-6 !py-[18px] !bg-red-45 !rounded-lg !justify-start !items-center !gap-1 !inline-flex cursor-pointer"
                onClick={() => session || token ? onLogout(!token) : onLogin()}>
                <span className="text-absolute-white text-lg font-semibold font-manrope leading-[27px]">{session && !token ? "Logout as Guest" : token ? "Logout" : "Login"}</span>
            </button>
        </nav>
    )
}

export default Navbar;
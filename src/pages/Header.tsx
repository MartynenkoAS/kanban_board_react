import React, {useState} from "react";
import avatarLogo from "../img/user-avatar.png";
import arrowDown  from "../img/arrow-down.png";
import arrowUp    from "../img/arrow-up.png";
import style      from "../components/style.module.css";
import {mainDataInitialType} from "../types/alltypes.ts";

type PropsType = {mainData?: mainDataInitialType[]};

const Header = ( props: PropsType ) => {

    const [logoProfileIsOpen, setlogoProfileIsOpen] = useState(false);                  // тумблер для включения/выключения бокса Profile
    const logoProfilePressed = () => setlogoProfileIsOpen(!logoProfileIsOpen);

    return (
        <header className="App-header">
                <p>Awesome Kanban Board</p>
                <div className='App-avatar'>
                    <img className='App-avatar-logo' src={avatarLogo} alt='./img/user-avatar.png' onClick={logoProfilePressed}/>
                    {logoProfileIsOpen ? (<img className='App-avatar-logo' onClick={logoProfilePressed} src={arrowUp}   alt='./img/arrow-up.png'/>) : 
                                        (<img className='App-avatar-logo' onClick={logoProfilePressed} src={arrowDown} alt='./img/arrow-down.png'/>)}
                    {logoProfileIsOpen && (  <div className={style.logo_profile}>
                                                <div className={style.logo_profile_flag}></div>
                                                    <div className={style.logo_profile_block}>
                                                        <a href="/#">Profile</a>    
                                                        <a href="/#">Log Out</a>
                                                    </div>
                                            </div> )}
                </div>
        </header>
    );
}
export default Header;
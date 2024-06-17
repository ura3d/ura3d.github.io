import React, {useState} from "react";
import useClickOutside from "./useClickOutside";
import moreIco from '../res/ico/more.png' //IMG

function MoreBtn({theme, setActiveTheme, activeTheme}){
    const [isMoreBtnActive, setIsMoreBtnActive] = useState(false);

    function handleIsMoreBtnActive(){
        if(isMoreBtnActive){
            setIsMoreBtnActive(false);
        }
        else{
            setIsMoreBtnActive(true);
        }
    }

    function handleSetActiveTheme(){ /// (доработать)
        setActiveTheme(prevTheme => (prevTheme === 0 ? 1 : 0));  
    }

    function handleOutsideClick(){
        if(isMoreBtnActive){
            handleIsMoreBtnActive()
        }
    }
    const ref = useClickOutside(handleOutsideClick)


    return(
        <>
        <button onClick={() => handleIsMoreBtnActive()} className="button more"><img src={moreIco}/></button>

        <div ref={ref} className={isMoreBtnActive ? "context-menu" : "context-menu none"}>
                        <button onClick={handleSetActiveTheme} className="moreOptBtn" style={{border: 'none', padding: 0, float: 'none', display: 'block', height: '40px', width: '100%', background: theme.EditorMoreButtonMenuColor, color: theme.EditorMoreButtonMenuTextColor }}>Theme change</button>
                        <button className="moreOptBtn" style={{border: '1px solid #787070', borderLeft: 0, borderRight: 0, padding: 0, float: 'none', display: 'block', height: '40px', width: '100%', background: theme.EditorMoreButtonMenuColor, color: theme.EditorMoreButtonMenuTextColor }}>Make PDF</button>
                        <button className="moreOptBtn" style={{border: 'none', padding: 0, float: 'none', display: 'block', height: '40px', width: '100%', background: theme.EditorMoreButtonMenuColor, color: theme.EditorMoreButtonMenuTextColor }}>Settings</button>
        </div>
        </>
    )
}

export default MoreBtn;
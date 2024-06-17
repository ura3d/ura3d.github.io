import React, { useState, useEffect } from "react";
import {ReactComponent as FullscreenIco} from '../res/ico/fullscreen.svg' //SVG

function FullscreenBtn({ onFullscreenChange }){
    const [isFullscreen, setFullscreen] = useState(() => {
        // Инициализация состояния из localStorage или по умолчанию (доработать)
        return JSON.parse(localStorage.getItem("isFullscreen")); // парсинг строкового значение в булевое
    });
    const toggleFullscreen = () => {
        setFullscreen(prevState => {
            const newState = !prevState;
            localStorage.setItem("isFullscreen", newState);
            return newState;
        });
    };

    useEffect(() => {
        onFullscreenChange(isFullscreen);
    }, [isFullscreen]);

    return(
        <button id="fullscreenbtn" onClick={toggleFullscreen} className="button"><FullscreenIco/></button>
    )
}

export default FullscreenBtn;
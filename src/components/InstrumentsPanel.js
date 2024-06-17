import React, { useState, useEffect } from "react";
import moreIco from '../res/ico/more.png' //IMG
import {ReactComponent as Marker} from '../res/ico/marker.svg' //SVG
import {ReactComponent as BoldIco} from '../res/ico/bold.svg' //SVG
import {ReactComponent as TiltleIco} from '../res/ico/title.svg' //SVG
import {ReactComponent as ImgIco} from '../res/ico/img.svg' //SVG

import FullscreenBtn from "./fullscreenBtn";
import ListBtn from "./ListBtn";


function InstrumentsPanel({handleFullscreen, isFullscreen}){

    return(
        <div id="edit" className={isFullscreen ? "edit fullscreen" : "edit"} style={{ backgroundColor: '#232323' }}>
                <div className="edit-block" style={{ marginLeft: '20px' }}>
                    <FullscreenBtn onFullscreenChange={handleFullscreen}/>
                    <div style={{ height: '20px', width: '25px', minWidth: 'none', maxWidth: '25px' }}></div>
                    <button className="button"><ImgIco/></button>
                    <ListBtn/>
                </div>
                <div className="edit-block first" style={{ display: "none" }}>
                    <div style={{ height: '20px', width: '25px', minWidth: 'none', maxWidth: '25px' }}></div>
                    <button className="button"></button>
                    <button className="button"></button>
                </div>
                <div className="edit-block second" style={{ marginRight: "20px" }}>
                    <button className="button" onClick="makeTitle()"><TiltleIco/></button>
                    <button className="button" onClick="makeBoldText()"><BoldIco/></button>                    
                    <button className="button" id="markerBtn" onClick="makeColorText()"><Marker fill="#09ff15"/></button>
                    <div style={{ height: '20px', width: '25px', minWidth: 'none', maxWidth: "25px" }}></div>
                    <button id="moreBtn" onMouseDown="moreButtons()" className="button more"><img src={moreIco}/></button>
                    <div id="moreOpt"  className="context-menu none">
                        <button className="moreOptBtn" id="themeBtn" onMouseDown="changeTheme()">Theme change</button>
                        <button className="moreOptBtn">Make PDF</button>
                        <button className="moreOptBtn">Settings</button>
                    </div>
                </div>
            </div>
    );
}

export default InstrumentsPanel;
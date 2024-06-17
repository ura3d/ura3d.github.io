import React from "react";
import List from "./components/list.js"
import Logo from "./components/Logo.js"
import SearchNote from "./components/SearchNote.js";

function LeftBlock(props){
    return(
        <div className={ props.isFullscreen ? "left-block hide" : "left-block"} style={{ transition: 'width 0.3s', background: props.theme.ListColor}}>
            <Logo/>
            <SearchNote notes={props.notes} theme={props.theme}/>
            <List 
                notes={props.notes} 
                activeNote={props.activeNote}
                setActiveNote={props.setActiveNote}
                setNotes={props.setNotes}
                deleteNote={props.deleteNote}
                theme={props.theme}
            />
        </div>
    )
};

export default LeftBlock;
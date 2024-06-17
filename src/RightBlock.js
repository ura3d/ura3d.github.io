import React, { useState, useEffect } from "react";
import Textarea from "./components/Textarea..js";
import InstrumentsPanel from "./components/InstrumentsPanel.js";
import Log from "./components/Log.js"

import MyEditor from "./components/MyEditor.js";

function RightBlock({note, updateNote, handleFullscreen, theme, setActiveTheme, activeTheme}){
    return(
        <div className="right-block" style={{ backgroundColor: theme.EditorColor }}>
            {/* <InstrumentsPanel handleFullscreen={handleFullscreen} isFullscreen={isFullscreen}/> */}
            {/* <Textarea note = {note} updateNote = {updateNote}/> */}
            <MyEditor 
            note={note} 
            updateNote={updateNote} 
            handleFullscreen={handleFullscreen} 
            theme={theme}
            setActiveTheme={setActiveTheme}
            activeTheme={activeTheme}
            />
            <Log/>
        </div>
    );
}

export default RightBlock;
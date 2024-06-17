import React, { useState, useRef } from "react";

const Textarea = ({note, updateNote}) => {
    const[isFocus, setIsFocus] = useState(false);
    const[isBodyFocus, setIsBodyFocus] = useState(false);

    const handleIsFocus = () => {
        setIsFocus(true);
      };
    function handleNoFocus(){
        setIsFocus(false);
      };

    const handleIsBodyFocus = () => {
        setIsBodyFocus(true);
      };
    const handleNoBodyFocus = () => {
        setIsBodyFocus(false);
      };

    if(!note){
        return (
            <div className="text-edit" style={{ display: "grid", height: "70%", alignItems: "center"}}>
                <span className="noNote">Select note to edit or create one</span>
            </div>
        );
    }
    else{
        const handleTitleChange = (event) => {
            handleNoFocus();
            updateNote(note.id, event.target.innerText, note.body, note.subtitle);
        }
        const handleBodyChange = (event) =>{
            handleNoBodyFocus();
            updateNote(note.id, note.title, event.target.innerHTML, event.target.innerText);
        }

        return (
            <div className="text-edit">
                {/* title */}
                {note.title.length == 0 && !isFocus ? (
                    <span onBlur={handleTitleChange} onClick={handleIsFocus} contentEditable suppressContentEditableWarning={true} className="main-title"><div contentEditable="false" style={{ color: "rgb(193, 193, 193)" }}>Your awesome Title</div></span>
                ) : (
                    <span onBlur={handleTitleChange} contentEditable suppressContentEditableWarning={true} className="main-title">{note.title}</span>
                )}

                {/* body */}
                {note.body.length == 11 && !isBodyFocus ? (
                    <div onBlur={handleBodyChange} onClick={handleIsBodyFocus} contentEditable suppressContentEditableWarning={true} style={{ whiteSpace: "pre-wrap" }} id="textEdit"><div contentEditable="false" style={{ color: "rgb(193, 193, 193)" }}>Your awesome Note</div></div>
                ) : (
                    <div onBlur={handleBodyChange} contentEditable suppressContentEditableWarning={true} style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: note.body }} id="textEdit"></div>
                )}
            </div>
        );
    }
}

export default Textarea;

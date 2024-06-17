import React from "react";
import CreateNote from "./CreateNote.js";

function List(props){
    function changeNote(id){
        const checkNote = props.notes.find(note => note.id == props.activeNote);
        if(checkNote){
            const parser = new DOMParser();
            let bodyTextContent= parser.parseFromString(checkNote.body, 'text/html').documentElement.textContent;
            if(bodyTextContent.length < 1){ //(доработать) // upd вроде доработал
                props.deleteNote(checkNote.id)
            }
        }
        props.setActiveNote(id)
    }

    return(
        <div className='notes-block'>
            {
                props.notes.map((note) =>{
                    return(
                        <div key={note.id} style={{ width: "100%", bottom: "0" }}>
                        {props.activeNote === note.id
                        ?
                        <div className="note" style={{ height: "56px", borderColor: props.theme.ListNoteBorderColor, backgroundColor: props.theme.ListActiveNoteColor}}>
                            <div className="note-title" style={{color: props.theme.ListActiveNoteTitleColor}}>{note.title}</div>
                            <div className="note-subtitle" style={{color: props.theme.ListActiveNoteSubtitleColor}}>{note.subtitle.length > 40 ? note.subtitle.slice(0, 40) + '...' : note.subtitle.slice(0, 40)}</div>
                        </div> 
                        : 
                        <div className="note" style={{ height: "56px", borderColor: props.theme.ListNoteBorderColor}} onClick={() => changeNote(note.id)}>
                            <div className="note-title" style={{color: props.theme.ListNoteTitleColor}}>{note.title}</div>
                            <div className="note-subtitle" style={{color: props.theme.ListNoteSubtitleColor}}>{note.subtitle.length > 45 ? note.subtitle.slice(0, 40) + '...' : note.subtitle.slice(0, 40)}</div>
                        </div>
                        }
                        </div>
                    ) // Will remake in future( when html will be used) a system of note-body char counting
                })
            }
            <CreateNote notes={props.notes} setNotes={props.setNotes} setActiveNote={props.setActiveNote} activeNote={props.activeNote} theme={props.theme}/>
        </div>
    );
}

export default List;
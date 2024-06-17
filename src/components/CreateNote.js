import React from "react";
import plusIco from "../res/ico/plus.png" //IMG

function CreateNote({notes, setNotes, setActiveNote, activeNote, theme}){

    function addNewNote(){
        const lastID = notes.length > 0 ? notes[notes.length - 1].id : 0
        if(lastID == 0){
            const newNote = {
                id: lastID + 1,
                title: "",
                subtitle: "",
                body: "<div></div>"
            };
            setNotes(prevNotes => [...prevNotes, newNote]);
            setActiveNote(lastID + 1);
        }
        else{
            const checkNote = notes.find(note => note.id == lastID);
            console.log(checkNote.title.length + " : " + checkNote.body.length)
            if(checkNote.title.length != 0 || checkNote.body.length > 11 && checkNote.body.length != 15){//(доработать)
                const newNote = {
                    id: lastID + 1,
                    title: "",
                    subtitle: "",
                    body: "<div></div>"
                };
                setNotes(prevNotes => [...prevNotes, newNote]);
                setActiveNote(lastID + 1);
            }
        }

    }

    return(
        <div className="create-note" onClick={addNewNote} style={{background: theme.ListColor}}>
            <img src={plusIco}/>
        </div> 
    )
}

export default CreateNote;
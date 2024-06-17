import React from "react";
import searchIco from '../res/ico/search.png'; //IMG

function SearchNote({notes, theme}){

    function search(event){
        const inputText = event.target.value.toLowerCase();
        const foundNotesByTitle = notes.filter(note => note.title.toLowerCase().includes(inputText)); // вся логика поиска заметок

        if(foundNotesByTitle.length > 0){
            foundNotesByTitle.forEach(fnote => console.log("1) Find notes By Title: " + fnote.title))
        }

        const foundNotesByBody = notes.filter(note => note.body.toLowerCase().includes(inputText));
        if(foundNotesByBody.length > 0){
            foundNotesByBody.forEach(fnote => console.log("2) Find notes By Body: " + fnote.title))
        }
    }

    return(
        <div className="search" style={{ backgroundColor: theme.ListSearchColor }}>
            <img src={searchIco} className="search-ico"/>
            <input onChange={search} autoFocus placeholder="Search" type="text" className="search-input" style={{ color: theme.ListSearchTextColor, fontFamily: 'Inter' }}/>
        </div>        
    )
}

export default SearchNote;
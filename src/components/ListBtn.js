import React from "react";
import {ReactComponent as ListIco} from '../res/ico/list.svg' //SVG

function ListBtn(){
    function makeList(){
        document.execCommand('insertUnorderedList', false, null);
    }

    return(
        <button id="listBtn" className="button" onClick={makeList} onContextMenu="changeListButton(event)"><ListIco/></button>
    )
}

export default ListBtn;
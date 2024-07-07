import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../res/themes/defaultTheme.css';

import FullscreenBtn from "./fullscreenBtn";
import MoreBtn from './MoreBtn';

const CustomToolbar = ({ handleFullscreen, theme, setActiveTheme, activeTheme, onLoginSuccess, onLogoutSuccess, saveToDrive }) => (
    <div id="toolbar" style={{ backgroundColor: theme.EditorToolbarColor }}>
        <span className='ql-toolbar' style={{ backgroundColor: theme.EditorToolbarColor }}>
            <button style={{width: "10px", cursor: 'default'}}></button>
            <FullscreenBtn onFullscreenChange={handleFullscreen} />
            <button style={{width: "20px", cursor: 'default'}}></button>
            <button className="ql-image">img</button>
            <button className="ql-list" value="bullet">list</button>
        </span>

        <span className='ql-toolbar' style={{ backgroundColor: theme.EditorToolbarColor }}>
            <button className="ql-header" value={1}>h1</button>
            <button className="ql-bold">Bold</button>
            <select className="ql-background">
                <option value=""></option>
                <option value="lightgreen">Light Green</option>
                <option value="black">Black</option>
            </select>
            <button style={{width: "20px", cursor: 'default'}}></button>
            <MoreBtn theme={theme} setActiveTheme={setActiveTheme} activeTheme={activeTheme} onLoginSuccess={onLoginSuccess} onLogoutSuccess={onLogoutSuccess} saveToDrive={saveToDrive}/>
            <button style={{width: "10px", cursor: 'default'}}></button>
        </span>
    </div>
);


const modules = {
    toolbar: '#toolbar',
    clipboard: {
        matchVisual: false
    }
};

const formats = [
    'header', 'font',
    'list', 'bullet',
    'bold', 'italic', 'underline',
    'link', 'image', 'background',
    'color' // Включите цвет в форматы
];


function MyEditor({note, updateNote, handleFullscreen, theme, setActiveTheme, activeTheme, onLoginSuccess, onLogoutSuccess, saveToDrive}) {
    const initialHtmlContent = note ? note.body : '<p className="grey-text">Your awesome note</p>';
    const [text, setText] = useState(initialHtmlContent);

    const[isFocus, setIsFocus] = useState(false);
    const handleIsFocus = () => {
        setIsFocus(true);
      };
    function handleNoFocus(){
        setIsFocus(false);
      };


    // Обновление текста при изменении пропса note
    useEffect(() => {
        if (note) {
            setText(note.body);
        }
    }, [note]);


    // Функция для обновления состояния текста
    const handleChange = (html) => {
        setText(html);
    };

    function handleNoteChange(){
        // Находим первый блок <h1>
        const titleMatch = text.match(/<h1.*?>[\s\S]*?<\/h1>/i);
        // const subtitleMatch = text.match(/<p[^>]*>((?:\s*|<br\s*\/?>)*)(?!<br\s*\/?>)((?:[^<]+|<(?!\/p>)[^>]+>)+)<\/p>/i);
        const subtitleMatch = text.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
        console.log(subtitleMatch);
        let title = null;
        let subtitle = null;
        let body = text;

        const parser = new DOMParser();
        const doc = parser.parseFromString(body, 'text/html');

        if (titleMatch) {
            title = parser.parseFromString(titleMatch[0], 'text/html').documentElement.textContent; // Заголовок найден и отформатирован
        }
        // if (subtitleMatch && subtitleMatch.length > 1){
        //     subtitle = parser.parseFromString(subtitleMatch, 'text/html').documentElement.textContent.replace(/,,.*/, '');
        // }
        if (subtitleMatch && subtitleMatch.length > 0) {
            let subindex = 0;
            while (subindex < subtitleMatch.length) {
                const sub = parser.parseFromString(subtitleMatch[subindex], 'text/html').documentElement.textContent.trim();
                if (sub.length > 0) {
                    subtitle = sub;
                    break;
                }
                subindex++;
            }
            subindex++;
            while (subindex < subtitleMatch.length) {
                const sub2 = parser.parseFromString(subtitleMatch[subindex], 'text/html').documentElement.textContent.trim();
                if (sub2.length > 0) {
                    subtitle += ' ' + sub2;
                    break;
                }
                subindex++;
            }
        }

        
        console.log("Note Subtitle BODY: " + subtitleMatch);
        console.log("Note Subtitle LENGTH: " + subtitleMatch.length);
        console.log("Note Subtitle: " + subtitle);
        updateNote(note.id, title, body, subtitle);
    }


    const defaultStyle = {
        color: theme.EditorTextColor // Дефолтный цвет текста
    };
    // Применение дефолтного стиля
    useEffect(() => {
        const editor = document.querySelector('.ql-editor');
            if (editor) {
                Object.assign(editor.style, defaultStyle);
            }
    }, [theme.EditorTextColor]);

    return (
        <div>
            <CustomToolbar handleFullscreen={handleFullscreen} theme={theme} setActiveTheme={setActiveTheme} activeTheme={activeTheme} onLoginSuccess={onLoginSuccess} onLogoutSuccess={onLogoutSuccess} saveToDrive={saveToDrive}/>
            <ReactQuill
                value={text}
                onBlur={handleNoteChange}
                onChange={handleChange}
                theme="snow"
                modules={{
                    toolbar: '#toolbar'
                }}
                formats={[
                    'header', 'font',
                    'list', 'bullet',
                    'bold', 'italic', 'underline',
                    'link', 'image', 'background'
                ]}
            />
        </div>
    );
}

export default MyEditor;

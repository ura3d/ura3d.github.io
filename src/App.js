import React, { useState, useEffect } from "react";
import LeftBlock from './LeftBlock.js';
import RightBlock from './RightBlock.js';
import './style.css';

// Функции для работы с localStorage
const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

const loadFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
    }
    return null;
};

function App() {
    // Инициализация состояния из localStorage
    const [notes, setNotes] = useState(() => {
        const savedNotes = loadFromLocalStorage('notes');
        return savedNotes || [
            {
                id: 0,
                title: "My first React note",
                subtitle: "test body note 1",
                body: "<h1>My first React note</h1><div>test body note 1</div>"
            },
            {
                id: 1,
                title: "My second React note",
                subtitle: "small note body",
                body: "<h1>My second React note</h1><div>small note body</div>"
            },
            {
                id: 2,
                title: "",
                subtitle: "",
                body: '<p><br></p><h1>Day 3</h1><p><strong>About program:</strong></p><p>Today I integrated a Quill library...</p>'
            }
        ];
    });

    // Используем useEffect для сохранения данных при изменении состояния
    useEffect(() => {
        saveToLocalStorage('notes', notes);
    }, [notes]);

    // Пример функции для обновления заметки
    const updateNote = (noteId, newTitle, newBody, newSubtitle) => {
        const updatedNotes = notes.map(note => {
            if (note.id === noteId) {
                return {
                    ...note,
                    id: noteId,
                    title: newTitle,
                    subtitle: newSubtitle ? (newSubtitle.length > 42 ? newSubtitle.slice(0, 42) : newSubtitle) : '',
                    body: newBody
                };
            } else {
                return note;
            }
        });
        setNotes(updatedNotes);
    };

    const deleteNote = (id) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    };

    let [activeNote, setActiveNote] = useState(null);

    // fullscreen func
    const [isFullscreen, setIsFullscreen] = useState(false);
    const handleFullscreen = (newState) => {
        setIsFullscreen(newState);
    };

    // Themes
    const [themes, setThemes] = useState([
        {
            id: 0,
            Name: 'Default Light Theme',
            EditorColor: '#D9D9D9',
            EditorTextColor: '#000000',
            EditorToolbarColor: '#232323',
            EditorToolbarButtonColor: '#b7b7b7',
            EditorMoreButtonMenuColor: '#e9e9ed',
            EditorMoreButtonMenuTextColor: '#000000',

            ListColor: '#232323',
            ListNoteBorderColor: '#A2A2A2',
            ListNoteTitleColor: '#ffffff',
            ListNoteSubtitleColor: '#9d9d9d',
            
            ListActiveNoteColor: '#D9D9D9',
            ListAtiveNoteTitleColor: '#000000',
            ListActiveNoteSubtitleColor: '#000000',

            ListSearchColor: '#d9d9d9',
            ListSearchTextColor: '#006ca8',
            ListSearchPlaceholderColor: '',
            ListSearchIcoColor: '#b7b7b7',
            ListAddNoteButtonColor: '#4f4f4f'
        },
        {
            id: 1,
            Name: 'Default Dark Theme',
            EditorColor: '#171717',
            EditorTextColor: '#c3c3c3',
            EditorToolbarColor: '#232323',
            EditorToolbarButtonColor: '#b7b7b7',
            EditorMoreButtonMenuColor: '#e9e9ed',
            EditorMoreButtonMenuTextColor: '#000000',
            ListColor: '#232323',
            ListNoteBorderColor: '#ffffff',
            ListNoteTitleColor: '#ffffff',
            ListNoteSubtitleColor: '#9d9d9d',
            ListActiveNoteColor: '#D9D9D9',
            ListAtiveNoteTitleColor: '#000000',
            ListActiveNoteSubtitleColor: '#000000',
            ListSearchColor: '#d9d9d9',
            ListSearchTextColor: '#006ca8',
            ListSearchPlaceholderColor: '',
            ListSearchIcoColor: '#b7b7b7',
            ListAddNoteButtonColor: '#4f4f4f'
        }
    ]);

    const [activeTheme, setActiveTheme] = useState(0);

    return (
        <>
            <div className="body">
                <LeftBlock
                    notes={notes}
                    activeNote={activeNote}
                    setActiveNote={setActiveNote}
                    isFullscreen={isFullscreen}
                    setNotes={setNotes}
                    deleteNote={deleteNote}
                    theme={themes.find(theme => theme.id === activeTheme)}
                />

                <RightBlock
                    note={notes.find(note => note.id === activeNote)}
                    updateNote={updateNote}
                    handleFullscreen={handleFullscreen}
                    isFullscreen={isFullscreen}
                    theme={themes.find(theme => theme.id === activeTheme)}
                    setActiveTheme={setActiveTheme}
                    activeTheme={activeTheme}
                />
            </div>
        </>
    );
}

export default App;

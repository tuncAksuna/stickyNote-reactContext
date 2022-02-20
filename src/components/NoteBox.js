import { useContext, useState } from "react";
import MainContext from "../MainContext";

function NoteBox() {

    const types = [
        {
            name: 'Comment',
            color: 'Red',
            text: 'Comment'
        },
        {
            name: 'Private-comment',
            color: '#999',
            text: 'Private Comment'
        },
        {
            name: 'Note',
            color: 'Orange',
            text: 'Note'
        }
    ];

    const [color, setColor] = useState(types[0].color);
    const { boxPosition, setMode, notes, setNotes, setBoxVisible } = useContext(MainContext);
    const [note, setNote] = useState('');

    const changeColor = (e) => {
        setColor(e.target.value);
    }

    /**
     * @description - get all notes from context and add new note to the notes via state methods that located in the context
     */
    const addNote = () => {
        const currentNote = {
            number: notes.length + 1,
            note,
            color,
            position: {
                x: boxPosition.x,
                y: boxPosition.y
            }
        };
        setNotes([...notes, currentNote]);
        setBoxVisible(false);
        setMode(true);
    }

    return (
        <div onMouseEnter={() => setMode(false)} onMouseLeave={() => setMode(true)} className="note-box" style={{ '--color': color, position: 'absolute', top: boxPosition.y, left: boxPosition.x }}>
            <span className="note-box-number">
                {notes.length + 1}
            </span>
            <select onChange={changeColor}>
                {
                    types.map(type => (
                        <option value={type.color}>{type.text}</option>
                    ))
                }
            </select>
            <textarea onChange={(e) => setNote(e.target.value)} cols="30" rows="5"></textarea>
            <button onClick={addNote} disabled={!note}>ADD</button>
        </div>
    )
}

export default NoteBox;
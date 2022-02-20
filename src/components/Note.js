import { useContext, useState } from "react";
import Draggable from "react-draggable";
import MainContext from "../MainContext";

function Note(note) {

    const [visible, setVisible] = useState(false);
    const [clickable, setClickable] = useState(true);
    const { setMode } = useContext(MainContext);

    /**
     * @description : to prevent description of object from popping up after object is dragged
     */
    const showNote = () => {
        if (clickable) {
            setVisible(!visible);
        }
    }

    return (
        <Draggable
            defaultPosition={{ x: note.position.x, y: note.position.y }}
            onDrag={() => setClickable(false)}
            onStart={() => setClickable(true)}
        >
            <div onMouseEnter={() => setMode(false)} className="note-container" style={{ '--color': note.color, position: 'absolute', top: 0, left: 0 }}>
                <span onClick={showNote} className="note-box-number">{note.number}</span>
                <div className="note" style={{ display: visible ? 'flex' : 'none' }}>
                    {note.note}
                </div>
            </div>
        </Draggable>

    )
}

export default Note;
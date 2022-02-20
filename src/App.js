import './App.css';
import { useRef, useEffect, useState } from 'react'
import MainContext from './MainContext'
import LeaveCommentText from './components/LeaveCommentText';
import Note from './components/Note';
import NoteBox from './components/NoteBox'

function App() {

  const screen = useRef(null);
  const [mode, setMode] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [notes, setNotes] = useState(localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [boxVisible, setBoxVisible] = useState(false);

  /**
   * @description : focus the screen current when app component is called
   */
  useEffect(() => {
    screen.current.focus();
  }, []);

  /**
   * @description : didUpdate() - save the notes in local storage when app component is called and changed the notes
   */
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  /**
   * @description : handle keyboard activities and trigger the state methods
   */
  const handleKeyUp = (e) => {
    if (e.key === 'c') {
      setMode(!mode);
      setBoxVisible(false);
    }
    if (e.key === 'Escape') {
      setBoxVisible(false);
    }
  }

  /**
   * @description : get position when mouse moved the screen
   */
  const handleMouseMove = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    });
  }

  const handleClick = (e) => {
    if (mode) {
      setBoxPosition({
        x: position.x,
        y: position.y
      });
      setBoxVisible(true);
    }
  }

  const data = {
    position,
    boxPosition,
    setMode,
    setNotes,
    notes,
    setBoxVisible
  }

  return (
    <MainContext.Provider value={data}>
      <div
        ref={screen}
        style={{ background: 'whitesmoke' }} tabIndex={0}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onKeyUp={handleKeyUp}
        className={`screen${mode && ' editable'}`}>
        <img src="https://assets.startbootstrap.com/img/screenshots/themes/sb-admin-2.jpg" alt="foto gelmiyor - 403 forbidden" />
        {
          mode && <LeaveCommentText />
        }
        {
          notes && notes.map((note, key) => <Note key={key} {...note} />)
        }
        {
          boxVisible && <NoteBox />
        }
      </div>
    </MainContext.Provider>
  );
}

export default App;

import MainContext from "../MainContext";
import { useContext } from "react";

function LeaveCommentText() {

    const { position } = useContext(MainContext);
    return (
        <div className="leave-comment-text" style={{ position: 'fixed', top: position.y, left: position.x + 35 }}>Click to add comment</div>
    )
}

export default LeaveCommentText;
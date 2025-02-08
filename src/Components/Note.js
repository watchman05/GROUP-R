import { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const Note = ({ id, text, date, handleDeleteNote, handleUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSaveEdit = () => {
    handleUpdateNote(id, editText);
    setIsEditing(false);
  };

  return (
    <div className="note">
      {isEditing ? (
        <textarea
          rows="5"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span>{text}</span>
      )}

      <div className="note-footer">
        <small>{date}</small>
        {isEditing ? (
          <button onClick={handleSaveEdit}>Save</button>
        ) : (
          <MdEdit className="edit-icon" size="1.5em" onClick={() => setIsEditing(true)} />
        )}
        <MdDeleteForever className="delete-icon" size="1.5em" onClick={() => handleDeleteNote(id)} />
      </div>
    </div>
  );
};

export default Note;

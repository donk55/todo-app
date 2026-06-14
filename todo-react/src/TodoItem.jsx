import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  function handleEditSubmit(e) {
    e.preventDefault();
    const trimmed = editValue.trim();
    if (!trimmed || trimmed === todo.title) {
      setIsEditing(false);
      setEditValue(todo.title);
      return;
    }
    onUpdate(todo._id, { title: trimmed });
    setIsEditing(false);
  }

  function handleEditCancel() {
    setIsEditing(false);
    setEditValue(todo.title);
  }

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, !todo.completed)}
      />
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            className="edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn-save">저장</button>
          <button type="button" className="btn btn-cancel" onClick={handleEditCancel}>취소</button>
        </form>
      ) : (
        <>
          <span className="todo-title">{todo.title}</span>
          <div className="todo-actions">
            <button className="btn btn-edit" onClick={() => setIsEditing(true)}>수정</button>
            <button className="btn btn-delete" onClick={() => onDelete(todo._id)}>삭제</button>
          </div>
        </>
      )}
    </li>
  );
}

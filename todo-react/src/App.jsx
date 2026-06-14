import { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';
import TodoItem from './TodoItem';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch {
      setError('할일 목록을 불러오지 못했습니다.');
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    try {
      const newTodo = await createTodo(trimmed);
      setTodos((prev) => [newTodo, ...prev]);
      setInput('');
    } catch {
      setError('할일 추가에 실패했습니다.');
    }
  }

  async function handleToggle(id, completed) {
    try {
      const updated = await updateTodo(id, { completed });
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch {
      setError('상태 변경에 실패했습니다.');
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError('삭제에 실패했습니다.');
    }
  }

  async function handleUpdate(id, data) {
    try {
      const updated = await updateTodo(id, data);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch {
      setError('수정에 실패했습니다.');
    }
  }

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <h1 className="app-title">할일 목록</h1>
      <p className="app-subtitle">남은 할일: {remaining}개</p>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}

      <form onSubmit={handleAdd} className="add-form">
        <input
          className="add-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="새 할일을 입력하세요"
        />
        <button type="submit" className="btn btn-add">추가</button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message">할일이 없습니다.</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </ul>
    </div>
  );
}

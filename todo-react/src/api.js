const BASE_URL = 'http://localhost:5000/api/todos';

export async function fetchTodos() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('할일 목록을 불러오지 못했습니다.');
  return res.json();
}

export async function createTodo(title) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('할일 생성에 실패했습니다.');
  return res.json();
}

export async function updateTodo(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('할일 수정에 실패했습니다.');
  return res.json();
}

export async function deleteTodo(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('할일 삭제에 실패했습니다.');
  return res.json();
}

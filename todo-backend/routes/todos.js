const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/todos - 할일 전체 조회
router.get('/', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// POST /api/todos - 할일 생성
router.post('/', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'title은 필수입니다.' });
  }

  const todo = new Todo({ title });
  await todo.save();
  res.status(201).json(todo);
});

// PUT /api/todos/:id - 할일 수정
router.put('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: '할일을 찾을 수 없습니다.' });
  }

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  await todo.save();
  res.json(todo);
});

// DELETE /api/todos/:id - 할일 삭제
router.delete('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: '할일을 찾을 수 없습니다.' });
  }

  res.json({ message: '삭제되었습니다.', id: req.params.id });
});

module.exports = router;

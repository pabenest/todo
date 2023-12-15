"use client";

import { useState } from 'react';
import { useTodoStore } from '../store/TodoStore'

export const InputTodo = () => {
  const addTodo = useTodoStore(state => state.addTodo);
  const [todo, setTodo] = useState('');
  return <>
    <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
    <button onClick={() => addTodo(todo)}>Add</button>
  </>
}


export const ListTodo = () => {
  const todos = useTodoStore(state => state.todos);
  return <ul>
      {todos.map(todo => <li key={todo}>{todo}</li>)}
    </ul>
}

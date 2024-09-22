import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axios';

const TodoPage = () => {
  const { loading } = useAuth();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    if (!loading) {
      fetchTodos();
    }
  }, [loading]);

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get('/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTodos(response.data.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axiosInstance.post(
        '/todos',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setTodos([...todos, response.data.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id) => {
    try {
      const response = await axiosInstance.put(
        `/todos/${id}`,
        {
          title,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? response.data.data : todo))
      );
      setEditingTodo(null);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 to-light-blue-500 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-4">My Todo List</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded p-2 w-full mt-2"
            />
            <button
              onClick={editingTodo ? () => updateTodo(editingTodo.id) : addTodo}
              className="bg-cyan-600 text-white py-2 px-4 rounded mt-2 hover:bg-cyan-700"
            >
              {editingTodo ? 'Update Todo' : 'Add Todo'}
            </button>
          </div>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <h2 className="font-bold">{todo.title}</h2>
                  <p>{todo.description}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setEditingTodo(todo);
                      setTitle(todo.title);
                      setDescription(todo.description);
                    }}
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;

import React, { useState, useEffect } from 'react';


function TodoList() {


  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');


  useEffect(() => {

    const fetchTasks = async () => {

      const res = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5'
      );

      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();

  }, []);


  
  const handleAddTask = () => {

    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
      setNewTask('');
    }
    
  };

  
  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

 
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (



    <div className="container">
      <h1 className="text-center mb-4">To-Do List</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleAddTask}>
            Add
          </button>
        </div>
      </div>




      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`list-group-item ${task.completed ? 'text-decoration-line-through' : ''}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
              <span>{task.title}</span>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteTask(task.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}





export default TodoList;









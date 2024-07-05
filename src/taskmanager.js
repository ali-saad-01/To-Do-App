import './App.css';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import axios from 'axios';

const TaskManager = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem, setCurrentEditedItem] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/gettasks');
        const tasks = response.data;
        setTodos(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        alert('Failed to fetch tasks. Please try again.');
      }
    };

    fetchTasks();
  }, []);

  const handleAddTodo = async () => {
    if (!newTitle || !newDescription) {
      alert('Please fill in both the title and description.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/createtasks', {
        title: newTitle,
        description: newDescription
      });

      const newTask = response.data.task;
      setTodos([...allTodos, newTask]);
      setNewTitle('');
      setNewDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again.');
    }
  };

  const handleDeleteTodo = async (index) => {
    try {
      const response = await axios.delete(`http://localhost:4000/delete?index=${index}`);
      const updatedTasks = response.data;
      setTodos(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleUpdateTodoo = async () => {
    if (!currentEditedItem.title || !currentEditedItem.description) {
      alert('Please fill in both the title and description.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/updateTitle?index=${currentEdit}`, {
        title: currentEditedItem.title,
        description: currentEditedItem.description
      });

      const updatedTasks = response.data;
      setTodos(updatedTasks);
      setCurrentEdit('');
      setCurrentEditedItem({ title: '', description: '' });
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }

    try {
        const response = await axios.put(`http://localhost:4000/updateDescription?index=${currentEdit}`, {
          title: currentEditedItem.title,
          description: currentEditedItem.description
        });
  
        const updatedTasks = response.data;
        setTodos(updatedTasks);
        setCurrentEdit('');
        setCurrentEditedItem({ title: '', description: '' });
      } catch (error) {
        console.error('Error updating task:', error);
        alert('Failed to update task. Please try again.');
      }
  };

  const handleComplete = async (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    try {
      const response = await axios.put(`http://localhost:4000/complete?index=${index}`, {
        completedOn: completedOn
      });

      const updatedTask = response.data.task;
      setCompletedTodos([...completedTodos, updatedTask]);
      handleDeleteTodo(index); // Remove task from allTodos
    } catch (error) {
      console.error('Error completing task:', error);
      alert('Failed to complete task. Please try again.');
    }
  };

  const handleDeleteCompletedTodo = async (index) => {
    try {
      const response = await axios.delete(`http://localhost:4000/deleteCompleted?index=${index}`);
      const updatedCompletedTasks = response.data;
      setCompletedTodos(updatedCompletedTasks);
    } catch (error) {
      console.error('Error deleting completed task:', error);
      alert('Failed to delete completed task. Please try again.');
    }
  };

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem({ ...item });
  };

  const handleUpdatedTitle = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, title: value }));
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, description: value }));
  };

  return (
    <div className="App">
      <h1>Task Scheduler</h1>

      <div className="todo-container">
        <div className="todo-input">
          <div className="input-item-container">
            <label>Task</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Insert task title"
            />
          </div>

          <div className="input-item-container">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Insert task description"
            />
          </div>

          <div className="input-item-container">
            <button type="button" onClick={handleAddTodo} className="submit-btns">
              Add Task
            </button>
          </div>
        </div>

        <div className="btn-container">
          <button
            className={`update-btns ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Incomplete Tasks
          </button>
          <button
            className={`update-btns ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed Tasks
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => (
              <div className="todo-list-items" key={index}>
                {currentEdit === index ? (
                  <div className="edit__wrapper">
                    <input
                      placeholder="Updated Title"
                      onChange={(e) => handleUpdatedTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                      placeholder="Updated Description"
                      rows={4}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditedItem.description}
                    />
                    <button
                      type="button"
                      onClick={handleUpdateTodoo}
                      className="primaryBtn"
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete"
                      />
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => handleComplete(index)}
                        title="Complete"
                      />
                      <AiOutlineEdit
                        className="edit-icon"
                        onClick={() => handleEdit(index, item)}
                        title="Edit"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-items" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <small>Completed On: {item.completedOn}</small>
                  </p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDeleteCompletedTodo(index)}
                    title="Delete"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;

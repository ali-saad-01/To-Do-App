const Task = require('../models/taskdata');
const User = require('../models/user')


    //fetches tasks from the backend to be displayed in the to do list
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log(tasks); // Log the tasks instead of the Task model
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

    //adds new tasks to the to do list
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.body);

    // Create a new task using the destructured variables
    const newTask = new Task({ title, description });

    // Save the new task to the database
    await newTask.save();

    // Send a response back to the client indicating the task was created successfully
    res.status(201).json({ msg: 'Task created successfully', task: newTask });

  } catch (error) {
    console.log('The error is:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};



    //deletes the unnecessary tasks from the todo list
const DeleteTask = async (req, res) => {
    try {
      const { index } = req.query; // Assuming index is passed as a query parameter
  
      // Fetch all tasks
      let tasks = await Task.find();
  
      // Convert tasks to an array
      const tasksArray = tasks.map(task => task.toObject());
    
      // Check if the index is valid
      if (index < 0 || index >= tasksArray.length) {
        return res.status(400).json({ msg: 'Invalid index' });
      }
  
      // Delete the task at the specified index
      const deletedTask = tasksArray.splice(index, 1)[0];
     console.log("the deleted id is",deletedTask._id, deletedTask)
      // Update the database: Delete the task using Mongoose
      await Task.findByIdAndDelete(deletedTask._id); // Assuming Task has an _id field
  
      // Fetch updated tasks after deletion
      tasks = await Task.find();
  
     
  
      // Respond with updated tasks array
      res.json(tasks);
    } catch (error) {
      console.error('The error is:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
      //updates the title of the task
  const updateTitle = async (req, res) => {
    const { index } = req.query;
    const { title } = req.body;
  
    try {
      let tasks = await Task.find();
      const tasksArray = tasks.map(task => task.toObject());
  
      if (index < 0 || index >= tasksArray.length) {
        return res.status(400).json({ msg: 'Invalid index' });
      }
  
      // Update the task's title in the database
      await Task.findByIdAndUpdate(tasksArray[index]._id, { $set: { title } });
  
      // Fetch updated tasks after update
      tasks = await Task.find();
  
      res.json(tasks);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  const updateDescription = async (req, res) => {
    const { index } = req.query;
    const { description } = req.body;
  
    try {
      let tasks = await Task.find();
      const tasksArray = tasks.map(task => task.toObject());
  
      if (index < 0 || index >= tasksArray.length) {
        return res.status(400).json({ msg: 'Invalid index' });
      }
  
      // Update the task's description in the database
      await Task.findByIdAndUpdate(tasksArray[index]._id, { $set: { description } });
  
      // Fetch updated tasks after update
      tasks = await Task.find();
  
      res.json(tasks);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  };

  const forgetPass = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      // Update user's password
      const result = await User.updateOne({ email }, { $set: { password: newPassword } });
      console.log(result)
      // Check if any document was modified
      if (result.modifiedCount === 0) {
        return res.status(404).json({ msg: 'User not found or password already set to the same value' });
      }
  
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error('Error in forgetPass:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  };

  const createUser = async (req, res) => {
    try {
      console.log("the body is",req.body.body)
      const { username, email, password } = req.body;
  
      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
      }
  
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create new user
      const newUser = new User({
        username,
        email,
        password,
      });
  
      // Save user to database
      await newUser.save();
  
      res.status(201).json({ msg: 'User created successfully', user: newUser });
    } catch (error) {
      console.log('the error is:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  };

  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getUserByEmail = async (req, res) => {
    const { email } = req.query; // Assuming email is passed as a query parameter
  
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  
module.exports = { getAllTasks, createTask, DeleteTask, updateTitle, updateDescription, forgetPass, getAllUsers, createUser, getUserByEmail };

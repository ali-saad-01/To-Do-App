import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './signup';
import Signin from './signin';
import Forgotpassword from './forgotpassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import TaskManager from './taskmanager'; // Assuming TaskManager component path

function App() {
  return (
    <div>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">React Project</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item ml-2">
                    <Link className="nav-link active text-light" to="/">Home</Link>
                  </li>
                  <li className="nav-item ml-2">
                    <Link className="nav-link text-light" to="/signin">Sign in</Link>
                  </li>
                  <li className="nav-item ml-2">
                    <Link className="nav-link text-light" to="/signup">Signup</Link>
                  </li>
                  <li className="nav-item ml-2">
                    <Link className="nav-link text-light" to="/taskmanager">Task Manager</Link>
                  </li>
                </ul>
                <form className="d-flex">
                  <input className="form-control me-2 text-light" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-dark btn-outline-success" type="submit">Search</button>
                </form>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path='/' element={<Signup/>}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/forgotpassword' element={<Forgotpassword />} />
            <Route path='/taskmanager' element={<TaskManager />} /> {/* Added TaskManager route */}
          </Routes>

        </Router>
    </div>
  );
}

export default App;

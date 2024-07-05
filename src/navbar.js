import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Signup from './signup';
import Signin from './signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Forgotpassword from './forgotpassword';

function App() {
    return (
        <div >
          <AuthProvider>
          <Router>
              <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <div className="container-fluid">
                  <a className="navbar-brand " href="/">React Project</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item ml-2">
                        <a className="nav-link active text-light" aria-current="page" href="/">Home</a>
                      </li>
                      <li className="nav-item ml-2">
                        <a className="nav-link text-light" href="/signin">Sign in</a>
                      </li>
                      <li className="nav-item ml-2">
                        <a className="nav-link text-light" href="/signup">Signup</a>
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
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/forgotpassword' element={<Forgotpassword/>}/>
    
            
    
           </Routes>
    
          </Router>
          </AuthProvider>
        </div>
      );


};

export default App;

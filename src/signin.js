import React, {useState, useEffect} from "react"
import { useNavigate} from "react-router-dom"

const Signin = () => {
    const [signindetails, setSignindetails] = useState({
        email: '',
        password: '',
    });

    const signinfunction = (e) => {
        const {name, value} = e.target;
        setSignindetails({...signindetails, [name]: value});
    };

    const storedetails = async (e) => {
        e.preventDefault();
        const {email, password} = signindetails;
        try {
            const response = await fetch(`http://localhost:4000/getUserByEmail/?email=${email}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            });
            console.log(response)
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
            console.log("the data is--->:", data);
      
            if (data && data.email === email && data.password === password) {
              // Authentication successful, redirect to dashboard or any other page // Assuming you have a login function in AuthContext
              navigate('/taskmanager');
            } else {
              alert('Invalid email or password');
            }
          } catch (error) {
            console.log("the error is:", error.message);
          }
        };

    const navigate = useNavigate();

    const navforgot = () => {
        navigate('/forgotpassword')
    }

    return (
        <div className="container-fluid" style={{ backgroundColor: '#e91e63', width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
          <form style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }} onSubmit={storedetails}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={signindetails.email} onChange={signinfunction} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={signindetails.password} onChange={signinfunction} />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-primary" onClick={navforgot}>Forgot Password?</button>
            </div>
    
          </form>
        </div>
      );

}

export default Signin
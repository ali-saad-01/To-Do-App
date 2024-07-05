import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () =>{
    const [accountdetails, setAccountdetails] = useState({
        username: '',
        email: '',
        password: '',
    });

    const signupfunction = (e) => {
        const {name, value} =e.target;
        setAccountdetails({...accountdetails, [name]:value});
    };

    const [existingAccount, setExistingAccount] = useState(false);


    const storeaccountdetails = async (e) => {
        e.preventDefault();

        if (!accountdetails.username) {
            alert('Please fill in the username');
            return;
          }
          if (!accountdetails.email) {
            alert('Please fill in the email');
            return;
          }
          if (!accountdetails.password) {
            alert('Please fill in the password');
            return;
          }

          try {
            const response = await fetch('http://localhost:4000/createuser', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(accountdetails)
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
            console.log("the data is--->:", data);
      
            if (data.msg === 'User already exists') {
              setExistingAccount(true);
            } else {
              navigate('/signin');
            }
          } catch (error) {
            console.log("the error is:", error.message);
          }
        };

    const navigate = useNavigate();

    const navsignin = () => {
        navigate('/signin')
    };

    return (
        <div className="container-fluid" style={{ backgroundColor: '#e91e63', width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
          <div>
            <form className='text-center' style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }} onSubmit={storeaccountdetails}>
              <label className='form-label text-dark' htmlFor="name">User Name</label> <br />
              <input className="form-control"
                type="text"
                id="name"
                placeholder="Username"
                name="username"
                value={accountdetails.username}
                onChange={signupfunction}
              /> <br />
              <label className="form-label text-dark" htmlFor="email">Email</label> <br />
              <input className="form-control"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={accountdetails.email}
                onChange={signupfunction}
              /> <br />
              <label className="form-label text-dark" htmlFor="password">Enter Password</label> <br />
              <input className="form-control"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={accountdetails.password}
                onChange={signupfunction}
              /> <br />
              <button className="btn btn-primary mt-1 mb-1" type="submit">Sign Up</button>
              {existingAccount && (
                <div>
                  <p>Email is already in use.</p>
                  <button type="button" onClick={navsignin}>Login</button>
                  <button type="button" onClick={() => setExistingAccount(false)}>Stay</button>
                </div>
              )}
            </form>
          </div>
        </div>
      );
};

export default Signup;
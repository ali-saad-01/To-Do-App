import React, {useState, useEffect} from "react"
import { useNavigate} from "react-router-dom"

const Forgotpassword = () => {
    const [newpass, setNewpass] = useState({
        email: '',
        password: '',
    });

    const passchangefunc = (e) => {
        const {name, value} = e.target;
        setNewpass({...newpass, [name]: value})
    };

    const navigate = useNavigate();
    
    const storenewpass = async (e) => {
        e.preventDefault();
        const {email, password} = newpass;
        try {
            const response = await fetch('http://localhost:4000/forgetpassword', {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({email, newPassword: password})
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            // Assuming server response is a success message or error message
            const data = await response.json();
            console.log("Server response:", data);
      
            // Assuming server returns a success message upon password reset
            alert("Password reset successful!"); // You can replace this with a toast or redirect to login page
      
            // Redirect to login page
            navigate('/login');
          } catch (error) {
            console.log("the error is:", error.message);
            // Handle error (e.g., show error message)
            alert("Password reset failed. Please try again.");
          }
    };

    return (
        <div className="container-fluid" style={{ backgroundColor: '#e91e63', width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
          <form style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }} onSubmit={storenewpass}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={newpass.email} onChange={passchangefunc} />
              <div id="emailHelp" className="form-text">Please enter your email address.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={newpass.password} onChange={passchangefunc} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      );

}

export default Forgotpassword;
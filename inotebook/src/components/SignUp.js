import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom';
const SignUp = () => {

  const [creds, setCreds] = useState({name:"", email: "", password: "" })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(`http://localhost:3001/api/auth/createUser`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ name:creds.name, email: creds.email, password: creds.password }),
      });

      const data = await response.json();
      if(data.success){
          navigate('/');

      }
      //response should generate auth token 
      console.log("Signed Up", data);
      // Reset the state of `creds` to an empty object
      setCreds({ name:"",email: "", password: "" });

  }
  const onChange = (e) => {
      setCreds({ ...creds, [e.target.name]: e.target.value })
   
  }



  return (
    <div className="container custom-container border border-dark rounded mt-6  ">
        <style>
        {`
          .custom-container {
            max-width: 500px;
            margin-top: 50px;
          }
        `}
      </style>
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" placeholder="Enter your name" name='name' onChange={onChange} value={creds.name} autoComplete='off'/>
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email </label>
      <input type="email" className="form-control" id="email" placeholder="Enter your email" name='email' onChange={onChange} value={creds.email} autoComplete='off'/>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" placeholder="Enter your password" name='password' onChange={onChange} value={creds.password} required minLength={6} autoComplete='off'/>
    </div>
    <div className="d-flex justify-content-center mb-3">
      <button type="submit" className="btn btn-primary">Submit</button>
    </div>
  </form>
</div>

  )
}

export default SignUp
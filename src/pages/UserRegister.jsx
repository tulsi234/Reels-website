
import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const UserRegister = () => {

    const navigate = useNavigate();


  const handleSubmit = async(e) => { 
    e.preventDefault();

    const fullName = e.target.name.value;   // matches input name="name"
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Example axios call
    const response  = await axios.post("http://localhost:3000/api/auth/user/register", {
      fullName,
      email,
      password
    },{
        withCredentials: true
    });

    console.log(response.data);

    navigate("/")
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <header className="auth-header">
          <p className="auth-tag">Customer Registration</p>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Sign up to browse menus, save favorites, and order with ease.</p>
        </header>

        {/* Attach onSubmit */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="user-name">Full name</label>
          <input id="user-name" name="name" type="text" placeholder="John Doe" />

          <label htmlFor="user-email">Email address</label>
          <input id="user-email" name="email" type="email" placeholder="john@example.com" />

          <label htmlFor="user-password">Password</label>
          <input id="user-password" name="password" type="password" placeholder="••••••••" />

          {/* Change type to submit */}
          <button type="submit" className="auth-button">Create account</button>
        </form>

        <div className="auth-footer">
          <p>Already a customer? <Link to="/user/login">Log in</Link></p>
          <p><Link to="/food-partner/register">Register as food partner</Link> · <Link to="/user/register">Register as user</Link></p>
        </div>
      </section>
    </main>
  )
}

export default UserRegister


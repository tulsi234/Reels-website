import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login", // 👈 register → login
        { email, password },
        { withCredentials: true }
      );

      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <header className="auth-header">
          <p className="auth-tag">Customer login</p>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Access your account and continue exploring great food picks.</p>
        </header>

        {/* Attach onSubmit */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="user-login-email">Email address</label>
          <input id="user-login-email" name="email" type="email" placeholder="john@example.com" />

          <label htmlFor="user-login-password">Password</label>
          <input id="user-login-password" name="password" type="password" placeholder="••••••••" />

          {/* Change type to submit */}
          <button type="submit" className="auth-button">Sign in</button>
        </form>

        <div className="auth-footer">
          <p>New here? <a href="/user/register">Create account</a></p>
          <p><a href="/food-partner/login">Partner login</a></p>
        </div>
      </section>
    </main>
  )
}

export default UserLogin

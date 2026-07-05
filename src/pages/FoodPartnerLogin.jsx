import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();

    // form se values nikalna
    const businessEmail = e.target.email.value;
    const password = e.target.password.value;

    try {
      // axios call backend ke sath align
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        { businessEmail, password },
        { withCredentials: true }
      );

      console.log(response.data);
      navigate("/create-food");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <header className="auth-header">
          <p className="auth-tag">Partner login</p>
          <h1 className="auth-title">Access partner dashboard</h1>
          <p className="auth-subtitle">Sign in to manage orders, menus, and your profile.</p>
        </header>

        {/* Attach onSubmit */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="partner-login-email">Email address</label>
          <input id="partner-login-email" name="email" type="email" placeholder="partner@example.com" />

          <label htmlFor="partner-login-password">Password</label>
          <input id="partner-login-password" name="password" type="password" placeholder="••••••••" />

          <button type="submit" className="auth-button">Sign in</button>
        </form>

        <div className="auth-footer">
          <p>New food partner? <a href="/food-partner/register">Create account</a></p>
          <p><a href="/user/login">Customer login</a></p>
        </div>
      </section>
    </main>
  )
}

export default FoodPartnerLogin

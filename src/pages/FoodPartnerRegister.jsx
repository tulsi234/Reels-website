import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurantName = e.target.restaurant.value;
    const ownerName = e.target.owner.value;
    const phoneNumber = e.target.phone.value;
    const businessAddress = e.target.address.value;
    const city = e.target.city.value;
    const businessEmail = e.target.email.value;
    const password = e.target.password.value;

      const response  = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          restaurantName,
          ownerName,
          phoneNumber,
          businessAddress,
          city,
          businessEmail,
          password
        },
        { withCredentials: true });

      console.log(response.data);
      navigate("/create-food");
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <header className="auth-header">
          <p className="auth-tag">Partner registration</p>
          <h1 className="auth-title">Partner Sign Up</h1>
          <p className="auth-subtitle">Create an account to manage your restaurant, menu, and orders.</p>
        </header>

        {/* Attach onSubmit */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="partner-name">Restaurant name</label>
          <input id="partner-name" name="restaurant" type="text" placeholder="Cafe Aurora" />

          <label htmlFor="partner-owner">Owner name</label>
          <input id="partner-owner" name="owner" type="text" placeholder="Alex Morgan" />

          <label htmlFor="partner-phone">Phone number</label>
          <input id="partner-phone" name="phone" type="tel" placeholder="+1 555 123 4567" />

          <label htmlFor="partner-address">Business address</label>
          <input id="partner-address" name="address" type="text" placeholder="123 Market Street" />

          <label htmlFor="partner-city">City</label>
          <input id="partner-city" name="city" type="text" placeholder="San Francisco" />

          <label htmlFor="partner-email">Business email</label>
          <input id="partner-email" name="email" type="email" placeholder="partner@example.com" />

          <label htmlFor="partner-password">Password</label>
          <input id="partner-password" name="password" type="password" placeholder="••••••••" />

          {/* Change type to submit */}
          <button type="submit" className="auth-button">Create partner account</button>
        </form>

        <div className="auth-footer">
          <p>Already partnered? <Link to="/food-partner/login">Log in</Link></p>
          <p><Link to="/user/register">Register as user</Link> · <Link to="/food-partner/register">Register as food partner</Link></p>
        </div>
      </section>
    </main>
  )
}

export default FoodPartnerRegister;
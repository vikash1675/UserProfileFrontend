import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Registration.css';

function RegistrationForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        if (localStorage.getItem('login')) {
            navigate("/login");
        }
    }

    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const isValidName = (name) => {
        return name.length > 0;
    };

    const isValidPassword = (password) => {
        return password.length >= 8;
    };

    const isValidAge = (age) => {
        return age >= 18 && age <= 120;
    };

    const handleRegistration = async () => {
        if (!isValidName(formData.name)) {
            alert('Please enter a valid name.');
            return;
        }

        if (!isValidEmail(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!isValidPassword(formData.password)) {
            alert('Please enter a valid password (at least 8 characters long).');
            return;
        }

        if (!isValidAge(formData.age)) {
            alert('Please enter a valid age.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/user/register', formData);
            console.log(response.data.message);

            if (localStorage.getItem('localData')) {
                navigate("/login");
            }

            if (response.status === 200) {
                alert(response.data.message);
                navigate("/login");
            }
        } catch (error) {
            alert(error.response.data.message);
            console.log(error.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <div className="registration-form">
                <h2>Registration</h2>
                <form>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        required
                        pattern="[A-Za-z ]+"
                        onChange={handleChange}
                    /><br></br>
                    <br></br>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        required
                        onChange={handleChange}
                    /><br></br>
                    <br></br>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <br></br>
                    <br></br>
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        min="0"
                        max="120"
                    />
                    <br></br>
                    <br></br>
                    <button type="button" onClick={handleRegistration}>
                        Register
                    </button>
                    &nbsp;&nbsp;
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;

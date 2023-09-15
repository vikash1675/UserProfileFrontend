import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/UpdateProfile.css';

function UpdateProfile() {
    const [updatedUserData, setUpdatedUserData] = useState({
        name: '',
        email: '',
        age: ''
    });

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        email: '',
        age: ''
    });

    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();
    var getId = JSON.parse(localStorage.getItem('localData'));

    const cancelHandel = () => {
        navigate(`/profile`);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:4000/user/profile/${getId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userData = response.data.userData;

                setUpdatedUserData(userData);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:4000/user/updateProfile/${getId}`,
                updatedUserData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            if (response.status === 200) {
                navigate('/profile');
            }
        } catch (error) {
            console.error('Profile update error:', error);
        }
    };

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validateAge = (age) => {
        return age >= 18 && age <= 120;
    };

    const validateName = (name) => {
        return name.trim() !== '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData({ ...updatedUserData, [name]: value });
    };

    const handleValidation = () => {
        const errors = {
            name: '',
            email: '',
            age: ''
        };

        if (!validateName(updatedUserData.name)) {
            errors.name = 'Name is required';
        }

        if (!validateEmail(updatedUserData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!validateAge(updatedUserData.age)) {
            errors.age = 'Age must be between 18 and 120';
        }

        setValidationErrors(errors);

        return Object.values(errors).every((error) => error === '');
    };

    const handleSubmit = () => {
        if (handleValidation()) {
            handleUpdateProfile();
        } else {
            setShowAlert(true);
        }
    };

    return (
        <div className="updateprofile-container">
            <div className="updateprofile-form">
                <h2>Update Profile</h2>
                {showAlert && <div className="alert">Please correct the input errors.</div>}
                <form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={updatedUserData.name}
                            onChange={handleInputChange}
                        />
                        <div className="error">{validationErrors.name}</div>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={updatedUserData.email}
                            onChange={handleInputChange}
                        />
                        <div className="error">{validationErrors.email}</div>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={updatedUserData.age}
                            onChange={handleInputChange}
                        />
                        <div className="error">{validationErrors.age}</div>
                    </div>
                    <br />
                    <button type="button" onClick={handleSubmit}>
                        Update Profile
                    </button>
                    &nbsp;&nbsp;
                    <button type="button" onClick={cancelHandel}>
                        Cancel Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;

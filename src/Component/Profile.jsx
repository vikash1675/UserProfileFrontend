import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Profile.css';
import { useNavigate } from 'react-router-dom';

function Profile() {

    const navigate = useNavigate();

    const handleLogin = async () => {
        navigate('/updateProfile')
    }
    const [userData, setUserData] = useState(null);

    var getId = JSON.parse(localStorage.getItem('localData'));
    // console.log(getId);


    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(token);
                const response = await axios.get(`http://localhost:4000/user/profile/${getId}`, {
                    headers: {
                        "authorization": `Bearer ${token}`,
                    },
                }
                );
                console.log(response);

                if (response.data) {
                    setUserData(response.data.userData);
                } else {
                    console.error('Profile data retrieval error:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Profile data retrieval error:', error);
            }
        };

        fetchProfileData();
    }, [getId]);

    return (
        <div className="profile-container">
            <div className="profile-form">
                <h2>User Profile</h2>
                {userData ? (
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td>{userData.name}</td>
                                </tr>
                                <br></br>
                                <tr>
                                    <td>Email:</td>
                                    <td>{userData.email}</td>
                                </tr>
                                <br></br>
                                <tr>
                                    <td>Age:</td>
                                    <td>{userData.age}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br></br>
                        <button type="button" onClick={handleLogin}>
                            Edit Profile
                        </button>

                    </div>
                ) : (
                    <p>Loading profile data...</p>
                )}
            </div>
        </div>
    );

}

export default Profile;

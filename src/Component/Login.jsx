import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleRegi = async () => {
        navigate('/register')
    }
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:4000/user/login', loginData);
            console.log(response);

            if (response.status === 200) {

                alert(response.data.message)

                const token = response.data.token;
                localStorage.setItem("token", token);

                const userId = response.data.uresData._id;
                var id = JSON.stringify(userId)
                // console.log(id);
                localStorage.setItem("localData", id)

                navigate(`/profile`);
            }

        } catch (error) {
            alert(error.response.data.message)
            console.log(error.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form>
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={(e) =>
                                setLoginData({ ...loginData, email: e.target.value })
                            }
                        />
                        <br></br>
                        <br></br>
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={(e) =>
                                setLoginData({ ...loginData, password: e.target.value })
                            }
                        />
                        <br></br>
                        <br></br>
                    </div>
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                    &nbsp;&nbsp;
                    <button type="button" onClick={handleRegi}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;

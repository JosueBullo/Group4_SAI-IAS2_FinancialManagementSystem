// // src/components/Register.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/register/', { username, password });
//             setMessage(response.data.message);
//         } catch (error) {
//             setMessage("Registration failed.");
//         }
//     };

//     return (
//         <div>
//             <h2>Register</h2>
//             <form onSubmit={handleRegister}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit">Register</button>
//             </form>
//             <p>{message}</p>
//         </div>
//     );
// };

// export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Correct import for React Router v6

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Hook to navigate to another route

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', { username, password });
            setMessage(response.data.message);

            if (response.data.success) {
                // Redirect to the login page after successful registration
                navigate('/login');
            }
        } catch (error) {
            setMessage("Registration failed.");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Register;

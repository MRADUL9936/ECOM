import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    
        // Send data to the backend
        axios.post("http://localhost:3000/user/signup", 
            {
                email,
                password,
                confirmPassword
            }, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            console.log(response.data); // Log the response data
            alert(response.data.Success || "Registration Successful");
            navigate("/login"); // Navigate to login page on successful registration
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                alert(error.response.data.error || "Registration failed");
            } else if (error.request) {
                alert("No response from server. Please try again.");
            } else {
                alert("An error occurred. Please try again.");
            }
        });
    };

    return (
        <div className="flex justify-center items-center bg-gray-200 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                name="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            >
                                {!showPassword ? "show":"hide"}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Enter Password again"
                                name="confirmPassword"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            >
                                {!showConfirmPassword ?"show":"hide"}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">Already have an account?</p>
                <Link
                    to="/login"
                    className="block text-center mt-2 text-blue-500 hover:underline"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Registration validation
        if (isRegister && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must contain at least 6 characters.');
            return;
        }

        setLoading(true);

        try {

            // Demo authentication
            // Replace this with your actual API authentication.

            const userData = {
                id: Date.now(),
                name: isRegister
                    ? formData.name.trim()
                    : formData.email.split('@')[0],
                email: formData.email,
                avatar: null
            };

            // Save user in AuthContext
            login(userData);

            // Navigate to home
            navigate('/');

        } catch (err) {

            console.error('Authentication error:', err);

            setError('Something went wrong. Please try again.');

        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {

        setIsRegister(!isRegister);

        setError('');

        setShowPassword(false);

        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="auth-page">

            <div className="auth-background">
                <div className="auth-glow glow-one"></div>
                <div className="auth-glow glow-two"></div>
            </div>

            <div className="auth-container">

                {/* Left Side - Branding */}
                <div className="auth-branding">

                    <Link to="/" className="auth-logo">
                        <span className="logo-icon">
                            <i className="fa-solid fa-ticket"></i>
                        </span>

                        <span>EventHorizon</span>
                    </Link>

                    <div className="branding-content">

                        <span className="branding-tag">
                            YOUR NEXT EXPERIENCE STARTS HERE
                        </span>

                        <h1>
                            Discover.
                            <br />
                            Experience.
                            <br />
                            <span>Remember.</span>
                        </h1>

                        <p>
                            Join EventHorizon and discover unforgettable
                            concerts, sports, workshops and live experiences.
                            Your next great memory is just one ticket away.
                        </p>

                        <div className="branding-features">

                            <div>
                                <i className="fa-solid fa-ticket"></i>
                                <span>Easy Ticket Booking</span>
                            </div>

                            <div>
                                <i className="fa-solid fa-chair"></i>
                                <span>Choose Your Own Seats</span>
                            </div>

                            <div>
                                <i className="fa-solid fa-qrcode"></i>
                                <span>Instant E-Tickets</span>
                            </div>

                        </div>

                    </div>

                    <div className="branding-footer">
                        © 2026 EventHorizon. All rights reserved.
                    </div>

                </div>

                {/* Right Side - Authentication Form */}
                <div className="auth-form-section">

                    <div className="auth-form-card">

                        <div className="auth-mobile-logo">
                            <i className="fa-solid fa-ticket"></i>
                            EventHorizon
                        </div>

                        <div className="auth-heading">

                            <span className="auth-welcome">
                                {isRegister ? 'GET STARTED' : 'WELCOME BACK'}
                            </span>

                            <h2>
                                {isRegister
                                    ? 'Create your account'
                                    : 'Sign in to your account'}
                            </h2>

                            <p>
                                {isRegister
                                    ? 'Create an account and start booking amazing events.'
                                    : 'Enter your details to access your account.'}
                            </p>

                        </div>

                        {/* Login / Register Tabs */}
                        <div className="auth-tabs">

                            <button
                                type="button"
                                className={!isRegister ? 'active' : ''}
                                onClick={() => !isRegister ? null : switchMode()}
                            >
                                Login
                            </button>

                            <button
                                type="button"
                                className={isRegister ? 'active' : ''}
                                onClick={() => isRegister ? null : switchMode()}
                            >
                                Register
                            </button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            {/* Full Name */}
                            {isRegister && (
                                <div className="form-group">

                                    <label>Full Name</label>

                                    <div className="input-wrapper">

                                        <i className="fa-regular fa-user"></i>

                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>
                            )}

                            {/* Email */}
                            <div className="form-group">

                                <label>Email Address</label>

                                <div className="input-wrapper">

                                    <i className="fa-regular fa-envelope"></i>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            {/* Password */}
                            <div className="form-group">

                                <label>Password</label>

                                <div className="input-wrapper">

                                    <i className="fa-solid fa-lock"></i>

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'
                                            }`}></i>
                                    </button>

                                </div>

                            </div>

                            {/* Confirm Password */}
                            {isRegister && (
                                <div className="form-group">

                                    <label>Confirm Password</label>

                                    <div className="input-wrapper">

                                        <i className="fa-solid fa-lock"></i>

                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            minLength={6}
                                        />

                                    </div>

                                </div>
                            )}

                            {/* Login Options */}
                            {!isRegister && (
                                <div className="form-options">

                                    <label className="remember-me">
                                        <input type="checkbox" />
                                        Remember me
                                    </label>

                                    <Link to="/forgot-password">
                                        Forgot password?
                                    </Link>

                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <div className="auth-error">

                                    <i className="fa-solid fa-circle-exclamation"></i>

                                    {error}

                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                className="auth-submit-btn"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                        Please wait...
                                    </>
                                ) : (
                                    <>
                                        {isRegister ? 'Create Account' : 'Sign In'}
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </>
                                )}

                            </button>

                        </form>

                        {/* Social Login */}
                        <div className="auth-divider">
                            <span>OR CONTINUE WITH</span>
                        </div>

                        <div className="social-login">

                            <button
                                type="button"
                                onClick={() => alert('Google login integration required.')}
                            >
                                <i className="fa-brands fa-google"></i>
                                Google
                            </button>

                            <button
                                type="button"
                                onClick={() => alert('Apple login integration required.')}
                            >
                                <i className="fa-brands fa-apple"></i>
                                Apple
                            </button>

                        </div>

                        {/* Switch Login / Register */}
                        <p className="auth-switch">

                            {isRegister
                                ? 'Already have an account?'
                                : "Don't have an account?"}

                            <button
                                type="button"
                                onClick={switchMode}
                            >
                                {isRegister ? 'Login' : 'Create Account'}
                            </button>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
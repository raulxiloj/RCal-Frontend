import React, { useState } from 'react'
import './login.css'

export const LoginScreen = () => {

    const [formSign, setForm] = useState(true); //If true = signin || false = signup

    return (
        <div className="container-2">
            <div className={formSign ? 'cont' : 'cont right-panel-active'} id="cont">

                <div className="form-container sign-up-container">
                    <form >
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button >Sign Up</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form >
                        <h1 className="mb-4">Sign in</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="/">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={() => { setForm(true) }}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={() => { setForm(false) }}>Sign Up</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

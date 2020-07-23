import React, { useState } from 'react'
import styles from './login.module.css'

export const LoginScreen = () => {

    const [formSign, setForm] = useState(true); //If true = signin || false = signup

    return (
        <div className={styles.container}>
            <div className={formSign ? styles.cont : `${styles.cont} ${styles['right-panel-active']}`} id="cont">

                <div className={`${styles['form-container']} ${styles['sign-up-container']}`}>
                    <div className={`${styles['form']}`}>
                        <form >
                            <h1>Create Account</h1>
                            <input className={`${styles['input']}`} type="text" placeholder="Name" />
                            <input className={`${styles['input']}`} type="email" placeholder="Email" />
                            <input className={`${styles['input']}`} type="password" placeholder="Password" />
                            <button >Sign Up</button>
                        </form>
                    </div>
                </div>

                <div className={`${styles['form-container']} ${styles['sign-in-container']}`}>
                    <div className={`${styles['form']}`}>
                        <form>
                            <h1 className={`${styles['mb-4']}`}>Sign in</h1>
                            <input className={`${styles['input']}`} type="email" placeholder="Email" />
                            <input className={`${styles['input']}`} type="password" placeholder="Password" />
                            <a href="/">Forgot your password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>
                </div>

                <div className={`${styles['overlay-container']}`}>
                    <div className={styles.overlay}>
                        <div className={`${styles['overlay-panel']} ${styles['overlay-left']}`}>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className={styles.ghost} id="signIn" onClick={() => { setForm(true) }}>Sign In</button>
                        </div>
                        <div className={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className={styles.ghost} id="signUp" onClick={() => { setForm(false) }}>Sign Up</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

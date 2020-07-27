import React, { useState } from 'react'
import styles from './login.module.css'
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const LoginScreen = () => {

    const [formSign, setForm] = useState(true); //If true = signin || false = signup
    const dispatch = useDispatch();

    /* ------------------- LOGIN ------------------- */
    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: '',
        lPassword: ''
    });

    const { lEmail, lPassword } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    }

    /* ------------------- REGISTER --------------------*/
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: '',
        rEmail: '',
        rPassword: '',
        rPassword2: ''
    });

    const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (rPassword !== rPassword2) {
            return Swal.fire('Error', 'Passwords should match', 'error');
        }

        dispatch(startRegister(rName, rEmail, rPassword));

    }

    return (
        <div className={styles.container}>
            <div className={formSign ? styles.cont : `${styles.cont} ${styles['right-panel-active']}`} id="cont">

                <div className={`${styles['form-container']} ${styles['sign-up-container']}`}>
                    <div className={`${styles['form']}`}>
                        <form onSubmit={handleRegister}>
                            <h1>Create Account</h1>
                            <input className={`${styles['input']}`}
                                type="text"
                                placeholder="Name"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange} />
                            <input className={`${styles['input']}`}
                                type="email"
                                placeholder="Email"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange} />
                            <input className={`${styles['input']}`}
                                type="password"
                                placeholder="Password"
                                name="rPassword"
                                value={rPassword}
                                onChange={handleRegisterInputChange} />
                            <input className={`${styles['input']}`}
                                type="password"
                                placeholder="Confirm password"
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange} />
                            <button className={`${styles.button}`}>Sign Up</button>
                        </form>
                    </div>
                </div>

                <div className={`${styles['form-container']} ${styles['sign-in-container']}`}>
                    <div className={`${styles['form']}`}>
                        <form onSubmit={handleLogin}>
                            <h1 className={`${styles['mb-4']}`}>Sign in</h1>
                            <input className={`${styles['input']}`}
                                type="email"
                                placeholder="Email"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange} />
                            <input className={`${styles['input']}`}
                                type="password"
                                placeholder="Password"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange} />
                            <a href="/">Forgot your password?</a>
                            <button className={`${styles.button}`}>Sign In</button>
                        </form>
                    </div>
                </div>

                <div className={`${styles['overlay-container']}`}>
                    <div className={styles.overlay}>
                        <div className={`${styles['overlay-panel']} ${styles['overlay-left']}`}>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className={`${styles['ghost']} ${styles['button']}`} id="signIn" onClick={() => { setForm(true) }}>Sign In</button>
                        </div>
                        <div className={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className={`${styles['ghost']} ${styles['button']}`} id="signUp" onClick={() => { setForm(false) }}>Sign Up</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

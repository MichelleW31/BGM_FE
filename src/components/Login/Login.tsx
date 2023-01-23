import styles from './Login.module.scss';
import Image from 'components/Image/Image';
import {ReactElement, useState} from 'react';
import {NavLink} from 'react-router-dom';

const Login = (): ReactElement => {
  const [user, setUser] = useState<{username: string; password: string}>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{errorStatus: boolean; errorMessage: string}>({
    errorStatus: false,
    errorMessage: '',
  });
  //   const [token, setToken] = useState<string>();

  const {username, password} = user;
  const {errorStatus, errorMessage} = errors;

  const errorCheck = (): void => {
    const message: string = 'Please enter a valid username and password.';

    // empty credentials error
    if (username === '' || password === '') {
      setErrors({...errors, errorStatus: true, errorMessage: message});
    } else {
      setErrors({...errors, errorStatus: false, errorMessage: ''});
    }

    // authentication error
    checkAuthentication();
  };

  const checkAuthentication = (): void => {
    console.log('authenticating');
  };

  const login = (): void => {
    errorCheck();
  };

  return (
    <section className={styles.LoginContainer}>
      <Image />
      <section className={styles.LoginForm}>
        <h2 className={styles.FormHeaderCopy}>Login</h2>
        <section>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUser({...user, username: e.target.value})}
          />
          <input
            type='text'
            placeholder='Password'
            value={password}
            onChange={(e) => setUser({...user, password: e.target.value})}
          />
        </section>
        {errorStatus && <p className={styles.Error}>{errorMessage}</p>}
        <button className={styles.LoginButton} onClick={() => login()}>
          Login
        </button>
        <p className={styles.ForgotPasswordCopy}>Forgot Password</p>
        <section className={styles.CreateAccountCopy}>
          <p>New to BGM?</p>
          <p>
            <NavLink to='/signup'>Create an account.</NavLink>
          </p>
        </section>
      </section>
    </section>
  );
};

export default Login;

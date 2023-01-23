/* eslint-disable @typescript-eslint/no-misused-promises */
import styles from './Signup.module.scss';
import {ReactElement, useRef, useState, useEffect} from 'react';
import Image from 'components/Image/Image';
import {NavLink} from 'react-router-dom';
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Signup = (): ReactElement => {
  const [user, setUser] = useState<{username: string; password: string; passwordMatch: string}>({
    username: '',
    password: '',
    passwordMatch: '',
  });
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [success, setSuccess] = useState(false);

  const [errors, setErrors] = useState<{errorStatus: boolean; errorMessage: string}>({
    errorStatus: false,
    errorMessage: '',
  });

  const {username, password, passwordMatch} = user;
  const {errorStatus, errorMessage} = errors;

  const errorCheck = (): void => {
    const message: string = 'Please enter a valid username and password.';

    // empty credentials error
    if (username === '' || password === '' || passwordMatch === '') {
      setErrors({...errors, errorStatus: true, errorMessage: message});
    } else {
      setErrors({...errors, errorStatus: false, errorMessage: ''});
    }
  };

  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userRef.current !== null) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === passwordMatch);
  }, [password, passwordMatch]);

  useEffect(() => {
    setErrors({...errors, errorStatus: false, errorMessage: ''});
  }, [username, password, passwordMatch]);

  const signUp = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrors({...errors, errorStatus: true, errorMessage: 'Invalid Entry'});
      return;
    }
    errorCheck();
  };

  return (
    <section className={styles.SignupContainer}>
      <Image />
      <section className={styles.SignupForm}>
        <h2 className={styles.FormHeaderCopy}>Signup</h2>
        <form onSubmit={signUp}>
          <label hidden htmlFor='username'>
            Username:
          </label>
          <section className={styles.Input}>
            <section className={styles.InputArrowContainer}>
              <input
                type='text'
                id='username'
                ref={userRef}
                autoComplete='off'
                required
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby='uidnote'
                placeholder='Username'
                value={username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              {validName && (
                <span className={styles.Valid}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
              {validName || username === '' ? null : (
                <span className={styles.Invalid}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              )}
            </section>
            <p
              id='uidnote'
              className={userFocus && username !== '' && !validName ? styles.Instructions : styles.Offscreen}
            >
              <FontAwesomeIcon icon={faInfoCircle} />4 to 24 characters
              <br /> Must begin with a letter. <br /> Letters, number, underscores, hyphens allowed.
            </p>
          </section>

          <label hidden htmlFor='password'>
            Password:
          </label>
          <section className={styles.Input}>
            <section className={styles.InputArrowContainer}>
              <input
                type='password'
                id='password'
                required
                aria-invalid={validPassword ? 'false' : 'true'}
                aria-describedby='pwdnote'
                placeholder='Password'
                value={password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              {validPassword && (
                <span className={styles.Valid}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
              {validPassword || password === '' ? null : (
                <span className={styles.Invalid}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              )}
            </section>
            <p id='pwdnote' className={passwordFocus && !validPassword ? styles.Instructions : styles.Offscreen}>
              <FontAwesomeIcon icon={faInfoCircle} />8 to 24 characters
              <br /> Must include uppercase and lowercase letters, a number and a special character. <br /> Allowed
              special characters: <span aria-label='exclamation mark'>!</span> <span aria-label='at symbol'>@</span>{' '}
              <span aria-label='hashtag'>#</span> <span aria-label='dollar sign'>$</span>{' '}
              <span aria-label='percent'>%</span>
            </p>
          </section>

          <label hidden htmlFor='confirm_pwd'>
            Confirm Password:
          </label>
          <section className={styles.Input}>
            <section className={styles.InputArrowContainer}>
              <input
                type='password'
                id='confirm_pwd'
                placeholder='Confirm Password'
                required
                aria-invalid={validMatch ? 'false' : 'true'}
                aria-describedby='confirmnote'
                onChange={(e) => setUser({...user, passwordMatch: e.target.value})}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              {validMatch && passwordMatch !== '' && (
                <span className={styles.Valid}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
              {validMatch || passwordMatch === '' ? null : (
                <span className={styles.Invalid}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              )}
            </section>
            <p id='confirmnote' className={matchFocus && !validMatch ? styles.Instructions : styles.Offscreen}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match password entered.
            </p>
          </section>

          <button className={styles.SignupButton} disabled={!validMatch}>
            Signup
          </button>
        </form>

        {errorStatus && (
          <p ref={errRef} aria-live='assertive' className={styles.Error}>
            {errorMessage}
          </p>
        )}

        <section className={styles.ExistingAccountCopy}>
          <p>Already have an account?</p>
          <p>
            <NavLink to='/'>Login</NavLink>
          </p>
        </section>
      </section>
    </section>
  );
};

export default Signup;

import Login from 'components/Login/Login';
import Signup from 'components/Signup/Signup';
import {ReactElement} from 'react';
import {Routes, Route} from 'react-router-dom';

const LoginSignUpView = (): ReactElement => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
};

export default LoginSignUpView;

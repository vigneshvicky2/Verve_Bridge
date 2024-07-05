import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import your existing CSS file
import 'bootstrap/dist/css/bootstrap.min.css';


function Login({ setIsLogin }) {
  const [user, setUser] = useState({
    name: '', email: '', password: ''
  });

  const [err, setErr] = useState('');

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr('');
  };

  const registerSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/register', {
        username: user.name,
        email: user.email,
        password: user.password
      });
      setUser({ name: '', email: '', password: '' });
      setErr(res.data.msg);

    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const loginSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', {
        email: user.email,
        password: user.password
      });
      setUser({ name: '', email: '', password: '' });
      localStorage.setItem('tokenStore', res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const [onLogin, setOnLogin] = useState(false);

  return (
    <section className='login-page'>
      {/* Login Form */}
      <div className="login-signup">
        <div className="outer">
          <div className="inner">
            <form onSubmit={onLogin ? registerSubmit : loginSubmit} className="login-form">
              <h1 className="login-title">{onLogin ? 'Register' : 'Login'}</h1>

              {onLogin && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-control" placeholder="Full Name" name='name'
                    required value={user.name} onChange={onChangeInput} />
                </div>
              )}

              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" name='email'
                  required value={user.email} onChange={onChangeInput} />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name='password'
                  required value={user.password} onChange={onChangeInput} />
              </div>

              {!onLogin && (
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                  </div>
                </div>
              )}

              <div className="d-grid gap-2">
                <button className="btn btn-primary login-btn" type="submit">{onLogin ? 'Register' : 'Sign In'}</button>
              </div>

              <p className="next_page">
                {onLogin ? "Already have an account?" : "Don't have an account?"}
                <span onClick={() => setOnLogin(!onLogin)}>{onLogin ? 'Login now' : 'Register now'}</span>
              </p>

              <h4>{err}</h4>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

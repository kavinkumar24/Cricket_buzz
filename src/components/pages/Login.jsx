import React, { useState } from 'react';
import IPL_LOGO from '../assests/ipl_logo.jpeg';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);

  function route_to_register() {
    navigate('/register');
  }

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log('Login success:', data.message);
        const userData = data.userData;
        console.log('ID:', userData.id);
        console.log('Name:', userData.name);
        console.log('Email:', userData.email);

        localStorage.setItem('c_user_name', userData.name);
        localStorage.setItem('c_user_email', userData.email);

        if (userData.role === 'admin' && userData.email === email) {
          setTimeout(() => {
            navigate('/admin_home');
          }, 2000);
        } else {
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        }
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="absolute inset-0 flex items-center justify-center bg-slate-300">
        <img src={IPL_LOGO} alt="IPL_LOGO" className="blink-image absolute top-0 left-50 mt-4 ml-4" height='20%' width="150px" />
        <div className="w-full max-w-sm relative top-10">
          <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-7xl h-1/5">
            <div className="flex justify-center mb-8">
              <h1 id="heading" className="inline ml-2 mt-2">Cricket Score Board</h1>
            </div>
            <div className="mb-4 mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Email
              </label>
              <input className="border-[#1f2e7f] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-2xl" id="username" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border border-[#1f2e7f] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline hover:shadow-xl" id="password" type="password" placeholder="***********" onChange={(e) => setPassword(e.target.value)} />
              <p className="text-[#142c74] text-xs italic ml-10">Enjoy the splendid moments</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>
              <div>
                <input type="radio" id="user" name="role" value="user" checked={role === 'user'} onChange={() => setRole('user')} />
                <label htmlFor="user">User</label>
              </div>
              <div>
                <input type="radio" id="admin" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} />
                <label htmlFor="admin">Admin</label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-[#1f2e7f] hover:bg-[#1f2e7f] hover:shadow-xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? (
                  <div className="bg-white max-w-full max-h-full fixed px-96 inset-0">
                    <div className="max-h-10 w-10 bg-[#1f2e7f] items-center justify-center pt-10 relative top-60 left-52 rounded-sm animate-ping"></div>
                    <h1 className="text-base relative top-64 left-48">Loading...</h1>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
            <div className="ml-10 mt-5">
              <button className="text-sm font-thin underline hover:text-blue-700 hover:cursor-pointer" onClick={route_to_register}>Don't have an account sign up here</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

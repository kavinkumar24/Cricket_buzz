import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    async function handleSignup() {
        const response = await fetch('http://localhost:8001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, role }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
        } else {
            console.error('Registration failed');
        }
    }

    function route_to_login() {
        navigate('/');
    }

    return (
        <div>
            <div className="absolute inset-0 flex items-center justify-center bg-slate-300">
                <div className="w-full max-w-sm relative top-10">
                    <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-7xl h-1/5" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex justify-center mb-8">
                            <h1 id="heading" className="inline ml-2 mt-2">Cricket Score Board</h1>
                        </div>
                        <div className="mb-4 mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Name
                            </label>
                            <input className="border-[#1f2e7f] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-2xl" id="username" type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-4 mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="border-[#1f2e7f] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-2xl" id="email" type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border border-[#1f2e7f] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline hover:shadow-xl" id="password" type="password" placeholder="***********" onChange={(e) => setPassword(e.target.value)} />
                            <p className="text-[#142c74] text-xs italic ml-10">Enjoy the splendid moments</p>
                        </div>
                        <div className="mb-4 mt-4">
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
                            <button className="bg-[#1f2e7f] hover:bg-[#1f2e7f] hover:shadow-xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button" onClick={handleSignup}>
                                Sign up
                            </button>
                        </div>

                        <div class="ml-10 mt-5">
                        <button class="text-sm font-thin underline hover:text-blue-700 hover:cursor-pointer" onClick={route_to_login}>Already have an account sign up here</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;

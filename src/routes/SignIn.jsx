import React, { useContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { appContext } from '../App';

const auth = getAuth();

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const { setRoute } = useContext(appContext)
    const [error, setError] = useState("");

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            toast(`Usuario ${email} registrado correctamente`)
            setRoute("home")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast(`ERROR CODE: ${errorCode}, ERROR MESSAGE: ${errorMessage}`)
            setError(errorMessage)
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        createUser();
    }

    return (
        <div>
            <h1 className='text-sky-600 text-2xl font-semibold text-center'>Sign in to enjoy the best app</h1>
            <div className='flex flex-col items-center'>
            <form className='flex flex-col items-center mt-12 gap-4 max-w-sm' onSubmit={handleSubmit}>
                <label className='font-semibold'>Email</label>
                <input className='border border-gray-600 rounded shadow py-2 pl-3 pr-20' type="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                <label className='font-semibold'>Password</label>
                <input className='border border-gray-600 rounded shadow py-2 pl-3 pr-20' type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <button type="submit" className='bg-sky-400 py-2 px-28 mt-8 hover:bg-sky-500 rounded shadow text-white'>Sign in</button>
            </form>
            </div>
            <p className='text-red-500 text-center mt-10'>{error}</p>
        </div>
    );
}

export default SignIn;

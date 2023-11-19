import React, { useContext, useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, getAuth } from "firebase/auth";
import { appContext } from '../App';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc'

const auth = getAuth();
const provider = new GoogleAuthProvider();

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const { route, setRoute, user, setUser } = useContext(appContext)

    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    const loginWithEmail = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        setUser(user)
        toast("Log in succesfull")
        setRoute("home")
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast("Ocurrio un error")
        });
    }

    return (
        <div>
            <h1>Bienvenido a login</h1>
            <div className='flex flex-col items-center'>
            <form className='flex flex-col items-center mt-12 gap-4 max-w-sm'>
                <label className='font-semibold'>Email</label>
                <input className='border border-gray-600 rounded shadow py-2 pl-3 pr-20' type="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                <label className='font-semibold'>Password</label>
                <input className='border border-gray-600 rounded shadow py-2 pl-3 pr-20' type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <button onClick={loginWithEmail} className='bg-sky-400 py-2 px-28 mt-8 hover:bg-sky-500 rounded shadow text-white'>Log in</button>
            </form>
                <div className='mt-5 flex items-center gap-2 border-2 shadow rounded-2xl py-1 px-5'>
                    <FcGoogle />
                    <button onClick={loginWithGoogle}>Login with google</button>
                </div>
            </div>
        </div>
    );
}

export default Login;

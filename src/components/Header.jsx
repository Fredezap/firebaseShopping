import React, { useContext } from 'react';
import { BiLogoFirebase } from 'react-icons/bi'
import { appContext } from '../App';
import { getAuth, signOut } from "firebase/auth";
import toast from 'react-hot-toast';

const auth = getAuth();

const Header = () => {
    const { route, setRoute, user, setUser } = useContext(appContext);
    
    const logOut = () => {
        signOut(auth).then(() => {
            setUser(null)
            setRoute("login")
            toast("Usuario ha hecho log out")
        }).catch((error) => {
            toast("El log out no fue exitoso")
        });
    }

    return ( 
        <header className='h-20 w-full bg-gray-100 shadow-lg flex items-center justify-between px-8 fixed top-0'>
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => setRoute("home")}>
                <BiLogoFirebase className='text-2xl text-pink-600'/>
                <span className='text-xl text-pink-600 font-semibold'>FireShopping v3</span>
            </div>
            <div className='flex gap-2'>
            <button className='bg-sky-500 text-white rounded-full py-1 px-3 hover-bg-sky-600 transition hover:bg-sky-600' onClick={() => setRoute("sign in")}>Sing in</button>
            {user ? (
                <div className='flex justify-between items-center'>
                    <button className='bg-sky-500 text-white rounded-full py-1 px-3 hover-bg-sky-600 transition mr-3 hover:bg-sky-600' onClick={logOut}>Logout</button>
                    <p className='align-center'>{user.email}</p>
                </div>
                )
                : (
                    <button className='bg-sky-500 text-white rounded-full py-1 px-3 hover-bg-sky-600 transition hover:bg-sky-600' onClick={() => setRoute("login")}>Login</button>
                )
            }
            </div>
        </header>
    );
}

export default Header;
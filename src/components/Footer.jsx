import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { HiShoppingCart } from 'react-icons/hi';
import { BsList } from 'react-icons/bs';
import { useContext } from 'react';
import { appContext } from '../App';

const Footer = () => {

    const { setRoute } = useContext(appContext)

    return (
        <footer className='fixed h-16 w-full bg-sky-500 bottom-0 flex justify-evenly items-center'>
            <div className='text-3xl bg-sky-200 rounded-full p-2 text-pink-500 cursor-pointer hover:bg-sky-100 ' onClick={() => setRoute('home')}>
            <AiFillHome />
            </div>
            <div className='text-3xl bg-sky-200 rounded-full p-2 text-pink-500 cursor-pointer hover:bg-sky-100 ' onClick={() => setRoute('shopping')}>
            <HiShoppingCart />
            </div>
            <div className='text-3xl bg-sky-200 rounded-full p-2 text-pink-500 cursor-pointer hover:bg-sky-100 ' onClick={() => setRoute('taskList')}>
            <BsList/>
            </div>
        </footer>
        );
}

export default Footer;

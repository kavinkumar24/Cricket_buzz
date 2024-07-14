import React from 'react';
import { CiMenuFries } from "react-icons/ci";
import { useState } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import { useEffect } from 'react';
function Navbar() {
  const[showMenu,setShowMenu]=useState(false);
  const [firstLetter, setFirstLetter] = useState('');
  useEffect(() => {
    const userName = localStorage.getItem('c_user_name');
    if (userName) {
      setFirstLetter(userName.charAt(0).toUpperCase());
    }
  }, []);

  const handleNav=()=>{
    setShowMenu(!showMenu);
  }
  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-zinc-800 bg-slate-200'>
      <h1 className='w-50 text-3xl left-0'>Cric Score</h1> 

      <div className='flex' >
    
      </div>
     

      <ul className='hidden md:flex  md:items-center gap-[0vw] mr-16'>
        <li className='p-4 mx-8 bg-[#1f2e7f] w-20 h-10 justify-center items-center pt-2 text-black-600 rounded-xl hover:bg-[#1f2d7f8b] shadow-2xl hover:shadow duration-200 cursor-pointer text-white'>Home</li>

        <li className='p-4 mx-8 bg-[#1f2e7f] w-20 h-10 justify-center items-center pt-2 text-black-600 rounded-xl hover:bg-[#1f2d7f8b] shadow-2xl hover:shadow duration-200 cursor-pointer text-white'>Details</li>
    <li>
        <div class="flex items-center justify-center w-12 h-12 cursor-pointer hover:bg-transparent hover:border border-white bg-white rounded-full shadow-md">
            <h3 class="text-xl">{firstLetter}</h3>
          </div>
        </li>


      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {showMenu? <IoCloseCircle size={30}/> : <CiMenuFries size={30}/>}
      </div>
      {showMenu?<div className='fixed left-0 top-0 w-[60%] h-full border-r border-r-slate-300 bg-zinc-100 ease-in-out duration-700 md:hidden z-10'>
      <h1 className='w-full text-3xl text-[#1f2e7f]'>Cric Score</h1>

        <ul className='pt-2 uppercase'>
          <li className='p-4 border-b border-zinc-700 text-[#1f2e7f]'>Home</li>
          <li className='p-4 border-b border-zinc-700 text-[#1f2e7f]'>Details</li>
          <li className='p-4 border-b border-zinc-700 text-[#1f2e7f]'>Profile</li>
        </ul>
      </div>:null}
      
    </div>
    
  )
}

export default Navbar
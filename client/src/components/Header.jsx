import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

function Header() {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
<Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>sheraz</span>
            <span className='text-slate-700'>estate</span>
        </h1>
</Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input placeholder='Search...' type='text' className='bg-transparent focus:outline-none w-24 sm:w-64 '/>
          <FaSearch className='text-slate-600'/>
        </form>
        <ul className='flex gap-4 '>
          <Link to='/' className='hidden sm:inline text-slate-700 hover:underline hover:cursor-pointer'>Home</Link>
          <Link to='/about' className='hidden sm:inline text-slate-700 hover:underline hover:cursor-pointer'>About</Link>
          <Link to='/profile' >
          {currentUser ?(
            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='Profile'/>
          ):(
            <li className=' text-slate-700 hover:underline hover:cursor-pointer'>Sign In</li>
          )}
          </Link>
           
        </ul>
      </div>
       
    </header>
  )
}

export default Header
import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
function Header() {
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
          <Link to='/sign-in' className=' text-slate-700 hover:underline hover:cursor-pointer'>Sign in</Link>
        </ul>
      </div>
       
    </header>
  )
}

export default Header
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='z-10 mb-[50px] md:mb-[0px] bg-[#1A0B2E] py-[5px] flex flex-row justify-center items-center  font-poppins sticky top-0'>
        <div className='h-full flex font-alata gap-x-5 md:gap-x-[60px] bg-transparent'>
            <Link className='py-[15px]' href="/" >Home</Link>
            <Link className='py-[15px]' href="/about" >About</Link>
            <Link className='py-[15px]' href="/projects" >Projects</Link>
            <Link className='py-[15px]' href="/contact" >Contact</Link>
        </div>
    </div>
  )
}

export default Navbar;
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='mb-[50px] md:mb-[0px] bg-[#1A0B2E] flex flex-row justify-center items-center py-[20px] font-poppins sticky top-0'>
        <div className='flex font-alata gap-x-5 md:gap-x-[60px] bg-transparent'>
            <Link href="/" >Home</Link>
            <Link href="/about" >About</Link>
            <Link href="/projects" >Projects</Link>
            <Link href="/contact" >Contact</Link>
        </div>
    </div>
  )
}

export default Navbar;
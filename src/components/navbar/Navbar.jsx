import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='mb-[50px] md:mb-[0px] bg-[#1A0B2E] flex flex-row justify-between items-center py-[20px] font-poppins'>
        <h1 className='bg-transparent text-[20px] font-bold'>PN</h1>
        <div className='flex gap-x-5 bg-transparent'>
            <Link href="/" >Home</Link>
            <Link href="/about" >About</Link>
            <Link href="/projects" >Projects</Link>
            <Link href="/contact" >Contact</Link>
        </div>
    </div>
  )
}

export default Navbar
import Link from 'next/link'
import React from 'react'

const notFound = () => {
  return (
    <div>
        <h1 className='font-bold text-[30px]'>404</h1>
        <p>The page you tried to reach does not exist!</p>
        <Link href="/">Return Home</Link>
    </div>
  )
}

export default notFound
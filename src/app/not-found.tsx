'use client'
import React from 'react'
import ErrorImage from '../../public/screens/404.jpg'
import Image from 'next/image'



const ErrorPage = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-5 px-5 hover:scale-105 transition-all duration-300 h-screen'>
        <Image src={ErrorImage} alt="404 Error" />
        <button className=" bg-green-800 text-white rounded-lg py-2 px-5" 
        onClick={() => window.history.back()}
        >Back</button>
    </div>
  )
}

export default ErrorPage

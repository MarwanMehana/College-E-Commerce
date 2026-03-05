'use client';
import React from 'react'

const errorPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-10 text-center'>
        <h1 className='text-5xl text-green-700 mb-5'>Something went wrong!</h1>
        <p className='text-3xl text-green-700'>Please try again later.</p>
    </div>
  )
}

export default errorPage

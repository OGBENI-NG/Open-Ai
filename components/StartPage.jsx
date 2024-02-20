import React from 'react'

export default function StartPage({welcomeEl, handleWelcome}) {
  return (
    <section className={`py-28 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))]
      from-gray-900 to-gray-600 text-white flex flex-col justify-center  
      h-screen items-center ${!welcomeEl && "animate-fade transition-all"}
      overflow-hidden w-full text-center`
    }>
      <div className='tracking-wide'>
        <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-500 to-fuchsia-700'>Lugbayin</h1>
        <p className='text-2xl pt-2 font-medium text-slate-100'>AI language Translator</p>
      </div>
      <div className='mt-8 text-green-300'>
        <h2 className='text-4xl'>And</h2>
        <p className='pt-2 text-xl'>AI Image Generator</p>
      </div>
      <button 
        onClick={handleWelcome}
        className='mt-auto text-2xl font-semibold tracking-widest
         bg-black/35 backdrop-blur-[100px] py-2 px-10 rounded-badge'
      >
        Start
      </button>
   </section>
  )
}

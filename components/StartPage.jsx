import React from 'react'

export default function StartPage({welcomeEl, handleWelcome, aiBotIcon, welcomeLoadingEl}) {
  return (
    <section className={`py-28 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))]
      from-gray-900 to-gray-600 text-white  h-screen`
    }>
      {welcomeLoadingEl ? (
        <span className="absolute text-frameColor w-[70px] 
        inset-0 m-auto loading loading-ring"></span>
      ):(
        <div className={`flex flex-col justify-center 
          h-full items-center 
          ${!welcomeEl && "animate-fade transition-all"}
          overflow-hidden w-full text-center`}
        >
        <div className='tracking-wide'>
          <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-500 to-fuchsia-700'>Lugbayin</h1>
          <p className='text-2xl pt-2 font-medium text-slate-100'>AI language Translator</p>
        </div>
        <div className='mt-4 text-green-300'>
          <h2 className='text-4xl'>And</h2>
          <p className='pt-2 text-xl'>AI Image Generator</p>
        </div>
        <img 
          src={aiBotIcon} 
          alt="bot-icon" 
          className='mt-12'
        />
        <button 
          onClick={handleWelcome}
          className='mt-auto text-2xl font-semibold tracking-widest
          bg-black/35 backdrop-blur-[100px] py-2 px-10 rounded-badge'
        >
          Start
        </button>
      </div>)}
    </section>
  )
}

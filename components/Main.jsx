import React from 'react'

export default function Main({ renderAiResponse, userChat, loading, containerRef}) {
  return (
    <main className={`bg-transparent rounded-[15px] relative z-[1]`}>
      <section className='flex flex-col gap-5'>
        <section 
          ref={containerRef}
          className={`px-3 pt-[70px] h-auto overflow-hidden`}
        >
          <h1 className={`text-center font-[900] text-sm rounded-[8px] 
            text-[#1e1c28] w-48 tracking-[0.011rem] backdrop-blur-[100px]
            bg-white/50 py-2 my-7  p-3 m-auto`
          }>
            Select the language you 
            me to translate into.
          </h1>
          {userChat.map((txt, i) => (
            <section key={i} className='transition-all'>
              <p className='font-bold text-[20px] rounded-[10px] rounded-tl-[1px]
                text-bodyBg leading-[26px] bg-black/75 backdrop-blur-[50px]
                px-4 pt-3 pb-5 
                '
              >
                {txt}
              </p>
              <div>
                {renderAiResponse[i] && (
                  <p className='font-bold -tracking-tighter text-[20px] rounded-[10px] 
                    rounded-tr-[1px] text-[#000] leading-[26px] backdrop-blur-[100px]
                    bg-white/75 p-3 my-4'
                  >
                    {renderAiResponse[i]}
                  </p>
                )}
              </div>
            </section>
          ))}
          {loading && 
            <div className='flex my-6 ml-5 space-x-1 items-center bg-transparent dark:invert'>
                <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
              <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
              <div className='h-4 w-4 bg-black rounded-full animate-bounce'></div>
            </div>
          }
        </section>
      </section>
    </main>
  )
}

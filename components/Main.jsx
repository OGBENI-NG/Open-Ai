import React from 'react'

export default function Main({ renderAiResponse, userChat}) {
  return (
    <main className='bg-transparent 
    rounded-[15px] relative z-[1] overflow-x-hidden'>
      <section className='flex flex-col gap-5 relative'>
       <section className='px-3'>
          <h1 className={`relative text-center font-[900] text-sm rounded-[8px] 
              text-[#000] tracking-[0.011rem] backdrop-blur-[100px] bg-white/50 
                px-0 mx-14 py-2 my-6`}
            >
              Select the language you 
              me to translate into.
          </h1>
          {userChat.map((txt, i) => (
            <section key={i}>
              <p className='font-bold text-[20px] rounded-[10px] rounded-tl-[1px]
              text-bodyBg leading-[26px] bg-black/60 backdrop-blur-[50px]
               px-4 pt-3 pb-5 
                '>
                {txt}
              </p>
              <div>
                {renderAiResponse[i] && (
                  <p className='font-bold -tracking-tighter text-[20px] rounded-[10px] rounded-tr-[1px]
                  text-[#000] leading-[26px] backdrop-blur-[100px] bg-white/50 px-4 pt-3 pb-5 my-6'>
                    {renderAiResponse[i]}
                    </p>
                )}
              </div>
            </section>
          ))}
        </section>
      </section>
    </main>
  )
}

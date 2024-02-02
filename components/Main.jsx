import React from 'react'

export default function Main({ renderAiResponse, userChat}) {
  return (
    <main className='bg-transparent 
    rounded-[15px] relative z-[1] mt-[70px]'>
      <section className='flex flex-col gap-5 h-full  relative'>
       <section className='pb-16 px-4'>
          <h1 className={`relative text-center font-[900] text-base rounded-[15px] 
              text-[#000] tracking-[0.011rem] backdrop-blur-[100px] bg-white/50 
                px-3 mx-14 pt-3 pb-4 my-6`}
            >
              Select the language you 
              me to translate into, 
              type your text and hit send!
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

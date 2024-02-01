import React from 'react'

export default function Main(
  {firebaseData, handleLanguage, inputValue,
    handleChange, sendBtnIcon, handleSendText, 
    renderAiResponse, userChat, loading, clearChat, 
    currentLanguage, isSticky
  }
    
  ) {

  const renderFlag = firebaseData.map((item) => (
    <div 
      key={item.id}
      className={`relative w-[50px] h-[50px] && "border-[3px]"}  before:content-[''] 
       ${currentLanguage === item.language 
        ? `before:content-[''] before:w-[50px] before:h-[35px] 
          before:absolute before:border-[4px] before:border-aiChatBg
          before:bottom-[8px] before:transition-all before:shadow-lg
          before:shadow-boxShadow 
          ` 
        : ""}`}
      >
        
      <img 
        className='w-full h-full -z-0'
        onClick={() => handleLanguage(item.language)} 
        src={item.img} 
        alt={item.alt} 
      />
    </div>
  ))

  return (
    <main className='bg-transparent 
    rounded-[15px] relative z-[1] overflow-y-scroll mt-[70px]'>
      <section className='flex flex-col gap-5 h-full  relative'>
       <section className='pb-16 px-4'>
          <h1 className={`relative text-center font-[900] text-base rounded-[15px] 
              text-[#000] tracking-[0.011rem] backdrop-blur-[100px] bg-white/50 
                px-4 pt-3 pb-4 my-6`}
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
        
          <section className='px-4 py-2 fixed w-full bottom-[0] left-[0] backdrop-blur-[100px]
            bg-white/50'>
            {/* { loading 
              ? (<span className="loading loading-dots loading-md text-aiChatBg"></span>) 
              : (<p 
                onClick={clearChat}
                className={`${userChat.length < 4 ? "hidden" : `text-gray-500 font-semibold py-1 px-4 w-max bg-txtAreaBg rounded-md mb-2 m-auto`}`}>
              Clear chat
            </p>)} */}
            <textarea
              className='relative h-[50px] bg-txtAreaBg w-full border-[4px]
               border-borderColor text-userTxt
              rounded-[10px] outline-none text-2xl pl-3 pr-16 resize-none' 
              type="text" 
              onChange={handleChange}  
              value={inputValue}
              name='textInput'
              id='textInput'
            />
            <button 
              onClick={handleSendText}
              className='absolute top-0 right-[15px] h-[66px] w-[40px]'
            >
              <img src={sendBtnIcon} alt="send-btn-icon" />
            </button>
          </section>
          
          {/* <section className='flex items-center justify-center gap-6 mt-3'>
            {renderFlag}
          </section> */}
        
      </section>
    </main>
  )
}

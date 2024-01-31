import React from 'react'

export default function Main(
  {firebaseData, handleLanguage, inputValue,
    handleChange, sendBtnIcon, handleSendText, 
    renderAiResponse, userChat, loading, clearChat, 
    currentLanguage
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
    <main className='m-4 bg-bodyBg 
    rounded-[15px] relative z-[1] overflow-y-scroll my-32'>
      <section className='p-3 flex flex-col gap-5 h-full  relative'>
       <section className='pb-16'>
          <h1 className={`relative font-bold text-[20px] rounded-[10px] rounded-tr-[1px]
              text-bodyBg leading-[26px] bg-aiChatBg px-4 pt-3 pb-5  my-6`}
            >
              Select the language you 
              me to translate into, 
              type your text and hit send!
          </h1>
          {userChat.map((txt, i) => (
            <section key={i}>
              <p className='font-bold text-[20px] rounded-[10px] rounded-tl-[1px]
              text-userTxt leading-[26px] bg-userChatBg px-4 pt-3 pb-5 
                '>
                {txt}
              </p>
              <div>
                {renderAiResponse[i] && (
                  <p className='font-bold -tracking-tighter text-[20px] rounded-[10px] rounded-tr-[1px]
                  text-bodyBg leading-[26px]  bg-aiChatBg px-4 pt-3 pb-5 my-6'>
                    {renderAiResponse[i]}
                    </p>
                )}
              </div>
            </section>
          ))}
        </section>
        <section className='mt-auto fixed bottom-0 left-0 right-0
         mx-6 pt-4 pb-8 px-1 bg-bodyBg'>

          <section className=''>
            { loading 
              ? (<span className="loading loading-dots loading-md text-aiChatBg"></span>) 
              : (<p 
                onClick={clearChat}
                className={`${userChat.length < 4 ? "hidden" : `text-gray-500 font-semibold py-1 px-4 w-max bg-txtAreaBg rounded-md mb-2 m-auto`}`}>
              Clear chat
            </p>)}
            <textarea
              className='relative h-[67px] bg-txtAreaBg w-full border-[3px]
               border-borderColor text-userTxt
              rounded-[10px] outline-none text-2xl pl-3 py-3 pr-16 resize-none' 
              type="text" 
              onChange={handleChange}  
              value={inputValue}
              name='textInput'
              id='textInput'
            />
            <button 
              onClick={handleSendText}
              className='absolute right-[10px] h-[66px] w-[40px]'
            >
              <img src={sendBtnIcon} alt="send-btn-icon" />
            </button>
          </section>
          
          <section className='flex items-center justify-center gap-6 mt-3'>
            {renderFlag}
          </section>
        </section>
      </section>
    </main>
  )
}

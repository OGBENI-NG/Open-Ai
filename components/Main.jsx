import React from 'react'

// Functional component for main chat section
export default function Main({
  renderAiResponse, // Array of AI responses
  userChat, // Array of user messages
  loading, // Loading state
  containerRef, // Reference to main chat container
  toggleImgGen,
  renderAiImg,
  aiImgPlaceholder,
  aiImgLoading
}) {

  //function to render userText and aiResponse
  const userTextAiResponse = () => (
    userChat.map((txt, i) => (
      <section key={i} className=''>
        <div className="chat chat-end">
          {/* User message */}
          <p className="chat-bubble text-lg font-semibold text-[#000] leading-[26px]  backdrop-blur-[50px] bg-white/75">{txt}</p>
        </div>
        <div>
          {/* AI response */}
          {renderAiResponse[i] && (
            <div className="chat chat-start my-2">
              <p className="chat-bubble text-bodyBg text-lg leading-[26px] 
                backdrop-blur-[100px] font-semibold bg-amber-900"
              >
                {renderAiResponse[i]}
              </p>
            </div>
          )}
        </div>
      </section>
    ))
  )

  // Function to render loading indicator
  const renderLoading = () => (
    <div className='flex my-6 ml-5 space-x-1 justify-start items-center 
      bg-transparent dark:invert'
    >
      <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-4 w-4 bg-black rounded-full animate-bounce'></div>
    </div>
  )

  const mainStyle = `bg-transparent pt-[65px] pb-[90px] transition-all 
    h-screen overflow-scroll relative z-[0] px-2 `
  ;

  const langTranTheme = `bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] 
    from-yellow-300 via-red-600 to-fuchsia-700`
  ;

  const aIImgGenTheme = `bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] 
    from-sky-400 to-indigo-900`
  ;

  const introStyle = `text-center font-bold text-sm rounded-[8px] 
    text-[#1e1c28] w-48 tracking-[0.011rem] backdrop-blur-[100px]
    bg-white/50 py-2 my-7  p-3 m-auto`
  ;

  return (
    // Main chat section with dynamic styles and content
    <main 
      ref={containerRef} 
      className={`${toggleImgGen ? langTranTheme : aIImgGenTheme}`}
    >
      {toggleImgGen ? (
        <section className={`${mainStyle} ${aIImgGenTheme} 
          ${toggleImgGen && 'animate-slideRight'} `}
        >
          <div className=''>
            {/*  */}
            {aiImgPlaceholder ? ( 
              <h1 className={`text-center font-bold text-2xl mt-48 text-white px-3`}>
                Describe the image you want generate and click send.
              </h1>
            ) : (
              <div className={`h-[400px] relative border-[8px] 
                ${aiImgLoading ? "border-none" : "bg-black/15 border-y-frameColor2 border-x-frameColor"}
                mt-14`}
              >
                {/* loading state and generated image */}
                {aiImgLoading ? (
                  <span className="absolute text-frameColor w-[70px] 
                    inset-0 m-auto loading loading-ring"></span>
                ):(
                  <img 
                    className='w-full h-full object-cover' 
                    src={renderAiImg} 
                  />
                )}
              </div>
            )}
          </div>
        </section>
        ) : (
        <section className={`${mainStyle} ${langTranTheme} 
          ${!toggleImgGen && 'animate-slideLeft'}`}>
          {/* Heading for language selection */}
          <h1 className={introStyle}>
            Select the language you 
            me to translate into.
          </h1>
          <div className='transition-all'>{userTextAiResponse()}</div>
          {loading && renderLoading()}
        </section>
      )}
    </main>
  )
}

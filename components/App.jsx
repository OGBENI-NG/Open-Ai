import React, { useEffect, useState, useContext, useRef } from 'react'
import { OpenAI } from 'openai'
import Header from './Header'
import headerBg from './img/usa-icon.png'
import dropDownIcon from './img/dropdown.png'
import sendBtnIcon from './img/send-icon.png'
import Main from './Main'
import spanishFlag from './img/spain.png'
import Footer from './Footer'
import { ToggleContext } from './UseContext'
import {fetchApiKey, fetchApiNewKey} from '../firebase'

export default function App() {
  // State variables using useState hook
  const [firebaseData, setFirebaseData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [currentLanguage, setCurrentLanguage] = useState("Spanish")
  const [currentLangImg, setCurrentLangImg] = useState(spanishFlag)
  const [renderApiKey, setRenderApiKey] = useState('')
  const [renderAiResponse, setRenderAiResponse] = useState(saveUserAiChatToLocalStorage)
  const [userChat, setUserChat] = useState(saveUserChatToLocalStorage)
  const [loading, setLoading] = useState(false)
 

  // Refs for DOM elements
  const containerRef = useRef(null)
  const textareaRef = useRef(null)

  // Context variables
  const {
    isToggled, toggle, theme,
    toggleTheme, navbarRef, setIsToggled,
    handleBlur, handleFocus, welcomeEl, handleWelcome
  } = useContext(ToggleContext)

  // Function to retrieve user chat from localStorage
  function saveUserChatToLocalStorage() {
    const userChatMg = localStorage.getItem("userChat") 
    return userChatMg ? JSON.parse(userChatMg) : []
  }

  // Function to retrieve AI chat responses from localStorage
  function saveUserAiChatToLocalStorage() {
    const aiChatResponse = localStorage.getItem("renderAiResponse")
    return aiChatResponse ? JSON.parse(aiChatResponse) : []
  }

  // Effect hook to update localStorage with user chat and AI responses
  useEffect(() => {
    localStorage.setItem("userChat", JSON.stringify(userChat))
    localStorage.setItem("renderAiResponse", JSON.stringify(renderAiResponse))
  }, [userChat, renderAiResponse])

  // Event handler for input change
  function handleChange(e) {
    const inputValue = e.target.value
    e.target.style.height = `${e.target.scrollHeight}px`
    const capitalizedInputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
    setInputValue(capitalizedInputValue)
  }
  
  // Function to handle language change
  function handleLanguage(lang, currentImg) {
    if(!currentLanguage.includes(lang)) {
      setCurrentLanguage(lang)
      setCurrentLangImg(currentImg)
      setIsToggled(false)
    }
  }

  // useEffect hook to fetch API key and initialize OpenAI client
  useEffect(() => {
    const getApi = async () => {
      const apiData = await fetchApiKey()
      const apiKey = await fetchApiNewKey()
      setFirebaseData(apiData)
      setRenderApiKey(apiKey[0].apiKey)
    }
    getApi()
  },[])

  // Effect hook to scroll to bottom of chat container
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [userChat, renderAiResponse])

  // Create OpenAI client instance
  const openai = new OpenAI({
    apiKey: renderApiKey,
    dangerouslyAllowBrowser: true
  })

  // Function to clear chat history
  function clearChat(){
    setRenderAiResponse([])
    setUserChat([])
    setIsToggled(false)
    localStorage.clear()
  }
  
  // Messages array for OpenAI chat completion
  const messages = [
    {
      role: 'system',
      content: `Translate the following English text to ${currentLanguage} or 
        Translate the following text to the corresponding language to English text
      `
    },
    {
      role: 'user',
      content: inputValue
    }
  ]
  
  // Function to fetch data from OpenAI chat API
  async function fetchData() {
    try {
      setLoading(true) // Set loading state to true
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 1.1,
        presence_penalty: 0,
        frequency_penalty: 0,
        max_tokens: 54,
        top_p: 1
      })
      setRenderAiResponse(prevAiRes => [...prevAiRes, response.choices[0].message.content])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false) // Set loading state to false after response
    }
  }

  // Function to handle sending text message
  function handleSendText() {
    if(inputValue.trim("")) {
      setUserChat(prevUserChat => [...prevUserChat, inputValue]) 
      fetchData()
      textareaRef.current.style.height = '40px'
      textareaRef.current.style.borderRadius = '100px'
      setInputValue("")
    }
  }

  // JSX rendering of the component
  return (
    <main className={`font-roboto scroll-smooth 
      flex flex-col overflow-hidden `
    }>
     {welcomeEl ? 
        (<section className={`py-28 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))]
           from-gray-900 to-gray-600 text-white flex flex-col justify-center  
          h-screen items-center ${!welcomeEl && "animate-fade transition-all"}
          overflow-hidden w-full text-center`}>
          <div className='tracking-wide'>
            <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-500 to-fuchsia-700'>Lugbayin</h1>
            <p className='text-2xl pt-3 font-medium text-slate-100'>AI language Translator</p>
          </div>
          <button onClick={handleWelcome} className='mt-auto text-2xl font-semibold tracking-widest
              bg-black/35 backdrop-blur-[100px] py-2 px-10 rounded-badge'>Start</button>
        </section>) :
        (<section>
          {/* Header component */}
          <Header
            headerBg={headerBg}
            toggleTheme={toggleTheme}
            isToggled={isToggled}
            toggle={toggle}
            currentLanguage={currentLanguage}
            handleLanguage={handleLanguage}
            firebaseData={firebaseData}
            clearChat={clearChat}
            navbarRef={navbarRef}
            dropDownIcon={dropDownIcon}
            currentLangImg={currentLangImg}
          />
          
          {/* Main component */}
          <Main 
            renderAiResponse={renderAiResponse}
            userChat={userChat}
            loading={loading}
            theme={theme}
            containerRef={containerRef}
          />
          
          {/* Footer component */}
          <Footer
            inputValue={inputValue}
            setInputValue={setInputValue}
            sendBtnIcon={sendBtnIcon}
            handleChange={handleChange}
            handleSendText={handleSendText}
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            textareaRef={textareaRef}
          />
        </section>)
     }
    </main>
  )
}

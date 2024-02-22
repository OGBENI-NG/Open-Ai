import React, { useEffect, useState, useContext, useRef } from 'react'
import { OpenAI } from 'openai'
import Header from './Header'
import usFlag from './img/usa-icon.png'
import dropDownIcon from './img/dropdown.png'
import sendBtnIcon from './img/send-icon.png'
import sendBtnImg from './img/send-icon-img.png'
import aiBotIcon from './img/bot-icon.png'
import Main from './Main'
import spanishFlag from './img/spain.png'
import Footer from './Footer'
import { ToggleContext } from './UseContext'
import {fetchApiKey, fetchApiNewKey} from '../firebase'
import StartPage from './StartPage'

export default function App() {
  // State variables using useState hook
  const [firebaseData, setFirebaseData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [aiImgInput, setAiImgInput] = useState('')
  const [currentLanguage, setCurrentLanguage] = useState("Spanish")
  const [currentLangImg, setCurrentLangImg] = useState(spanishFlag)
  const [renderApiKey, setRenderApiKey] = useState('')
  const [renderAiResponse, setRenderAiResponse] = useState(saveUserAiChatToLocalStorage)
  const [userChat, setUserChat] = useState(saveUserChatToLocalStorage)
  const [loading, setLoading] = useState(false)
  const [aiImgLoading, setAiImgLoading] = useState(false)
  const [aiImgPlaceholder, setAiImgPlaceholder] = useState(true)
  const [toggleImgGen, setToggleImgGen] = useState(false)
  const [renderAiImg, setRenderAiImg] = useState('')
 

  // Refs for DOM elements
  const containerRef = useRef(null)
  const textareaRef = useRef(null)

  // Context variables
  const {
    isToggled, toggle, theme, welcomeLoadingEl,
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

  function handleToggleImg() {
    setToggleImgGen(prevImgToggle => !prevImgToggle)
  }

  // Event handler for input change
  function handleChange(e) {
    const inputValue = e.target.value
    e.target.style.height = `${e.target.scrollHeight}px`
    const capitalizedInputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
    setInputValue(capitalizedInputValue)
  }

  //Event handler for ai img input
  function handleAiImgGenChange(e) {
    const inputValue = e.target.value
    e.target.style.height = `${e.target.scrollHeight}px`
    const capitalizedInputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
    setAiImgInput(capitalizedInputValue)
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
  const openAi = new OpenAI({
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
      const response = await openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
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

  //functions to generate image from open ai
  async function generateAiImg() {
    try {
      setAiImgLoading(true)
      setAiImgPlaceholder(false)
      const response = await openAi.images.generate({
        model: 'dall-e-2',
        prompt: aiImgInput,
        n: 1,
        //style: 'natural',
        size: '256x256',
        response_format: 'b64_json'
      })

      setRenderAiImg(`data:image/png;base64,${response.data[0].b64_json}`)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setAiImgLoading(false) //Set loading state to false after response
    }
  }

  //function to display ai image
  function handleRenderAiImg() {
    if(aiImgInput.trim("")) {
      generateAiImg()
      textareaRef.current.style.height = '40px'
      textareaRef.current.style.borderRadius = '100px'
      setAiImgInput('')
    }
  }
  
  // JSX rendering of the component
  return (
    <main className={`font-roboto scroll-smooth flex flex-col overflow-hidden `}>
     {welcomeEl ? (
        <div>
          <StartPage 
            welcomeEl={welcomeEl}
            handleWelcome={handleWelcome}
            aiBotIcon={aiBotIcon}
            welcomeLoadingEl={welcomeLoadingEl}
          />
        </div>
      ):(
        <section>
          {/* Header component */}
          <Header
            usFlag={usFlag}
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
            handleToggleImg={handleToggleImg}
            toggleImgGen={toggleImgGen}
          />
          
          {/* Main component */}
          <Main 
            renderAiResponse={renderAiResponse}
            userChat={userChat}
            loading={loading}
            theme={theme}
            containerRef={containerRef}
            toggleImgGen={toggleImgGen}
            renderAiImg={renderAiImg}
            aiImgPlaceholder={aiImgPlaceholder}
            aiImgLoading={aiImgLoading}
          />
          
          {/* Footer component */}
          <Footer
            inputValue={inputValue}
            aiImgInput={aiImgInput}
            setInputValue={setInputValue}
            sendBtnIcon={sendBtnIcon}
            sendBtnImg={sendBtnImg}
            handleChange={handleChange}
            handleSendText={handleSendText}
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            textareaRef={textareaRef}
            toggleImgGen={toggleImgGen}
            handleRenderAiImg={handleRenderAiImg}
            handleAiImgGenChange={handleAiImgGenChange}
          />
        </section>
      )}
    </main>
  )
}

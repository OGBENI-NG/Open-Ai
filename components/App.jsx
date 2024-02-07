import React, { useEffect, useState, useContext, useRef } from 'react'
import { OpenAI } from 'openai'
import Header from './Header'
import headerBg from './img/usa-icon.png'
import dropDownIcon from './img/dropdown.png'
import sendBtnIcon from './img/send-icon.png'
import darkIcon from './img/dark.png'
import Main from './Main'
import lightIcon from './img/light.png'
import spanishFlag from './img/spain.png'
import Footer from './Footer'
import { ToggleContext } from './UseContext'
import {fetchApiKey, fetchApiNewKey} from '../firebase'

export default function App() {
  const [firebaseData, setFirebaseData] = useState([])

  const [inputValue, setInputValue] = useState('')
  const [currentLanguage, setCurrentLanguage] = useState("Spanish")
  const [currentLangImg, setCurrentLangImg] = useState(spanishFlag)
  const [renderApiKey, setRenderApiKey] = useState('')
  const [renderAiResponse, setRenderAiResponse] = useState(saveUserAiChatToLocalStorage)
  const [userChat, setUserChat] = useState(saveUserChatToLocalStorage)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef(null)
  const {
    isToggled, toggle, theme,
    toggleTheme, navbarRef, setIsToggled,
    handleBlur, handleFocus, isKeyboardOpen
  } = useContext(ToggleContext)

  const themeIconImg = theme === "light" ? darkIcon : lightIcon


  function saveUserChatToLocalStorage() {
    const userChatMg = localStorage.getItem("userChat") 
    return userChatMg ? JSON.parse(userChatMg) : []
  }

  function saveUserAiChatToLocalStorage() {
    const aiChatResponse = localStorage.getItem("renderAiResponse")
    return aiChatResponse ? JSON.parse(aiChatResponse) : []
  }

  useEffect(() => {
    localStorage.setItem("userChat", JSON.stringify(userChat))
    localStorage.setItem("renderAiResponse", JSON.stringify(renderAiResponse))
  }, [userChat, renderAiResponse])

  function handleChange(e) {
    const inputValue = e.target.value
    // Adjust textarea height
    e.target.style.height = `${e.target.scrollHeight}px`
    const capitalizedInputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
    setInputValue(capitalizedInputValue)
  }
  
  function handleLanguage(lang, currentImg) {
    if(!currentLanguage.includes(lang)) {
      setCurrentLanguage(lang)
      setCurrentLangImg(currentImg)
      setIsToggled(false)
    }
  }

  useEffect(() => {
    const getApi = async () => {
      const apiData = await fetchApiKey()
      const apiKey = await fetchApiNewKey()
      setFirebaseData(apiData)
      setRenderApiKey(apiKey[0].apiKey)
    }
    getApi()
  },[])


  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [userChat, renderAiResponse])

  const openai = new OpenAI({
    apiKey: renderApiKey,
    dangerouslyAllowBrowser: true
    
  })

  function clearChat(){
    setRenderAiResponse([])
    setUserChat([])
    setIsToggled(false)
    localStorage.clear()
  }
  
  const messages = [
    {
      role: 'system',
      content: `Translate the following English text to ${currentLanguage}`
    },
    {
      role: 'user',
      content: inputValue
    }
  ]
  
  async function fetchData() {
    try {
      setLoading(true) // Set loading state to true
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 54,
        top_p: 1,
       
      })
      setRenderAiResponse(prevAiRes => [...prevAiRes, response.choices[0].message.content])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false) // Set loading state to false after response
    }
  }

  function handleSendText() {
    if(inputValue.trim("")) {
      setUserChat(prevUserChat => [...prevUserChat, inputValue]) 
      fetchData()
      setInputValue("")
    }
  }

  const userThemes = theme === "light" ? `bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500` : `bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900`

  return (
    <main className={`font-roboto scroll-smooth ${userThemes}
      flex flex-col overflow-y-hidden
      `
    }>
      <section className='overflow-y-hidden'>
        <Header
          headerBg={headerBg}
          toggleTheme={toggleTheme}
          isToggled={isToggled}
          themeIconImg={themeIconImg}
          toggle={toggle}
          currentLanguage={currentLanguage}
          handleLanguage={handleLanguage}
          firebaseData={firebaseData}
          clearChat={clearChat}
          navbarRef={navbarRef}
          dropDownIcon={dropDownIcon}
          currentLangImg={currentLangImg}
          isKeyboardOpen={isKeyboardOpen}
        />
        <Main 
          renderAiResponse={renderAiResponse}
          userChat={userChat}
          loading={loading}
          theme={theme}
          userThemes={userThemes}
          containerRef={containerRef}
        />
        <Footer
          inputValue={inputValue}
          sendBtnIcon={sendBtnIcon}
          handleChange={handleChange}
          handleSendText={handleSendText}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
        />
      </section>
    </main>
  )
}

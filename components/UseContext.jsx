import React, { createContext, useState, useEffect, useRef } from 'react'

// Create a context for toggling functionality
const ToggleContext = createContext()

export default function UseContext({ children }) {
  // State for toggling navigation menu
  const [isToggled, setIsToggled] = useState(false)
  // State for detecting if the keyboard is open (not used in this component)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  // Reference to the navigation bar element
  const navbarRef = useRef(null)
  const [welcomeEl, setWelcomeEl] = useState(true)

  // Function to toggle the navigation menu
  const toggle = () => {
    setIsToggled(prevState => !prevState)
  }

  // Effect to handle clicks outside the navigation bar to close the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the navigation bar
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsToggled(false) // Close the menu
      }
    }

    document.addEventListener('click', handleClickOutside)

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, []) // Run this effect only once when the component mounts

  function handleWelcome() {
    setWelcomeEl(false)
  }

  // Provide the context values to its children components
  return (
    <ToggleContext.Provider value={{
      isToggled, // State for toggling navigation menu
      toggle, // Function to toggle navigation menu
      navbarRef, // Reference to the navigation bar element
      setIsToggled, // Function to set the toggled state
      isKeyboardOpen, // State for detecting if the keyboard is open (not used in this component)
      handleWelcome,
      welcomeEl
    }}>
      {children} {/* Render children components */}
    </ToggleContext.Provider>
  )
}

// Export the context for other components to consume
export { ToggleContext }

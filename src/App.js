import './App.css'
import Figure from './components/Figure'
import Header from './components/Header'
import WrongLetters from './components/WrongLetters'
import Word from './components/Word'
import { useEffect, useState } from 'react'

const words = ['application', 'programming', 'interface', 'wizard']

let selectedWord = words[Math.floor(Math.random() * words.length)]

function App() {
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])

  useEffect(() => {
    const handlekeydown = (e) => {
      const { key, keyCode } = e

      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase()

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter])
          } else {
            //showNotification();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter])
          } else {
            //showNotification();
          }
        }
      }
    }

    window.addEventListener('keydown', handlekeydown)

    return () => window.removeEventListener('keydown', handlekeydown)
  }, [correctLetters, wrongLetters, playable])

  return (
    <>
      <Header />
      <div className='game-container'>
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
    </>
  )
}

export default App

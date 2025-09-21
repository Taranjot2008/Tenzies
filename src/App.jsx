import React from 'react'
import { useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Header from "./components/header"
import Die from './components/Die'

export default function App() {

  const [dices, setDices] = React.useState(() => generateallNewDice())
  const [count, setCount] = React.useState(20)
  const buttonRef = useRef(null)

  const gameWon = dices.every(die => die.isHeld) &&
                  dices.every(die => die.value === dices[0].value)

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateallNewDice() {

    return new Array(10) 
              .fill()
              .map(() => ({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
              }))
  }

  function rollDice() {

    if (!gameWon && count > 0) {

      setDices(oldDice => oldDice.map(die => 
        die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
      ))
    } else {
      setDices(generateallNewDice())
      setCount(21)
    }

    setCount(prevCount => prevCount - 1)

  }

  function holdDice(id) {
    setDices(oldDice => oldDice.map(die => 
      die.id === id ? {...die, isHeld: !die.isHeld} : die
    ))
  }

  const diceElements = dices.map(dice => <Die 
                        key={dice.id} 
                        value={dice.value} 
                        isHeld={dice.isHeld} 
                        onClick={() => holdDice(dice.id)}/>)

  return (
    <main className="main flex flex-col items-center mt-8">
      {gameWon && <Confetti />}

      {gameWon && <div aria-live='polite' className="completed-div w-lg h-[150px] absolute top-4 z-10 bg-white
      text-2xl text-black rounded-xl shadow-[2px_2px_8px_#00000033] text-center px-5 pt-5
      max-sm:w-3xs max-sm:h-[120px] max-sm:text-lg">
        {gameWon && <p>Congratulations! You Won! Click "New Game" to start new game</p>}
      </div>}
      
      {count === 0 && !gameWon && <>
        <div aria-live='polite' className="countStatus w-lg h-[240px] absolute top-6 z-10 bg-white
        text-2xl text-black rounded-xl shadow-[2px_2px_8px_#00000033] text-center px-5 pt-5
        max-sm:w-3xs max-sm:h-[220px] max-sm:text-lg">
          <p className='retry-text text-red-500 font-medium'>🧨Last move was a dud. Game over? Click New Game to start a new game.</p>
          <button ref={buttonRef} className='reset-button mt-5 bg-[#fb6f92] rounded-lg p-3 text-[20px] transition:transform duration-150
                        font-semibold hover:cursor-pointer hover:-translate-y-1 max-sm:text-[16px]' onClick={rollDice}>
            <span className='text-white'>New Game</span>
          </button>
        </div>
        <div className="w-full h-full bg-gray-700/50 absolute top-0 z-5"></div>
      </>
      
      }


      <Header />

      <div className="die-container grid grid-cols-5 gap-10 mt-5 max-sm:gap-5 max-sm:px-5 ">
        {diceElements}
      </div>

      <button ref={buttonRef} className='roll-button mt-12 bg-[#fb6f92] rounded-lg p-3 text-[20px] transition:transform duration-150
                        font-semibold hover:cursor-pointer hover:-translate-y-1 max-sm:text-[18px]' onClick={rollDice}>
        {gameWon ? 'New Game' : 'Roll Dice'}
      </button>

      <div className="countDiv bg-[#d8e2dc] mt-16 px-3 py-10 rounded-lg shadow-[2px_2px_8px_#00000033] text-center
      max-sm:w-10/12 max-sm:py-5 md:w-9/12 lg:w-2/5">
        <p className='countText text-[#4a5759] text-5xl font-bold max-sm:text-3xl'>
          <i className="fa-solid fa-dice mr-4"></i>
          Rolls left: {count}</p>
      </div>
    </main>
  )
}


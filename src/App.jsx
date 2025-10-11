import React from 'react'
import { useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'
import coin from './assets/coin.svg'
import Confetti from 'react-confetti'
import Header from "./components/header"
import Die from './components/Die'
import Welcome from './components/welcome'

export default function App() {
  // {rolls === 'easy' && setOrg_count(40)}

  // dice array
  const [dices, setDices] = React.useState(() => generateallNewDice())
  //level of game
  const [rolls, setRolls] = React.useState(null)
  // # of rolls left
  const [count, setCount] = React.useState()
  // points system  array
  const [points, setPoints] = React.useState(0)
  const [showcase, setShowcase] = React.useState(true)


  const buttonRef = useRef(null)

  // game win status
  const gameWon = dices.every(die => die.isHeld) &&
                  dices.every(die => die.value === dices[0].value)

  // game lose status
  const gameLost = count === 0 && !gameWon

  const handleselect = (selected) => {
    setRolls(selected)
    setShowcase(false)
    if (selected === 'easy') setCount(40);
    else if (selected === 'medium') setCount(25);
    else if (selected === 'hard') setCount(15);
    setDices(generateallNewDice())
  }

  //if (rolls === 'easy') {
   // setCount(40)
  //}

  //if (rolls === 'medium') {
    //setCount(25)
  //}

  //if (rolls === 'hard') {
    //setCount(15)
  //}


  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
      if (rolls === 'easy'){
        setPoints(prev => prev + 250)
      }
      else if (rolls === 'medium') {
        setPoints(prev => prev + 400)
      }
      else if (rolls === 'hard') {
        setPoints(prev => prev + 500)
      }
    }
  }, [gameWon, rolls])

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
      if (rolls === 'easy') setCount(41);
      else if (rolls === 'medium') setCount(26);
      else if (rolls === 'hard') setCount(16);
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
      {showcase && <Welcome onSelect = {handleselect}/>}

      {gameWon && <div className="fixed z-0 w-full h-screen top-0"><Confetti /></div>}
      

      {gameWon && <div aria-live='polite' className="completed-div w-sm h-[400px] absolute top-15 z-20 bg-[#faedcd] ring-2 ring-sky-500
      rounded-xl shadow-[2px_2px_8px_#00000033] px-5 py-10 max-sm:w-3xs max-sm:h-[250px] max-sm:text-lg max-sm:py-5">
        <div className="won-div flex flex-col items-center gap-6 text-black max-sm:gap-2">
          <p className='won-text text-7xl font-extrabold text-purple-600 max-sm:text-4xl'>Woo Hoo!</p>
          <p className="won-emoji text-6xl max-sm:text-4xl">🥳</p>
          {/*<p className="won-points text-[#ffb700] text-2xl font-bold max-sm:text-lg">You won 250 coins!!</p>*/}
          <p className="won-subheading text-2xl text-center p-2 text-[#5c3a2e] font-medium max-sm:text-lg">Click "New Game" to win again! or <span className='text-red-600 font-(family-name:--evil-font) text-3xl'>Lose</span> 
            <span className='text-4xl max-sm:text-lg'>😈</span>
          </p>
          </div>
      </div>}
      
      {gameLost && <>
        <div aria-live='polite' className="lost-div w-sm h-lg absolute top-20 z-20 bg-[#faedcd] ring-2 ring-sky-500
        rounded-xl shadow-[2px_2px_8px_#00000033] px-5 py-10 max-sm:w-3xs max-sm:h-[350px] max-sm:py-5">
          <div className="lose-div flex flex-col items-center gap-8 text-black max-sm:gap-2">
            <p className='lose-text text-7xl font-extrabold text-purple-600 max-sm:text-4xl'>Oh No!</p>
            <p className="lose-emoji text-6xl max-sm:text-4xl">😔</p>
            <p className="won-points text-[#ffb700] text-2xl font-bold max-sm:text-lg">You won 0 coins.</p>
            <p className="lose-subheading text-2xl text-center p-2 text-[#5c3a2e] font-medium max-sm:text-lg">Click "New Game" to win or <span className='text-red-600 font-(family-name:--evil-font) text-3xl'>Lose again!</span> 
            <span className='text-4xl max-sm:text-lg'>😈</span>
            </p>
            <button ref={buttonRef} className='reset-button bg-[#fb6f92] rounded-lg p-3 text-[20px] transition:transform duration-150
            font-semibold hover:cursor-pointer hover:-translate-y-1 max-sm:text-[16px]' onClick={rollDice}>
              <span className='text-white'>New Game</span>
            </button>
          </div>
        </div>
        
        <div className="fixed z-0 w-full h-screen top-0">
        <Confetti
          className='z-7'
          drawShape={ctx => {
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.bezierCurveTo(-5, -5, -10, 5, 0, 10);
              ctx.bezierCurveTo(10, 5, 5, -5, 0, 0);
              ctx.closePath();
              ctx.fill();
          }}
          numberOfPieces={200}
          gravity={0.1}
          wind={0}
          colors={['#ff4d4d', '#ff9999', '#cc0000']} // muted grays
          recycle={false}
          />
        </div>
        {/*<div className="w-full h-full bg-gray-700/50 absolute top-0 z-5"></div>*/}
      </>
      
      }

      <div aria-live='polite' className="points-container absolute top-6 left-5 min-w-[120px] py-2 flex justify-center items-center 
      gap-2 bg-[#ffc8dd] text-[#f5f3f4] text-xl font-bold rounded-3xl max-sm:top-2 max-sm:left-2 max-sm:px-1
      md:text-xl">
        <span role='points'>+{points}</span>
        <img src={coin} alt="coin svg" className='coin w-[25px] h-[25px] max-sm:w-[15px] max-sm:h-[15px] ' />
      </div>

      <Header />

      <div className="die-container grid grid-cols-5 gap-10 mt-5 max-sm:gap-5 max-sm:px-5 ">
        {diceElements}
      </div>

      <button ref={buttonRef} className='roll-button mt-12 z-10 bg-[#fb6f92] rounded-lg p-3 text-[20px] transition:transform duration-150
                        font-semibold hover:cursor-pointer hover:-translate-y-1 max-sm:text-[18px]' onClick={rollDice}>
        {gameWon ? 'New Game' : 'Roll Dice'}
      </button>

      <div className="countDiv bg-[#d8e2dc] mt-16 px-3 py-10 rounded-lg shadow-[2px_2px_8px_#00000033] text-center
      max-sm:w-10/12 max-sm:py-5 md:w-9/12 lg:w-2/5">
        <p className='countText text-[#4a5759] text-5xl font-bold max-sm:text-3xl'>
          <i className="fa-solid fa-dice mr-4"></i>
          Rolls left: {count}</p>
      </div>

      {gameWon && <section className="replay-section flex flex-col items-center mt-40 mb-20 z-20 max-sm:w-full max-sm:mt-25">
        <h1 className="replay-heading text-6xl text-[#4a5759] text-center font-bold dark:text-white
        max-sm:text-3xl">Finding it Too Easy? Try Another Level....</h1>
        <div className="replay-choices mt-20 flex gap-20 max-sm:gap-8 max-sm:mt-10">
          <button className="easy-choice" onClick={() => handleselect('easy')}>Easy 😊</button>
          <button className="medium-choice" onClick={() => handleselect('medium')}>Medium 😎</button>
          <button className="hard-choice" onClick={() => handleselect('hard')}>Hard 💪</button>
        </div>
      </section>}

      {gameLost && <section className="replay-section flex flex-col items-center mt-40 mb-20 z-20 max-sm:w-full max-sm:mt-25">
        <h1 className="replay-heading text-6xl text-[#4a5759] text-center font-bold dark:text-white
        max-sm:text-3xl md:px-[5px]">Not Brave Enough? Try Something easier...</h1>
        <div className="replay-choices mt-20 flex gap-20">
          <button className="easy-choice" onClick={() => handleselect('easy')}>Easy 😊</button>
          <button className="medium-choice" onClick={() => handleselect('medium')}>Medium 😎</button>
        </div>
      </section>}
    </main>
  )
}


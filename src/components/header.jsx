import '../index.css'
import { useState, useEffect, use } from 'react'

export default function Header() {


    const [darkState, setDarkState] = useState(false)

    useEffect(() => {
        const htmlElement = document.documentElement
        if (darkState) {
            htmlElement.classList.add('dark')
        }
        else {
            htmlElement.classList.remove('dark')
        }
    }, [darkState])

    console.log(darkState)


    return (
        <section className="header-section flex flex-col items-center gap-[20px]
        mb-8">
            <h1 className="heading1 text-[#4a5759] md:text-7xl font-bold
            max-sm:text-5xl dark:text-white">TENZIES</h1>
            <p className='heading-text md:text-xl max-sm:text-lg text-[#5c3a2e] font-medium
            max-sm:text-center max-sm:px-2 max-[340px]:text-[12px] lg:text-2xl dark:text-white'>Roll all dice until all dice are same. Start a new game once you are finished</p>

            <div className="theme-switcher absolute top-10 right-10 text-3xl flex gap-4">
                {darkState ? <span className='w-10 h-10 p-4 rounded-full bg-white flex items-center justify-center'>
                    <i className="fa-solid fa-moon hover:cursor-pointer text-[#495057] transition duration-300"
                    onClick={() => setDarkState(prev => !prev)}
                    aria-label="Switch to light theme"></i>
                </span> : 
                <span className='w-10 h-10 p-4 rounded-full bg-white flex items-center justify-center'>    
                    <i className="fa-solid fa-sun hover:cursor-pointer text-[#ffc300] transition duration-300"
                    onClick={() => setDarkState(prev => !prev)}
                    aria-label="Switch to dark theme"></i>
                </span>}
            </div>
        </section>
    )
}
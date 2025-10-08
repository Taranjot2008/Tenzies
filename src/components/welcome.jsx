import React from 'react'

export default function Welcome(props) {


    return (
        <main className="welcome-home w-screen h-screen absolute top-0 z-20 bg-gray-700/50 flex
        flex-col justify-center items-center">
            <div className="welcome-overlay"></div>
            <section className="welcome-choice lg:w-2/5 lg:h-2/5 z-10 flex flex-col items-center ring-4 ring-sky-400
            py-10 rounded-lg bg-[#faedcd] gap-5 max-sm:w-4/5 max-sm:h-1/3 max-md:w-4/5 md:w-4/5">
                <p className="welcome-heading text-gray-600 font-bold text-5xl max-sm:text-2xl">Welcome to Tenzies!</p>
                <p className="welcome-subheading font-medium text-2xl text-[#5c3a2e] max-sm:text-lg">Choose your level: </p>
                <div className="choices mt-2 flex gap-5 max-sm:gap-2">
                    <button className="easy-choice" onClick={() => props.onSelect('easy')}>Easy 😊</button>
                    <button className="medium-choice" onClick={() => props.onSelect('medium')}>Medium 😎</button>
                    <button className="hard-choice" onClick={() => props.onSelect('hard')}>Hard 💪</button>
                </div>
            </section>
        </main>
    )
}
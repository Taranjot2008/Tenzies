import '../index.css'

export default function Header() {
    return (
        <section className="header-section flex flex-col items-center gap-[20px]
        mb-8">
            <h1 className="heading1 text-[#4a5759] md:text-7xl font-bold
            max-sm:text-5xl">TENZIES</h1>
            <p className='heading-text md:text-xl max-sm:text-lg text-[#5c3a2e] font-medium
            max-sm:text-center max-[340px]:text-[12px]'>Roll all dice until all dice are same. Start a new game once you are finished</p>
        </section>
    )
}
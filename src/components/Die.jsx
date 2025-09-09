export default function Die(props) {
    return (
        <button 
            className={props.isHeld ? 'held-button' : 'die-button'}
            onClick={props.onClick}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value},
            ${props.isHeld} ? "not held" : "held"`}>
        {props.value}
        </button>
    )
}
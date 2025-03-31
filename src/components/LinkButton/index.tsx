import { Link } from "react-router-dom"

interface LinkButtonProps{
    to: string
    text: string
    onClick?: () => void;
}

const LinkButton = ({ to, text, onClick }: LinkButtonProps) => {
    return (
        <Link to={to} className="bg-neutral-800 text-white p-2 rounded-[3px] my-3 cursor-pointer"  onClick={onClick}>{text}</Link>
    )
}

export default LinkButton
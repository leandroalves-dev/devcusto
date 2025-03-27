import { Link } from "react-router-dom"

interface LinkButtonProps{
    to: string
    text: string
}

const LinkButton = ({ to, text }: LinkButtonProps) => {
    return (
        <Link to={to} className="bg-neutral-800 text-white p-2 rounded-[3px] my-3 cursor-pointer">{text}</Link>
    )
}

export default LinkButton
import { Link } from "react-router-dom"

interface LinkButtonProps {
    to: string
    text: string
    onClick?: () => void;
}

const LinkButton = ({ to, text, onClick }: LinkButtonProps) => {
    return (
        <Link
            to={to}
            className="inline-flex items-center bg-surface hover:bg-surface-hover border border-border text-text text-sm font-medium px-5 py-2.5 rounded-md transition-colors"
            onClick={onClick}
        >
            {text}
        </Link>
    )
}

export default LinkButton

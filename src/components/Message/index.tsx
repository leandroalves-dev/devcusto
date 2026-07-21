import { BsInfoCircle } from "react-icons/bs"

interface MessageProps {
    title: string
}

const Message = ({ title }: MessageProps) => {
    return (
        <div className="flex flex-col w-full h-64 items-center justify-center gap-3 bg-surface border border-border rounded-lg">
            <BsInfoCircle size={32} className="text-text-muted" />
            <p className="text-text-muted text-sm text-center max-w-md">{title}</p>
        </div>
    )
}

export default Message

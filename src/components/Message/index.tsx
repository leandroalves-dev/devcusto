//Icons
import { BsInfoCircle } from "react-icons/bs"

interface MessageProps{
    title: string
}

const Message = ({title}: MessageProps) => {
  return (
    <div className="flex flex-col w-full h-65 items-center justify-center text-neutral-700 text-[24px] bg-neutral-900 mb-10">
        <BsInfoCircle size={45}  className="text-neutral-800" />
        {title}
    </div> 
  )
}

export default Message
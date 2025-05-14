interface ButtonsProps{
    title: string   
}

const Buttons = ({ title }: ButtonsProps) => {
    return (
        <button className="bg-[#FF3C32] w-[25%] px-5 text-white p-2 rounded-[3px] cursor-pointer hover:opacity-80">{title}</button>
    )
}

export default Buttons
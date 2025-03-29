interface ButtonsProps{
    title: string   
}

const Buttons = ({ title }: ButtonsProps) => {
    return (
        <button className="bg-[#FF3C32] w-40 px-5 text-white p-2 rounded-[3px] my-3 cursor-pointer hover:opacity-80">{title}</button>
    )
}

export default Buttons

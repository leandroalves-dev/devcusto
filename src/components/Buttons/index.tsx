interface ButtonsProps{
    title: string   
}

const Buttons = ({ title }: ButtonsProps) => {
    return (
        <button className="bg-neutral-800 text-white p-2 rounded-[3px] my-3 cursor-pointer">{title}</button>
    )
}

export default Buttons

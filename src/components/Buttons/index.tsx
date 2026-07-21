interface ButtonsProps {
    title: string
}

const Buttons = ({ title }: ButtonsProps) => {
    return (
        <button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white font-medium text-sm px-6 py-2.5 rounded-md cursor-pointer transition-colors mt-4"
        >
            {title}
        </button>
    )
}

export default Buttons

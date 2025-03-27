import React from "react"

interface InputProps{
    name: string
    value: string
    label: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    type: string
}


const Input = ({ label, type, value, name, placeholder, onChange}: InputProps) => {
    return (
        <div className="flex flex-col w-full">
            <label className="text-white/90 text-[16px]">{label}:</label>
            <input
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full border border-zinc-900 p-3 my-2 rounded-[3px] text-white/30 text-[12px] outline-none"
            />
        </div>
    )
}

export default Input
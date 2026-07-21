interface InputProps {
    name: string
    value: string
    label: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    type: string
}

const Input = ({ label, type, value, name, placeholder, onChange }: InputProps) => {
    return (
        <div className="flex flex-col w-full gap-1.5">
            <label htmlFor={name} className="text-text-secondary text-sm font-medium">{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full bg-surface border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted rounded-md outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
            />
        </div>
    )
}

export default Input

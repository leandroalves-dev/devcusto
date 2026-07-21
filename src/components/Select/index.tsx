import { Category } from "../../interface/projects";

interface SelectProps {
    name: string;
    value: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Category[];
}

const Select = ({ label, value, name, options, onChange }: SelectProps) => {
    return (
        <div className="flex flex-col w-full gap-1.5">
            <label htmlFor={name} className="text-text-secondary text-sm font-medium">{label}</label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="w-full bg-surface border border-border px-3.5 py-2.5 text-sm text-text rounded-md outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30 appearance-none cursor-pointer"
            >
                <option value="" className="bg-surface text-text-muted">Selecione uma opção</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id} className="bg-surface">
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;

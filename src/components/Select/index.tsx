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
        <div className="flex flex-col w-full">
            <label className="text-white/90 text-[16px]">{label}:</label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="w-full border border-zinc-900 p-3 my-2 rounded-[3px] text-white/30 text-[12px] outline-none"
            >
                <option value="" className="text-zinc-800">Selecione uma opção</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id} className="text-zinc-800">
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;

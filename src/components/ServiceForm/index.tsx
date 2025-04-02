import { useState } from "react";

//components
import Buttons from "../Buttons"
import Input from "../Input";

interface ServiceFormProps{
    onAddService: (service: {name: string, cost: number, description: string}) => void
}

const ServiceForm = ({ onAddService }: ServiceFormProps) => {

    const [formData, setFormData] = useState({name: '', cost: '', description: ''})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!formData.name || !formData.cost || !formData.description){
            alert('Preencha todos os campos')
            return
        }

        const newService = {
            name: formData.name,
            cost: Number(formData.cost),
            description: formData.description
        }

        onAddService(newService)
        setFormData({ name: '', cost: '', description: '' })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={handleSubmit} className="pb-8">
            <Input
                type="text"
                label="Nome do Serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                value={formData.name}
                onChange={handleChange}
            />

            <Input
                type="number"
                label="Custo do Serviço"
                name="cost"
                placeholder="Insira o valor total"
                value={formData.cost}
                onChange={handleChange}
            />

            <Input
                type="text"
                label="Descrição do Serviço"
                name="description"
                placeholder="Descreva o serviço"
                value={formData.description}
                onChange={handleChange}
            />
            <Buttons title="Adicionar" />
        </form>
    )
}

export default ServiceForm
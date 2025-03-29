
import { useState } from "react"

//hooks
import { useCategories } from "../../hook/useCategories"

//components
import Buttons from "../Buttons"
import Input from "../Input"
import Select from "../Select"
import Loading from "../Loading"

//services
import { createProject } from "../../services/projectService"


const ProjectForm = () => {

    const { categories } = useCategories()

    const [projectName, setProjectName] = useState('');
    const [budget, setBudget] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("");

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent ) => {
        e.preventDefault();

        if(!projectName || !budget || !selectedCategory){
            setError('Por favor, preencha todos os campos');
            setTimeout(() => { setError('') },2000)
            return
        }

        setLoading(true);

        try {

            await createProject({
                name: projectName,
                budget: Number(budget),
                category: selectedCategory
            })

            setLoading(false);
            setSuccess('Projeto cadastrado com sucesso!')

            setProjectName('')
            setBudget('')
            setSelectedCategory('')

            setTimeout( () => {
                setSuccess('')
            },2000)
            
        } catch (error) {
            console.log(error)
        }
    }
   

    return (
        <div className="mt-10">

            {loading && <Loading />}
            <form onSubmit={handleSubmit}>

                <Input label="Nome ro Projeto" type="text" name="projeto" value={projectName} placeholder="Insira o nome do projeto" onChange={(e) => setProjectName(e.target.value)} />
                <Input label="Orçamento" type="number" name="orcamento" value={budget} placeholder="Insira orçamento do projeto" onChange={(e) => setBudget(e.target.value)} />
                <Select name="category_id" label="Selecione a categoria" value={selectedCategory} options={categories} onChange={(e) => setSelectedCategory(e.target.value)} />
                <Buttons title="Criar Projeto"  />

                {error && <p className="bg-red-200 border border-red-300 text-center p-2 rounded-[3px] text-zinc-700">{error}</p>}
                {success && (<p className="bg-green-100 boder border-green-300 text-center p-2 rounded-[3px] text-zinc-700">{success}</p>)}
            </form>
        </div>
    )
}

export default ProjectForm

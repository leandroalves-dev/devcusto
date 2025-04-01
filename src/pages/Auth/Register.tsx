import { FormEvent, useState } from "react"

//services
import { register } from "../../services/auth"

//components
import Container from "../../components/Container"
import Input from "../../components/Input"
import Buttons from "../../components/Buttons"
import Loading from "../../components/Loading"
import AlertMessage from "../../components/AlertMessage"

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, [name]: value
        }))
    }
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if(!formData.name || !formData.email || !formData.password){
            setError('Preencha todos os campos')
            setTimeout(() => { setError('') },2000)
            return;
        }

        setLoading(true);

        try {
            const user = await register(formData.email, formData.password, formData.name);
            setLoading(false);
            setSuccess("Cadastro realizado com sucesso!");
            setTimeout(() => { setSuccess('') },2000)
            setError('');
            setFormData({ name: '', email: '', password: '' });
           
            console.log("Usuário registrado:", user);

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
                throw new Error("Erro ao registrar. Tente novamente.");
              }
        } finally{
            setLoading(false)
        }
    }

    return (
        <Container>
            {loading && <Loading /> }
            <div className="flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="mt-10 w-[100%] sm:w-[60%] mx-auto">
                    <h2 className="text-2xl mb-5 text-white/90">Preencha o formulário de cadastro</h2>
                    <Input label="Nome" type="text" name="name" value={formData.name} placeholder="Digite seu nome..." onChange={handleInputChange} />
                    <div className="flex flex-col justify-between gap-1 sm:flex-row">
                        <Input label="E-mail" type="email" name="email" value={formData.email} placeholder="Digite seu e-mail..." onChange={handleInputChange} />
                        <Input label="Senha" type="password" name="password" value={formData.password} placeholder="Digite sua senha..." onChange={handleInputChange} />
                    </div>
                    
                    <Buttons title="Cadastrar" />
                
                    <AlertMessage type="error" message={error} />
                    <AlertMessage type="success" message={success} /> 
                </form>
            </div>

        </Container>
    )
}

export default Register
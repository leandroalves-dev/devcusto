import { FormEvent, useState } from "react";

//components
import Container from "../../components/Container"
import Loading from "../../components/Loading"
import Input from "../../components/Input";
import Buttons from "../../components/Buttons";

// context
import { useAuth } from "../../context/useAuth";
import { Link } from "react-router-dom";

const Login = () => {

    const { login } = useAuth(); 

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, [name]: value
        }));
    };
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if(!formData.email || !formData.password){
            setError('Preencha todos os campos')
            setTimeout(() => { setError('') },2000)
            return;
        }

        setLoading(true);

        try {
            await login(formData.email, formData.password); // Usando a função de login do AuthContext
            setLoading(false);
            setSuccess('Login efetuado com sucesso!');
            setTimeout(() => { setSuccess('') }, 2000);
            setError('');
            setFormData({ email: '', password: '' });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                throw new Error('Erro desconhecido. Tente novamente');
            } else {
                throw new Error('Erro desconhecido. Tente novamente');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            {loading && <Loading /> }
            <div className="flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="mt-10 w-[100%] sm:w-[60%] mx-auto">
                    <h2 className="text-2xl mb-5 text-white/90">Logar com os dados abaixo</h2>
                    
                    <Input label="E-mail" type="email" name="email" value={formData.email} placeholder="Digite seu e-mail..." onChange={handleInputChange} />
                    <Input label="Senha" type="password" name="password" value={formData.password} placeholder="Digite sua senha..." onChange={handleInputChange} />
                    
                    <div className="flex justify-between items-center">
                        <Buttons title="Logar" />
                        <Link to="/reset" className="text-white underline hover:no-underline">Esqueceu a senha?</Link>
                    </div>
                
                    {error && (<p className="bg-red-200 border border-red-300 text-center p-2 rounded-[3px] text-zinc-700">{error}</p>)}
                    {success && (<p className="bg-green-100 boder border-green-300 text-center p-2 rounded-[3px] text-zinc-700">{success}</p>)}
                </form>
            </div>

        </Container>
    )
}

export default Login
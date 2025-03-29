import Api from './axios';

export const getProject = async() => {

    try {

        const response = await Api.get('/json/devCusto/api.json')
        
        console.log('Retorna as categorias', response.data)
        return response.data

        
    } catch (error) {
        console.log('Erro ao buscar o projeto', error);
        throw error;
    }

}
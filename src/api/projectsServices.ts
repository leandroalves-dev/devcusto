import Api from './axios';

export const getCategories = async () => {
    try {
        const response = await Api.get('/categories')
        return response.data
    } catch (error) {
        console.error('Erro ao buscar categorias', error);
        throw error;
    }
}
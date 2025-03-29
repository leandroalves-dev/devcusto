import axios from 'axios';

const Api = axios.create({
    baseURL: 'https:leandroeffgen.com.br'
})

export default Api;
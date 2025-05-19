import axios from 'axios';

const Api = axios.create({
    baseURL: 'https:leandroeffgen.com.br/projects'
})

export default Api;
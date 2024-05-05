import { axiosInstance } from ".";

export const addArticle = async(payload)=>{
   
    try {
        const {data} = await axiosInstance.post('http://localhost:3000/api/Articles/add',payload);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const getLatestArticle = async()=>{
    try {
        const {data} = await  axiosInstance.get('http://localhost:3000/api/Articles/get-latest');
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateArticle = async(payload) =>{
    try {
        const {data} = await axiosInstance.put('http://localhost:3000/api/Articles/update-article',payload);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const Count = async() =>{
    try {
        const {data} = await axiosInstance.get('http://localhost:3000/api/Articles/counts');
        return data;
    } catch (error) {
        return error.response.data;
    }
}

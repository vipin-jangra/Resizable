import { axiosInstance } from ".";

export const addArticle = async(payload)=>{
   
    try {
        const {data} = await axiosInstance.post('https://resizable-backend.onrender.com/api/Articles/add',payload);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const getLatestArticle = async()=>{
    try {
        const {data} = await  axiosInstance.get('https://resizable-backend.onrender.com/api/Articles/get-latest');
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateArticle = async(payload) =>{
    try {
        const {data} = await axiosInstance.put('https://resizable-backend.onrender.com/api/Articles/update-article',payload);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const Count = async() =>{
    try {
        const {data} = await axiosInstance.get('https://resizable-backend.onrender.com/api/Articles/counts');
        return data;
    } catch (error) {
        return error.response.data;
    }
}

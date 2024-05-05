import { axiosInstance } from ".";

export const addArticle = async(payload)=>{
   
    try {
        const {data} = await axiosInstance.post('resizable-api.vercel.app/api/Articles/add',payload);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const getLatestArticle = async()=>{
    try {
        const {data} = await  axiosInstance.get('resizable-api.vercel.app/api/Articles/get-latest');
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateArticle = async(payload) =>{
    try {
        const {data} = await axiosInstance.put('resizable-api.vercel.app/api/Articles/update-article',payload);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const Count = async() =>{
    try {
        const {data} = await axiosInstance.get('resizable-api.vercel.app/api/Articles/counts');
        return data;
    } catch (error) {
        return error.response.data;
    }
}

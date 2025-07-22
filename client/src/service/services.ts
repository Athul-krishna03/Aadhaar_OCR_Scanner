
import type { AadhaarData } from "@/types/IAadhaarData";
import axios from "axios";


export const api  = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})



export const getAadhaarData = async (frontImage: string | null , backImage: string | null) => {

    try {
        const response = await api.post("/ocr", {
            frontImage,
            backImage
        });
        console.log("Response from OCR API:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching Aadhaar data:", error);
        throw error;
    }
}

export const saveAadhaarData = async (data:AadhaarData)=>{
    const response = await api.post('/saveData',{
        data
    })
    return  response
}
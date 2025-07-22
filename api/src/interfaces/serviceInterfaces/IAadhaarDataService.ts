import { IAadhaar } from "../../types/IAadhaarType"

export interface IAadhaarDataService{
    getAadhaarData():Promise<IAadhaar[]>
    saveAadhaarData(data:IAadhaar):Promise<Boolean>
}
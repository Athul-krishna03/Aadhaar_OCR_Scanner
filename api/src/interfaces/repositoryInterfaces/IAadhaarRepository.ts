import { AadhaarDocument } from "../../models/aadhaarModel";
import { IAadhaar } from "../../types/IAadhaarType";

export interface IAadhaarRepository{
    getAadhaarData():Promise<IAadhaar[]>
    saveAadhaarData(data:IAadhaar):Promise<IAadhaar>
}
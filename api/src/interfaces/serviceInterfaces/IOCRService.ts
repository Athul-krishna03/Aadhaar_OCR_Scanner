import { IAadhaarData } from "../../service/OCRService";

export interface IOCRService{
    processOCR(frontImage: string, backImage: string): Promise<IAadhaarData>
}
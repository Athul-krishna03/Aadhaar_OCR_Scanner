import { convertImageToBuffer } from "../helper/ConvertImageToBuffer";
import { convertToGrayScale } from "../helper/convertToGrayScale";
import Tesseract from "tesseract.js";
import { parseAadhaarData } from "../helper/parseData";
import { IOCRService } from "../interfaces/serviceInterfaces/IOCRService";


export interface IAadhaarData {
    dob: string | null;
    aadharNumber: string | null;
    gender: string | null;
    name: string | null;
    fatherName: string | null;
    address: string | null;
}

export class OCRService implements IOCRService{
    constructor() {}
    async processOCR(frontImage: string, backImage: string): Promise<IAadhaarData> {
        const frontImageBuffer = await convertImageToBuffer(frontImage);
        const backImageBuffer = await convertImageToBuffer(backImage);
        if (!frontImageBuffer || !backImageBuffer) {
            throw new Error("Invalid image data");
        }
        console.log("Front Image Buffer:", frontImageBuffer);
        console.log("Back Image Buffer:", backImageBuffer);
        const frontGrayScaleBuffer = await convertToGrayScale(frontImageBuffer);
        const backGrayScaleBuffer = await convertToGrayScale(backImageBuffer);

        console.log("Front Gray Scale Buffer:", frontGrayScaleBuffer);
        console.log("Back Gray Scale Buffer:", backGrayScaleBuffer);
        if (!frontGrayScaleBuffer || !backGrayScaleBuffer) {
            throw new Error("Failed to convert images to grayscale");
        }

        const frontData = await Tesseract.recognize( frontGrayScaleBuffer,"eng",)
        const backData = await Tesseract.recognize( backGrayScaleBuffer,"eng")
        console.log("Front Data:", frontData.data.text);
        console.log("Back Data:", backData.data.text);
        const parsedData = parseAadhaarData(frontData.data.text, backData.data.text);
        console.log("Parsed Data:", parsedData);
        return parsedData;
    }
}

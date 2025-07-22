import { Request, Response } from "express"
import  asyncHandler  from "express-async-handler";
import { inject, injectable } from "tsyringe";
import { IOCRService } from "../interfaces/serviceInterfaces/IOCRService";
import { IAadhaar } from "../types/IAadhaarType";
import { IAadhaarDataService } from "../interfaces/serviceInterfaces/IAadhaarDataService";

@injectable()
export class Controllers{
    constructor(
        @inject("IOCRService") private _ocrService:IOCRService,
        @inject("IAadhaarDataService") private _aadhaarService:IAadhaarDataService
    ){}

    getOCRData = asyncHandler (async (req: Request, res: Response) => {
            const { frontImage, backImage } = req.body;
            const result = await this._ocrService.processOCR(frontImage, backImage);
            res.json(result);
    })

    saveAadhaarData = asyncHandler(async (req: Request, res: Response) => {
        const {data} = req.body
        console.log(data)
        const result = await this._aadhaarService.saveAadhaarData(data);
        res.status(200).json(result)
    })

}

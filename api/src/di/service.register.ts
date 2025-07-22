import { container } from "tsyringe";
import { IOCRService } from "../interfaces/serviceInterfaces/IOCRService";
import { OCRService } from "../service/OCRService";
import { IAadhaarDataService } from "../interfaces/serviceInterfaces/IAadhaarDataService";
import { AadhaarDataService } from "../service/AadharrDataService";
import { IAadhaarRepository } from "../interfaces/repositoryInterfaces/IAadhaarRepository";
import { AadhaarRepository } from "../repository/AadhaarRepository";



export class ServicesRegistery{
    static registerServices():void{
        container.register<IOCRService>("IOCRService",{
            useClass:OCRService
        })
        container.register<IAadhaarDataService>("IAadhaarDataService",{
            useClass:AadhaarDataService
        })
        container.register<IAadhaarRepository>("IAadhaarRepository",{
            useClass:AadhaarRepository
        })
    }
}
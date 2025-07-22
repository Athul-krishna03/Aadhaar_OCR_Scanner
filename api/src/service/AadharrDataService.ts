import { inject, injectable } from "tsyringe";
import {IAadhaarDataService} from "../interfaces/serviceInterfaces/IAadhaarDataService"
import { IAadhaar } from "../types/IAadhaarType";
import { IAadhaarRepository } from "../interfaces/repositoryInterfaces/IAadhaarRepository";

@injectable()
export class AadhaarDataService implements IAadhaarDataService{
    constructor(
        @inject("IAadhaarRepository") private _aadhaarRepository: IAadhaarRepository
    ){}
    async getAadhaarData(): Promise<IAadhaar[]> {
        return this._aadhaarRepository.getAadhaarData()
    }
    async saveAadhaarData(data:IAadhaar): Promise<Boolean> {
        const aadhaarDocument = await this._aadhaarRepository.saveAadhaarData(data);
        return aadhaarDocument !== null;
    }
}
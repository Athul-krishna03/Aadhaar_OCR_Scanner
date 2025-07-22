import { IAadhaarRepository } from "../interfaces/repositoryInterfaces/IAadhaarRepository";
import {  AadhaarModel } from "../models/aadhaarModel";
import { IAadhaar } from "../types/IAadhaarType";

export class AadhaarRepository implements IAadhaarRepository {
    constructor() {}
    async getAadhaarData(): Promise<IAadhaar[]> {
        return AadhaarModel.find().exec();
    }

    async saveAadhaarData(data:IAadhaar): Promise<IAadhaar> {
        return AadhaarModel.create(data)
    }
}
import { Types } from "mongoose";

export interface IAadhaar {
    _id?: string | Types.ObjectId;
    dob: string;
    aadharNumber: string;
    gender: string;
    name: string;
    fatherName?: string | null;
    address: string | null;
}
import { model, Model, Schema, Types } from "mongoose";

export interface AadhaarDocument extends Document{
    _id:Types.ObjectId;
    name: string;
    dob: string;
    gender: string;
    aadharNumber: string;
    fatherName?: string | null;
    address: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const AadhaarSchema = new Schema<AadhaarDocument>({
    name:{type:String,required:true},
    dob:{type:String,required:true},
    gender:{type:String,required:true},
    aadharNumber:{type:String,required:true},
    fatherName:{type:String},
    address:{type:String}
}, { timestamps: true })

export const AadhaarModel:Model<AadhaarDocument> = model("Aadhaar",AadhaarSchema)
export interface AadhaarData {
    dob: string;
    aadharNumber: string;
    gender: string;
    name: string;
    fatherName?: string | null;
    address: string | null;
}
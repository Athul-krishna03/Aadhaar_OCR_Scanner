import { useState } from "react";
import { Pencil, User, Calendar, ShieldCheck, Fingerprint, MapPin } from "lucide-react";
import type { AadhaarData } from "@/types/IAadhaarData";


interface ResultFieldProps {
    icon: React.ElementType;
    label: string;
    value: string;
    editable?: boolean;
    onChange?: (value: string) => void;
    isTextarea?: boolean;
    fullWidth?: boolean;
}

const ResultField = ({
    icon: Icon,
    label,
    value,
    editable = false,
    onChange,
    isTextarea = false,
    fullWidth = false,
}: ResultFieldProps) => {
    return (
        <div
        className={`flex items-start space-x-2 border rounded-lg p-3 shadow-sm ${
            fullWidth ? "col-span-full" : ""
        }`}
        >
        <Icon className="text-gray-500 w-5 h-5 mt-1" />
        <div className="flex flex-col flex-1">
            <span className="text-sm font-semibold text-gray-600 mb-1">{label}</span>
            {editable ? (
            isTextarea ? (
                <textarea
                className="border-none outline-none text-base text-gray-900 resize-none w-full"
                rows={3}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                autoFocus
                />
            ) : (
                <input
                className="border-none outline-none text-base text-gray-900"
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                autoFocus
                />
            )
            ) : (
            <span className="text-base text-gray-900 whitespace-pre-wrap">{value}</span>
            )}
        </div>
        </div>
    );
};

export const OCRResults = ({
    data,
    onDataUpdate,
}: {
    data: AadhaarData;
    onDataUpdate?: (updatedData: AadhaarData) => void;
}) => {
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState<AadhaarData>(data);

    const handleChange = (key: keyof AadhaarData, value: string) => {
        const updated = { ...editedData, [key]: value };
        setEditedData(updated);
    };
    const handleSave=()=>{
        onDataUpdate?.(editedData);
    }
    return (
        <div className="space-y-4 p-4">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">OCR Results</h2>
            {editMode ? (
                <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => {
                    handleSave();
                    setEditMode(false);
                    }}
                >
                    ✅ Save
                </button>
                

                ) : (
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => setEditMode(true)}
                >
                    <Pencil className="inline-block w-4 h-4 mr-1" /> Edit
                </button>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultField icon={User} label="Full Name" value={editedData.name} editable={editMode} onChange={(val) => handleChange("name", val)} />
            <ResultField icon={Calendar} label="DOB" value={editedData.dob} editable={editMode} onChange={(val) => handleChange("dob", val)} />
            <ResultField icon={ShieldCheck} label="Gender" value={editedData.gender} editable={editMode} onChange={(val) => handleChange("gender", val)} />
            <ResultField icon={Fingerprint} label="Aadhaar Number" value={editedData.aadharNumber} editable={editMode} onChange={(val) => handleChange("aadharNumber", val)} />
            <ResultField icon={User} label="Father's Name" value={editedData.fatherName || ""} editable={editMode} onChange={(val) => handleChange("fatherName", val)} />
            <ResultField
            icon={MapPin}
            label="Address"
            value={editedData.address || ""}
            editable={editMode}
            onChange={(val) => handleChange("address", val)}
            isTextarea
            fullWidth
            />
        </div>
        </div>
    );
};

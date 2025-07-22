import axios from "axios";

export const convertImageToBuffer = async (imageUrl: string): Promise<Buffer> => {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data);
    return imageBuffer;
};

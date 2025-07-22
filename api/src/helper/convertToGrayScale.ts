import sharp from "sharp";

export const convertToGrayScale = async (imageBuffer: Buffer):  Promise<Buffer> => {
    return sharp(imageBuffer)
        .resize(800)              
        .grayscale()               
        .normalize()                
        .threshold(150)            
        .toBuffer();
};
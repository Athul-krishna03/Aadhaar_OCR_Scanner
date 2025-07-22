interface AadhaarInfo {
    dob: string | null;
    aadharNumber: string | null;
    gender: string | null;
    name: string | null;
    fatherName: string | null;
    address: string | null;
}

export const parseAadhaarData = (frontText: string, backText: string): AadhaarInfo => {
    const info: AadhaarInfo = {
        dob: null,
        aadharNumber: null,
        gender: null,
        name: null,
        fatherName: null,
        address: null,
    };

    // Helper function to clean up OCR'd text
    const cleanText = (text: string) => text.replace(/\s+/g, ' ').trim();
    const cleanFrontText = cleanText(frontText);
    const cleanBackText = cleanText(backText);

    // Split into lines for line-by-line parsing
    const frontLines = frontText.split(/\r?\n/).map(line => line.trim()).filter(line => line);

    // Extract DOB
    const dobPattern = /(?:Date of Birth|DOB) ?:? *(\d{2}\/\d{2}\/\d{4})/i;
    const dobMatch = cleanFrontText.match(dobPattern);
    info.dob = dobMatch ? dobMatch[1] : null;

    // Extract Aadhaar Number
    const aadhaarPattern = /(\d{4} \d{4} \d{4})/;
    const aadhaarMatch = cleanFrontText.match(aadhaarPattern);
    info.aadharNumber = aadhaarMatch ? aadhaarMatch[1] : null;

    // Extract Gender
    const genderPattern = /\b(Male|Female|Others?)\b/i;
    const genderMatch = cleanFrontText.match(genderPattern);
    info.gender = genderMatch
        ? genderMatch[1].charAt(0).toUpperCase() + genderMatch[1].slice(1).toLowerCase()
        : null;

    // Extract Name (line above DOB line)
    for (let i = 0; i < frontLines.length; i++) {
        if (/DOB|Date of Birth/i.test(frontLines[i])) {
            const potentialNameLine = frontLines[i - 1]?.trim();
            if (
                potentialNameLine &&
                !/Government|India|Male|Female|DOB|Date|Year|Month|Day/i.test(potentialNameLine)
            ) {
                info.name = potentialNameLine;
            }
            break;
        }
    }

    // Extract Father's Name (e.g., S/O or D/O or C/O)
    const fatherPattern = /\b[$SCD]\/[O0][:\-]?\s*([A-Z][a-zA-Z. ]+)/i;
    const fatherMatch = cleanBackText.match(fatherPattern);
    if (fatherMatch) {
        info.fatherName = fatherMatch[1].trim();
    }

    // Extract Address
    const addressPattern = /Address:\s*([\s\S]*?)(?:\d{6}|$)/i;
    const addressMatch = backText.match(addressPattern);
    if (addressMatch) {
        let rawAddress = addressMatch[1];
        rawAddress = rawAddress.replace(/\b[SCD]\/O[:\-]?\s*[^\n,]+[,]?/i, '');

        info.address = cleanText(rawAddress)
            .replace(/[^\w\s,.-]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    return info;
};
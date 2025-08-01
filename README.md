# Aadhaar OCR Scanner 🆔🔍

A lightweight Node.js utility that extracts personal details from scanned Aadhaar cards using `tesseract.js` and basic image preprocessing techniques. Supports extraction of name, gender, date of birth, Aadhaar number, and address (front side).

## 🚀 Features

- 📸 Extracts key Aadhaar fields from card images:
  - Name
  - Gender
  - Date of Birth (DOB)
  - Aadhaar Number
  - Address (if visible)
- 🎯 OCR powered by [`tesseract.js`](https://github.com/naptha/tesseract.js)
- 🎨 Preprocesses image (grayscale, resizing) to improve OCR accuracy
- 🧩 Repository pattern  structure for future enhancements

## 🛠️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/Athul-krishna03/Aadhaar_OCR_Scanner.git
cd Aadhaar_OCR_Scanner
npm i
node index.js





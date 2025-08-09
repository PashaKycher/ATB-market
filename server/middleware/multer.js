import multer from "multer";

// create storage engine for multer
const storage = multer.memoryStorage();
// create middleware for multer upload image 
export const upload = multer({ storage: storage });

export default upload;
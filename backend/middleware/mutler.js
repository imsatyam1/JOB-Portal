import multer from "multer";

// Setup memory storage
const storage = multer.memoryStorage(); // Or you can use disk storage

// Configure Multer to handle two different file uploads
export const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
}).fields([
  { name: 'profilePic', maxCount: 1 },  // Single file for 'profilePic'
  { name: 'resume', maxCount: 1 }       // Single file for 'resume'
]);

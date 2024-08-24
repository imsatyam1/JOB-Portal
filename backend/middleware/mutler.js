import mutler from "multer";

const storage = mutler.memoryStorage();
export const singleUpload = mutler({storage}).single("file");

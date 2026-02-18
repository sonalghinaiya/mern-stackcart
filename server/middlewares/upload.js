import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const userStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "users",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// const userStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads/users");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const productStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads/products");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"), false);
//   }
// };

export const uploadUser = multer({
  storage: userStorage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  // fileFilter: fileFilter,
});

export const uploadProduct = multer({
  storage: productStorage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  // fileFilter: fileFilter,
});

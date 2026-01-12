import multer from "multer";

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/users");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const uploadUser = multer({
  storage: userStorage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: fileFilter,
});

export const uploadProduct = multer({
  storage: productStorage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: fileFilter,
});

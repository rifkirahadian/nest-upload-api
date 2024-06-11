import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Define file filter for supported file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|pdf|mp4/;
  const ext = extname(file.originalname).toLowerCase();
  if (!allowedTypes.test(ext)) {
    return cb(new BadRequestException('Unsupported file type'), false);
  }
  cb(null, true);
};

// Define storage options
const storage = diskStorage({
  destination: './uploads', // Directory to store uploaded files
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + extname(file.originalname));
  },
});

export { storage, fileFilter };

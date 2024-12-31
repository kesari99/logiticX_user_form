import multer from 'multer';
import path from 'path';

// Multer storage
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder where files will be temporarily stored
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname) // Corrected `cb`
        );
    },
});

// File filter to allow only images
export const checkFileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf',
       
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } 
     else {
        cb(new Error('Not an image! Please upload an image.'));
    }
};

// File size limit: 5 MB
export const fileSize = 5 * 1024 * 1024;

// Multer upload instance
export const upload = multer({
    storage,
    limits: { fileSize },
    fileFilter: checkFileFilter,
});

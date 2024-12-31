import cloudinary from "../config/cloudinary.mjs";

export const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder:"uploads", 
        });

        return {
            url: result.secure_url, 
            publicId: result.public_id, 
        };
    } catch (error) {
        console.error("Error while uploading image to Cloudinary:", error.message);
        throw new Error(`Image upload failed: ${error.message}`);
    }
};

export const deleteImage = async (publicId) => {
    try {
        const result = cloudinary.uploader.destroy(publicId);
        return result;
    
    } catch (error) {
        console.error("Error while deleting image from Cloudinary:", error.message);
        throw new Error(`Image deletion failed: ${error.message}`);
        
    }
   
}

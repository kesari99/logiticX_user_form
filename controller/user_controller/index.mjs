import mongoose from "mongoose";
import User from "../../models/user_model/index.mjs";
import { errorHandler } from "../../utils/error.mjs";
import { deleteImage, uploadImage } from "../../helper/cloudinaryHelper.mjs";


export const createUser = async (req, res, next) => {
    try {
        const { name, email, aadharId, phone } = req.body;
        const { aadharImg, aadharDoc } = req.files;

        const aadharImage = await uploadImage(aadharImg[0].path);
        const aadharDocument = await uploadImage(aadharDoc[0].path);

        const newUser = new User({
            name,
            email,
            aadharId,
            phone,
            aadharImg: {
                publicId: aadharImage.publicId,
                secureUrl: aadharImage.url,
            },
            aadharDoc: {
                publicId: aadharDocument.publicId,
                secureUrl: aadharDocument.url,
            },
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser,
        });

    } catch (err) {
        next(err);
    }
};



export const getAllUser = async (req, res, next) => {
    try{

        


        const users = await User.find({})
        res.status(200).json({
            success:true,
            message:"All users",
            data:users
        })


    } catch(err){
        next(err)

    }
}

export const getEachUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id)   

        if(!user) return next(errorHandler(404,'User not found'))



        res.status(200).json({
            success:true,
            message:"User found",
            data:user
        })


    } catch(err){
        next(err)

    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }

        console.log('Files:', req.files);
        console.log('Body:', req.body);

        if (req.files?.aadharImg?.[0]) {
            if (user.aadharImg?.publicId) {
                await deleteImage(user.aadharImg.publicId);  
            }
            const aadharImage = await uploadImage(req.files.aadharImg[0].path);
            userData.aadharImg = {
                publicId: aadharImage.publicId,
                secureUrl: aadharImage.url,
            };
        }

        if (req.files?.aadharDoc?.[0]) {
            if (user.aadharDoc?.publicId) {
                await deleteImage(user.aadharDoc.publicId);  
            }
            const aadharDocument = await uploadImage(req.files.aadharDoc[0].path);
            userData.aadharDoc = {
                publicId: aadharDocument.publicId,
                secureUrl: aadharDocument.url,
            };
        }

        
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (err) {
        console.error('Error in updateUser:', err);
        next(err);
    }
};


export const deleteUser = async (req , res, next) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);


        if(!user) return next(errorHandler(400, 'User not found'))

        if(user.aadharImg.publicId){
            await deleteImage(user.aadharImg.publicId)
        }

        if(user.aadharDoc.publicId){
            await deleteImage(user.aadharDoc.publicId)
        }

        await User.findByIdAndDelete(userId)

        res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })
        
    } catch (error) {
        next(error)
        
    }
}
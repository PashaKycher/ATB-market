import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloudinary = async (image) => {
    // create buffer of image
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());
    // upload image to cloudinary
    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "blinkit" }, (error, result) => {
            if (error) {
                reject(error);
            }
            return resolve(result);
        }).end(buffer);
    })
    return uploadImage;
}

export default uploadImageCloudinary

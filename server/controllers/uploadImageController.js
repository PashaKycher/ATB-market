import uploadImageClodinary from "../utils/uploadImageClodinery.js";

const uploadImageController = async(req, res) => {
    try {
        const file = req.file;
        const upload = await uploadImageClodinary(file);
        return res.status(200).json({
            message: "Image uploaded successfully",
            data: upload,
            succsess: true,
            error: false,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}

export default uploadImageController
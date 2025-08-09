import AddressModel from "../models/addressModel.js";
import UserModel from "../models/userModel.js";

// add address
export async function addAddressController(req, res) {
    try {
        const { country, city, state, pincode, street, bilding, address_line, mobile } = req.body;
        // check if data is valid
        if (!country || !city || !state || !pincode || !street || !bilding || !mobile) {
            return res.status(400).json({
                message: "Provide all details",
                succsess: false,
                error: true
            });
        }
        // get user id from request object
        const userId = req.userId; // midedleware (auth.js)
        // check if user exists
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        // create address
        const addAddress = new AddressModel({ user_id: userId, country, city, state, pincode, street, bilding, address_line, mobile });
        // save address
        const saveAddress = await addAddress.save();
        // check if address is saved
        if (!saveAddress) {
            return res.status(500).json({
                message: "Address not saved",
                succsess: false,
                error: true
            });
        }
        // add address to user
        await UserModel.updateOne({ _id: userId }, { $push: { address: saveAddress._id } });
        // return response  
        return res.status(200).json({
            message: "Address saved",
            succsess: true,
            error: false,
            data: saveAddress
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
//  delete address
export async function deleteAddressController(req, res) {
    try {
        const { addressId } = req.body;
        // get user id from request object
        const userId = req.userId; // midedleware (auth.js)
        // check if user exists
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        // delete address
        const deleteAddress = await AddressModel.deleteOne({ _id: addressId, user_id: userId  });
        // delete address from user
        await UserModel.updateOne({ _id: userId }, { $pull: { address: addressId } });
        // return response  
        return res.status(200).json({
            message: "Address deleted",
            succsess: true,
            error: false,
            data: deleteAddress
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// update address
export async function updateAddressController(req, res) {
    try {
        const { country, city, state, pincode, street, bilding, address_line, mobile } = req.body.dataAddress;
        // check if data is valid
        if (!country || !city || !state || !pincode || !street || !bilding || !mobile) {
            return res.status(400).json({
                message: "Provide all details",
                succsess: false,
                error: true
            });
        }
        // get address id
        const { addressId } = req.body;
        // get user id from request object
        const userId = req.userId; // midedleware (auth.js)
        // check if user exists
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        // update address
        const updateAddress = await AddressModel.updateOne({ _id: addressId, user_id: userId }, { country, city, state, pincode, street, bilding, address_line, mobile });
        // check if address is updated
        if (!updateAddress) {
            return res.status(500).json({
                message: "Address not updated",
                succsess: false,
                error: true
            });
        }
        // return response  
        return res.status(200).json({
            message: "Address updated",
            succsess: true,
            error: false,
            data: updateAddress
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// get all address
export async function getAllAddressController(req, res) {
    try {
        // get user id from request object
        const userId = req.userId; // midedleware (auth.js)
        // check if user exists
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        // get all address
        const getAllAddress = await AddressModel.find({ user_id: userId }).sort({createdAt: -1});
        // check if address is found
        if (!getAllAddress) {
            return res.status(500).json({
                message: "Address not found",
                succsess: false,
                error: true
            });
        }
        // return response  
        return res.status(200).json({
            message: "Address get successfully",
            succsess: true,
            error: false,
            data: getAllAddress
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
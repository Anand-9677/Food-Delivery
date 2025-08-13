import userModel from "../models/UserModel.js"

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.userId, {cartData});
        res.json({success: true, message: "Added to Cart"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error});
    }
}

// Removes item from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.userId, {cartData});
        res.json({success: true, message: "Removed from Cart"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        if (!userData) {
            return res.json({success: false, message: "User not found"});
        }
        let cartData = userData.cartData;
        res.json({success: true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message || "Error"});
    }
}

export {addToCart, removeFromCart, getCart};
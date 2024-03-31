const Cart = require("../models/Cart");
const User = require("../models/User");

exports.addToCart = async (req,res) => {
    try{
        // fetch data
        const {courseId} = req.body;
        const id = req.user.id;

        // validation
        if(!courseId || !id){
            return res.status(400).json({
                success: false,
                message: "Please enter all details",
            });
        }

        // check course in cart
        const cartDetails = await Cart.findOne({user: id});
        if(cartDetails.cartItems.includes(courseId)) {
            return res.status(401).json({
                success: false,
                message: "Course already in cart",
            });
        }

        // update cart
        cartDetails.cartItems.push(courseId);
        await cartDetails.save();

        const updatedCart = await Cart.findOne({user: id}).populate({
            path: "cartItems",
            populate: {
                path: "ratingAndReviews",
            }
        });

        // total amount
        let total = 0;
        updatedCart.cartItems.forEach((item) => {
            total += item.price;
        });

        // return successfull respone
        res.status(200).json({
            success: true,
            data: {
                updatedCart,
                total,
            },
            message: "Course added to cart",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to add course to cart, please try again",
        });
    }
}

exports.removeFromCart = async (req,res) => {
    try{
        // fetch data
        const {courseId} = req.body;
        const id = req.user.id;

        // validation
        if(!courseId || !id){
            return res.status(400).json({
                success: false,
                message: "Please enter all details",
            });
        }

        // check course in cart
        const cartDetails = await Cart.findOne({user: id});
        if(!cartDetails.cartItems.includes(courseId)) {
            return res.status(401).json({
                success: false,
                message: "Course is not present in cart",
            });
        }

        // update cart
        cartDetails.cartItems.pull(courseId);
        await cartDetails.save();

        const updatedCart = await Cart.findOne({user: id}).populate({
            path: "cartItems",
            populate: {
                path: "ratingAndReviews",
            }
        });

        // total amount
        let total = 0;
        updatedCart.cartItems.forEach((item) => {
            total += item.price;
        });

        // return successfull respone
        res.status(200).json({
            success: true,
            data: {
                updatedCart,
                total,
            },
            message: "Course removed from cart",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to remove course from cart, please try again",
        });
    }
}

exports.getCartData = async (req,res) => {
    try{
        // fetch data
        const id = req.user.id;

        // validation
        const userData = await User.findById(id);
        if(!userData){
            return res.status(400).json({
                success: false,
                message: "User is not found",
            });
        }

        // fethc cart data
        const cartDetails = await Cart.findOne({user: id}).populate({
            path: "cartItems",
            populate: {
                path: "ratingAndReviews",
            }
        });

        // total amount
        let total = 0;
        cartDetails.cartItems.forEach((item) => {
            total += item.price;
        });

        // return successfull respone
        res.status(200).json({
            success: true,
            data: {
                cartDetails,
                total,
            },
            message: "Cart data fetch successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to fetch cart, please try again",
        });
    }
}

exports.resetCartData = async (req,res) => {
    try{
        // fetch data
        const {courses} = req.body;
        const id = req.user.id;

        // validation
        const userData = await User.findById(id);
        if(!userData){
            return res.status(400).json({
                success: false,
                message: "User is not found",
            });
        }

        // fetch cart data
        const cartDetails = await Cart.findOne({user: id});
        for(const item of cartDetails.cartItems) {
            await Cart.findByIdAndUpdate(
                {_id: cartDetails._id},
                { $pull: {cartItems: item} }, 
                {new: true},
            );
        }

        // return successfull respone
        res.status(200).json({
            success: true,
            message: "Cart reset successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to reset cart, please try again",
        });
    }
}
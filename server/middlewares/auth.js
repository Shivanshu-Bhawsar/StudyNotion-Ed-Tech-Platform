const jwt = require("jsonwebtoken");

exports.auth = (req,res,next) => {
    try{
        // fetch token and check its value
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        if(!token || token === undefined){
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("Payload in auth: ", payload);
            req.user = payload;
        } 
        catch(err){
            return res.status(401).json({
                success: false,
                error: err.message,
                message: "Token is invalid",
            });
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success: false,
            error: err.message,
            message: "Unable to Verify User, please try again",
        });
    }
}

exports.isStudent = (req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Students only",
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "User role can't be verified, please try again",
        });
    }
}

exports.isInstructor = (req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor only",
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "User role can't be verified, please try again",
        });
    }
}

exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only",
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "User role can't be verified, please try again",
        });
    }
}
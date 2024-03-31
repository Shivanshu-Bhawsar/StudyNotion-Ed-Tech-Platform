const Category = require("../models/Category");

exports.createCategory = async (req,res) => {
    try{
        // fetch data from req body
        const {name, description} = req.body;

        // validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "Please enter all details",
            });
        }

        const check = await Category.findOne({name});
        if(check) {
            return res.status(400).json({
                success: false,
                message: "Category already exists with same name",
            });
        }

        // create entry in DB
        const categoryDetails = await Category.create({name, description});
        // console.log("CategoryDetails: ", categoryDetails);

        // return response
        res.status(200).json({
            success: true,
            message: "Category Created successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to Create Category, please try again",
        });
    }
}

exports.showAllCategories = async (req,res) => {
    try{
        // fetch all Category from DB
        const allCategory = await Category.find({}, {name: true, description: true});
        
        // return response
        res.status(200).json({
            success: true,
            data: allCategory,
            message: "All Categories returned successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to Show All Categories, please try again",
        });
    }
}

// not used
exports.getCategoryDetails = async (req,res) => {
    try{
        // fetch category by id
        const { categoryId } = req.body;
        const categoryDetails = await Category.findById(categoryId)
        .populate({
            path: "courses",
            select: "_id courseName",
        }).exec();
        
        // return response
        res.status(200).json({
            success: true,
            categoryDetails,
            message: "Category fetched successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to Category Details, please try again",
        });
    }
}

exports.categoryPageDetails = async (req,res) => {
    try{
        // fetch data
        const {categoryId} = req.body;

        // get courses for the specified category
        const selectedCategory = await Category.findById(categoryId).populate({
            path: "courses",
            populate: {
                path: "instructor",
                select: "firstName lastName"
            }
        }).exec();

        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // get courses for different categories
        const differentCategories = await Category.find({_id: {$ne: categoryId}}).populate({
            path: "courses",
            populate: {
                path: "instructor",
                select: "firstName lastName"
            }
        }).exec();

        // fetch courses from all categories
        const selectedCourses = selectedCategory.courses;

        const differentCourses = [];
        for(const category of differentCategories) {
            differentCourses.push(...category.courses);
        }
        
        const allCourses2 = [];
        allCourses2.push(...selectedCourses);
        allCourses2.push(...differentCourses);

        const mostSellingCourses = allCourses2.sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length).slice(0, 10);

        // return response
        res.status(200).json({
            success: true,
            data: {
                selectedCourses,
                differentCourses,
                mostSellingCourses,
            },
            message: "Category Page Details fetched successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to show Category Page Details, please try again",
        });
    }
}

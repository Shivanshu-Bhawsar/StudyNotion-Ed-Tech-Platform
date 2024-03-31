const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

exports.createSubSection = async (req,res) => {
    try{
        // fetch data
        const {sectionId, title, description, courseId} = req.body;

        // extract video file
        const video = req.files.videoFile;

        // validation
        if(!sectionId || !title || !description || !video || !courseId){
            return res.status(400).json({
                success: false,
                message: "createSubSection All Fields are Required",
            });
        }

        // upload video to cloudinary
        const uploadDetails = await uploadFileToCloudinary(video, process.env.FOLDER_VIDEO, 50);

        // create sub-section
        const subSectionDetails = await SubSection.create({title, timeDuration: uploadDetails.duration, description, videoUrl: uploadDetails.secure_url});

        // update section with this subsection ObjectId
        await Section.findByIdAndUpdate(sectionId, {$push:{subSection: subSectionDetails._id}}, {new:true})
                                                            .populate("subSection").exec();

        // fetch updated course
        const updatedCourse = await Course.findById(courseId).populate({
                path: "courseContent", 
                populate: {
                    path: "subSection",
                }
            }
        ).exec();

        // return response
        res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Sub-Section Created successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to create Sub-Section, please try again",
        });
    }
}

exports.updateSubSection = async (req,res) => {
    try{
        // fetch data
        const {subSectionId, title, description, courseId} = req.body;

        // validation
        if(!subSectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "updateSubSection All Fields are Required",
            });
        }

        // extract video file and update it
        let video;
        let uploadDetails;
        if(req.files) {
            video = req.files.videoFile;
            uploadDetails = await uploadFileToCloudinary(video, process.env.FOLDER_VIDEO, 50);
        }
        
        // update subSection
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId, 
            {
                title: title || SubSection.title, 
                description: description || SubSection.description,
                timeDuration: (uploadDetails && uploadDetails.duration) || SubSection.timeDuration,  
                videoUrl: (uploadDetails && uploadDetails.secure_url) || SubSection.videoUrl,
            }, 
            {new:true},
        );

        // fetch updated course
        const updatedCourse = await Course.findById(courseId).populate({
                path: "courseContent", 
                populate: {
                    path: "subSection",
                }
            }
        ).exec();

        // return response
        res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Sub-Section Updated successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to update Sub-Section, please try again",
        });
    }
}

exports.deleteSubSection = async (req,res) => {
    try{
        // fetch data
        const {subSectionId, sectionId, courseId} = req.body;

        // data validation
        if(!subSectionId || !sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "deleteSubSection All Fields are Required",
            });
        }

        // delete the entry from the section schema & fetch it
        await Section.findByIdAndUpdate(
            {_id: sectionId},
            { $pull: {subSection: subSectionId} },
            {new:true},
        ).populate("subSection").exec();;

        // delete subSection 
        await SubSection.findByIdAndDelete(subSectionId);

        // fetch updated course
        const updatedCourse = await Course.findById(courseId).populate({
                path: "courseContent", 
                populate: {
                    path: "subSection",
                }
            }
        ).exec();

        // return response
        res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Sub-Section Deleted successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to delete Sub-Section, please try again",
        });
    }
}


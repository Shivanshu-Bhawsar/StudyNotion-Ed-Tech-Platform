const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

exports.createSection = async (req,res) => {
    try{
        // fetch data
        const {sectionName, courseId} = req.body;

        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "createSection All Fields are Required",
            });
        }

        // create section
        const newSection = await Section.create({sectionName});

        // update course with section ObjectId
        const updatedCourse = await Course.findByIdAndUpdate(
          courseId,
          { $push: { courseContent: newSection._id } },
          { new: true }
        )
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec();

        // return response
        res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Section Created successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to create Section, please try again",
        });
    }
}

exports.updateSection = async (req,res) => {
    try{
        // fetch data
        const {sectionName, sectionId, courseId} = req.body;

        // data validation
        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "updateSection All Fields are Required",
            });
        }

        // update data
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        // update course with section ObjectId
        const updatedCourse = await Course.findById(courseId)
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec();

        // return response
        res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Section Updated successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to update Section, please try again",
        });
    }
}

exports.deleteSection = async (req,res) => {
    try{
        // fetch data -> use req.params
        const {sectionId, courseId} = req.body;

        // data validation
        if(!sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "deleteSection All Fields are Required",
            });
        }

        // delete the entry from the course schema
        await Course.findByIdAndUpdate(courseId, {$pull: {courseContent: sectionId}}, {new:true});

        //delete sub section
        const section = await Section.findById(sectionId);
		await SubSection.deleteMany({_id: {$in: section.subSection}});

        // delete data
        await Section.findByIdAndDelete(sectionId);

        //find the updated course and return 
		const updatedCourse = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		}).exec();

        // return response
        res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Section Deleted successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to delete Section, please try again",
        });
    }
}


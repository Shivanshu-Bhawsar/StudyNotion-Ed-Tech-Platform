import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import RenderSteps from './RenderSteps';
import { resetCourseState } from '../../../../slices/courseSlice';

const AddCourse = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(resetCourseState());
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="custom-loader"></div>;
    }

  return (
    <div className='mx-auto w-11/12 max-w-[1000px] pb-7 md:pb-0'>
        <div className='w-full flex items-start gap-x-7'>
            <div className='w-full md:w-[60%] flex flex-col'>
                <h1 className='mx-auto md:mx-0 mb-14 text-3xl font-medium text-richblack-5'>Add Course</h1>
                <div className='sm:mx-auto'>
                    <RenderSteps/>
                </div>
            </div>
            <div className='sticky top-10 hidden lg:block max-w-[500px] flex-1 rounded-md border border-richblack-700 bg-richblack-800 p-6'>
                <p className='mb-8 text-lg text-richblack-5'>⚡ Course Upload Tips</p>
                <ul className='ml-5 list-item list-disc space-y-4 text-xs text-richblack-5'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create and organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default AddCourse;
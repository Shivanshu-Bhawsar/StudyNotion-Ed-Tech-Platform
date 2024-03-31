import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ControlBar, Player } from "video-react";
// import 'video-react/dist/video-react.css'; // import css
import {
  BigPlayButton,
  LoadingSpinner,
  PlaybackRateMenuButton,
  ForwardControl,
  ReplayControl,
  CurrentTimeDisplay,
  TimeDivider,
} from "video-react";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";
import { BiSkipPreviousCircle } from "react-icons/bi";
import { BiSkipNextCircle } from "react-icons/bi";
import { MdOutlineReplayCircleFilled } from "react-icons/md";

const VideoDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, sectionId, subsectionId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const playerRef = useRef(null);
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnd, setVideoEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificData = async () => {
      if (!courseSectionData.length) return;

      if (!courseId && !sectionId && !subsectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredSection = courseSectionData?.filter(
          (section) => section._id === sectionId
        );
        const filteredSubsection = filteredSection?.[0]?.subSection?.filter(
          (subsection) => subsection._id === subsectionId
        );
        setVideoData(filteredSubsection?.[0]);
        setVideoEnd(false);
      }
    };
    setVideoSpecificData();
  }, [courseSectionData, courseEntireData, sectionId, subsectionId]);

  const isFirstLecture = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubsectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (subsection) => subsection._id === subsectionId
    );

    if (currentSubsectionIndex === 0 && currentSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastLecture = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubsectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (subsection) => subsection._id === subsectionId
    );

    if (
      currentSectionIndex === courseSectionData?.length - 1 &&
      currentSubsectionIndex === courseSectionData[currentSectionIndex]?.subSection?.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const nextLecture = () => {
    // if (isLastLecture()) {
    //   return;
    // }
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubsectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (subsection) => subsection._id === subsectionId
    );

    if (
      currentSubsectionIndex === courseSectionData[currentSectionIndex]?.subSection.length - 1
    ) {
      // different section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id;
      const nextSubsectionId = courseSectionData[currentSectionIndex + 1]?.subSection[0]._id;
      navigate(
        `/dashboard/enrolled-courses/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`
      );
    } else {
      // same section ki next video
      const nextSubsectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubsectionIndex + 1
        ]._id;
      navigate(
        `/dashboard/enrolled-courses/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubsectionId}`
      );
    }
  };

  const previousLecture = () => {
    // if (isFirstLecture()) {
    //   return;
    // }
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubsectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (subsection) => subsection._id === subsectionId
    );

    if (currentSubsectionIndex === 0) {
      // different section ki last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubsectionId =
        courseSectionData[currentSectionIndex - 1]?.subSection[
          courseSectionData[currentSectionIndex - 1].subSection.length - 1
        ]._id;
      navigate(
        `/dashboard/enrolled-courses/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubsectionId}`
      );
    } else {
      // same section ki previous video
      const prevSubsectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubsectionIndex - 1
        ]._id;
      navigate(
        `/dashboard/enrolled-courses/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubsectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      {
        userId: user._id,
        courseId: courseId,
        subSectionId: subsectionId,
      },
      token
    );
    if(res) {
      dispatch(updateCompletedLectures(subsectionId));
    }
    setLoading(false);
  };

  return (
    <div className="md:w-[calc(100vw-320px)] w-screen p-3">
      {!videoData ? (
        <h1>No Data Found</h1>
      ) : (
        <Player
          className="w-full relative"
          ref={playerRef}
          src={videoData.videoUrl}
          aspectRatio="16:9"
          fluid
          autoPlay={false}
          onEnded={() => setVideoEnd(true)}
        >
          <BigPlayButton position="center" />
          <LoadingSpinner />
          <ControlBar>
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
            <ReplayControl seconds={5} order={7.1} />
            <ForwardControl seconds={5} order={7.2} />
            <TimeDivider order={4.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
          </ControlBar>

          {videoEnd && (
            <div className="flex justify-center items-center">
              {!completedLectures.includes(subsectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={() => handleLectureCompletion()}
                  text={!loading ? "Mark as Completed" : "Loading..."}
                />
              )}
              {!isFirstLecture() && (
                <div className=" z-20 left-0 top-1/2 transform -translate-y-1/2 absolute m-5">
                  <BiSkipPreviousCircle
                    disabled={loading}
                    onClick={previousLecture}
                    className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90"
                  />
                  {/* <button onClick={previousLecture} className='bg-blue-500 text-white px-4 py-2 rounded-md'>previous Lecture</button> */}
                </div>
              )}
              {!isLastLecture() && (
                <div className=" z-20 right-4 top-1/2 transform -translate-y-1/2 absolute m-5">
                  <BiSkipNextCircle
                    disabled={loading}
                    onClick={nextLecture}
                    className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90"
                  />
                  {/* <button onClick={nextLecture} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Next Lecture</button> */}
                </div>
              )}
              {
                <MdOutlineReplayCircleFilled
                  disabled={loading}
                  onClick={() => {
                    playerRef.current.seek(0);
                    playerRef.current.play();
                    setVideoEnd(false);
                  }}
                  className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90 absolute top-1/2 z-20"
                />
              }
            </div>
          )}
        </Player>
      )}

      {/* video title and desc */}
      <div className="mt-5">
        <h1 className="text-2xl font-bold text-richblack-25">
          {videoData?.title}
        </h1>
        <p className="text-gray-500 text-richblack-100">
          {videoData?.description}
        </p>
      </div>
    </div>
  );
};

export default VideoDetails;

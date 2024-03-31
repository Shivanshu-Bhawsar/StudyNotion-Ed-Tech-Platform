import React from "react";
import ContactUsForm from "../../contactUs/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto w-11/12 max-w-maxContent">
      <div className="border border-richblack-600 rounded-xl p-7 lg:p-[52px] flex gap-16 flex-col">
        <div>
          <h1 className="text-center text-4xl font-semibold text-richblack-5">
            Get in Touch
          </h1>
          <p className="text-center text-base font-medium text-richblack-300 mt-3">
            We'd love to here for you, Please fill out this form.
          </p>
        </div>
        <div>
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;

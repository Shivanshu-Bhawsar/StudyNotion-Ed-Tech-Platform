import { apiConnector } from "../apiConnector";
import { studentEndpoints, profileEndpoints } from "../apis";
import rzplogo from "../../assets/Images/rzp.png";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";
import { toast } from "react-hot-toast";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse (token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Please wait while we redirect you to payment gateway", {
      position: "bottom-center",
      autoClose: false,
    });
    
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            toast.dismiss(toastId);
            return;
        }

        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses}, {
            Authorization: `Bearer ${token}`,
        });
        if(!orderResponse.data.success) {
            toast.error(orderResponse.data.message);
            // console.log("buyCourse -> orderResponse", orderResponse);
            toast.dismiss(toastId);
            return;
        }
        // console.log("buyCourse -> orderResponse: ", orderResponse);

        // console.log("API KEY: ", process.env.REACT_APP_RAZORPAY_KEY_ID);
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "Study Notion",
            description: "Thank you for purchasing the course",
            image: rzplogo,
            prefill: {
                name: userDetails?.firstName + " " + userDetails?.lastName,
                email: userDetails?.email,
            },
            handler: async function (response) {
                // console.log("buyCourse -> response: ", response);
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
                verifypayment(response, courses, token, navigate, dispatch);
            },
            theme: {
                color: "#686CFD",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Payment Failed");
            // console.log("BUY COURSE PAYMENT RES: ", response);
        });
    } catch (error) {
        toast.error("Something went wrong");
        // console.log("buyCourse -> error: ", error);
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail (response, amount, token) {
    try {
        const res = await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API,{
            amount,
            paymentId:response.razorpay_payment_id,
            orderId:response.razorpay_order_id,
        }, {
            Authorization: `Bearer ${token}`,
        });
        if (!res.success) {
            // console.log("sendPaymentSuccessEmail ERROR: ", res.message);
            toast.error(res.message);
        }
    }
    catch(err) {
        // console.log("PAYMENT SUCCESS EMAIL ERROR: ", err.message);
        toast.error(err.message);
    }
}

async function verifypayment (response, courses, token, navigate, dispatch,) {
    const toastId = toast.loading("Please wait while we verify your payment");
    dispatch(setPaymentLoading(true));
    try{
        const res = await apiConnector("POST", COURSE_VERIFY_API,{
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            courses: courses,
        }, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("verifypayment -> res: ", res);

        if (!res.data.success) {
            toast.error(res.message);
            toast.dismiss(toastId);
            return;
        }

        const result = await apiConnector(
          "PUT",
          profileEndpoints.RESET_CART_DATA_API,
          {courses},
          {
            Authorization: `Bearer ${token}`,
          }
        );

        if (!result.data.success) {
            toast.error(result.message);
            toast.dismiss(toastId);
            return;
        }

        toast.success("Payment Successfull");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch(err){
        toast.error("Could not Verify Payment");
        // console.log("PAYMENT VERIFY ERROR: ", err.message);
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}

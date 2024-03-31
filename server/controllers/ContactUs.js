const mailSender = require("../utils/mailSender");

exports.contactUs = async (req,res) => {
    try{
        // fetch data
        const { firstName, lastName, email, message, phoneNo } = req.body;

        // validation
        if(!firstName || !email || !message) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }

        // sending contact us mail
        try{
            const data = {
                firstName,
                lastName: `${lastName ? lastName : "null"}`,
                email,
                message,
                phoneNo: `${phoneNo ? phoneNo : "null"}`,
            };

            const info = await mailSender(
                process.env.CONTACT_MAIL,
                "Enquery Mail",
                `<html>
                    <body>
                        ${Object.keys(data).map((key) => {
                            return `<p>${key} : ${data[key]}</p>`;
                        })}
                    </body>
                </html>`
            );
            if(info) {
                return res.status(200).json({
                    success: true,
                    message: "Your message has been sent successfully",
                });
            } else{
                return res.status(403).json({
                    success: false,
                    message: "Something went wrong",
                });
            }
        } 
        catch(error) {
            return res.status(403).json({
                success: false,
                error: error.message,
                message: "Something went wrong",
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to send Contact Us mail, please try again",
        });
    }
}
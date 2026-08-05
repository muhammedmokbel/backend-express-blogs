const nodemailer = require('nodemailer'); 



const createTransport = () => 
     nodemailer.createTransport({
        host : process.env.EMAIL_HOST, 
        port : process.env.EMAIL_HOST_PORT, 
        auth : {
            user : process.env.EMAIL_HOST_USERNAME, 
            pass : process.env.EMAIL_HOST_PASSWORD
        }
    })


const sendEmail = async ({from , to , subject,text}) => {
    try {
        const transporter = createTransport(); 
        const mailSenderResponse = await transporter.sendMail({
            from , 
            to, 
            subject , 
            text
        })
    }
    catch(err)
    {
        console.log("mailSenderResponse error", err)
    }


}

module.exports = sendEmail; 
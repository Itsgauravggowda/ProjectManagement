import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async(options)=>{
    const mailGenerator =new Mailgen({
        theme: "default",
        product:{
            name: "Task Manager",
            link:"https://taskmangelink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    
    const emailHtml = mailGenerator.generate(options.mailgenContent);


    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth:{
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })


    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }
    try{
        await transporter.sendEmail(mail)
    }
    catch(error){
        console.error("Email Service Failed!!!");
        console.error("Error: ",error);
        
        
    }
}




const emailVerificationMailgenContent = (username, verificationURL)=>{
    return{
        body:{
            name: username,
            intro:"Welcome to our App! we're excited to have you on board",
            action:{
                instruction: "To verify your email please click the following button",
                button:{
                    color:"#57072e",
                    text: "Verify your email",
                    link: verificationURL
                },
            },
            outro: "Need help, or have questions? Just reply to this emaill, we'd love to help."
        }
    }
}

const ForgotPasswordMailgenContent = (username, passwordResetURL)=>{
    return{
        body:{
            name: username,
            intro:"We got a request to reset the password of your account",
            action:{
                instruction: "To reset your passsword please click the following button",
                button:{
                    color:"#812953",
                    text: "Reset Password",
                    link: passwordResetURL
                },
            },
            outro: "If you did not initate the password reset! Just reply to this emaill, we'd love to help."
        }
    }
}

export {emailVerificationMailgenContent, ForgotPasswordMailgenContent}
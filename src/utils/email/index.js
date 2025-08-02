import nodemailer from "nodemailer";
export async  function sendMail({to,subject,html}){
const transporter=nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"julianageorgeeshak@gmail.com",
        pass:"hvlm ttsw fchg tyxf"
    }
});
await transporter.sendMail({
    from:"'saraha App'<julianageorgeeshak@gmail.com>",
    to,
    subject,
    html
})
}
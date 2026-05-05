const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.AUTH_EMAIL,
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Your OTP verification code",
    html: `<!doctypehtml><html lang=en><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><meta content="ie=edge"http-equiv=X-UA-Compatible><title>Static Template</title><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"rel=stylesheet><body style=margin:0;font-family:Poppins,sans-serif;background:#fff;font-size:14px><div style="max-width:680px;margin:0 auto;padding:45px 30px 60px;background:#f4f7ff;background-image:url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);background-repeat:no-repeat;background-size:800px 452px;background-position:top center;font-size:14px;color:#434343"><header><table style=width:100%><tr style=height:0><td>BRAND Name<td style=text-align:right></table></header><main><div style="margin:0;margin-top:70px;padding:92px 30px 115px;background:#fff;border-radius:30px;text-align:center"><div style="width:100%;max-width:489px;margin:0 auto"><h1 style=margin:0;font-size:24px;font-weight:500;color:#1f1f1f>Your OTP</h1><p style=margin:0;margin-top:17px;font-weight:500;letter-spacing:.56px>Thank you for choosing Brand. To complete your verification, please use the One-Time Password (OTP) below:<p style=margin:0;margin-top:60px;font-size:40px;font-weight:600;letter-spacing:25px;color:#ba3d4f>${otp}</div></div><p style="max-width:400px;margin:0 auto;margin-top:90px;text-align:center;font-weight:500;color:#8c8c8c">Need help? Ask at <a href=mailto:archisketch@gmail.com style=color:#499fb6;text-decoration:none>${process.env.AUTH_EMAIL}</a> or visit our <a href=""style=color:#499fb6;text-decoration:none target=_blank>Help Center</a></main><footer style="width:100%;max-width:490px;margin:20px auto 0;text-align:center;border-top:1px solid #e6ebf1"><p style=margin:0;margin-top:40px;font-size:16px;font-weight:600;color:#434343>Brand Name<p style=margin:0;margin-top:8px;color:#434343>Address , Dhaka, Bangladesh.<div style=margin:0;margin-top:16px><a href=""style=display:inline-block target=_blank><img alt=Facebook src=https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook width=36px> </a><a href=""style=display:inline-block;margin-left:8px target=_blank><img alt=Instagram src=https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram width=36px></a><a href=""style=display:inline-block;margin-left:8px target=_blank><img alt=Twitter src=https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter width=36px> </a><a href=""style=display:inline-block;margin-left:8px target=_blank><img alt=Youtube src=https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube width=36px></a></div><p style=margin:0;margin-top:16px;color:#434343>Copyright © 2025 Company. All rights reserved.</footer></div>`, // HTML body
  });
};

module.exports = sendEmail;

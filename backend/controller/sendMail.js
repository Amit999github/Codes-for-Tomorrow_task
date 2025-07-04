const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports.sendmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, message: "email is required" });

  const token = jwt.sign({ email }, process.env.TOKEN_KEY, { expiresIn: "5m" });
  const link = `${process.env.Client_URL}/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Your Password",
    html: `<p>You requested a password reset. Click the link below:</p>
      <a href="${link}">${link}</a>
      <p>This link is valid for 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Reset link sent to ${email}`);
  next();
};

module.exports.verifyTokens = (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    // console.log(token ,decoded)
    res.json({ valid: true, email: decoded.email });
  } catch (err) {
    res.status(400).json({ valid: false, message: "Invalid or expired token" });
  }
};

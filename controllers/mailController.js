const nodemailer = require('nodemailer');

exports.contactStartup = async (req, res) => {
  const { investorName, investorEmail, startupName, startupEmail } = req.body;

  if (!investorName || !investorEmail || !startupName || !startupEmail) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Create transporter using Gmail SMTP
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your app Gmail address
      pass: process.env.GMAIL_PASS, // App password
    },
  });

  const mailOptions = {
    from: investorEmail, // From investor's email
    to: startupEmail, // To startup's email
    subject: '[PitchPal] Investor Contact Request',
    text: `Hi ${startupName},\n\nInvestor ${investorName} (${investorEmail}) wants to contact you via PitchPal.\n\nBest,\nPitchPal Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email.' });
  }
}; 
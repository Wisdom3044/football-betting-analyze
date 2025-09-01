// api/analyze.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Your football analysis logic here
    const matches = await fetchRealMatches();
    const selectedMatches = analyzeMatches(matches);
    const report = generateReport(selectedMatches);
    
    // Send email
    await sendEmail(report);
    
    res.status(200).json({ 
      success: true, 
      message: 'Analysis complete, email sent',
      matches: selectedMatches.length 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function sendEmail(report) {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'wisdomazubuike33@gmail.com',
    subject: `Daily Roll-Over Betting Picks - ${new Date().toISOString().split('T')[0]}`,
    html: generateEmailHTML(report)
  };

  await transporter.sendMail(mailOptions);
}

// Add your other functions here (fetchRealMatches, analyzeMatches, etc.)

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, shop_name, phone, email, location, message } = data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'sbchandran1412@gmail.com',
      subject: `New Demo Request from ${name} (${shop_name})`,
      text: `
        You have received a new demo request:

        Name: ${name}
        Shop Name: ${shop_name}
        Phone/WhatsApp: ${phone}
        Email: ${email || 'Not provided'}
        Location: ${location || 'Not provided'}
        Message: ${message || 'No message'}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Demo Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Shop Name:</strong> ${shop_name}</p>
          <p><strong>Phone/WhatsApp:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Location:</strong> ${location || 'Not provided'}</p>
          <p><strong>Message:</strong> ${message || 'No message'}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}

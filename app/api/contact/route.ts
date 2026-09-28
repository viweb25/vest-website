import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { company, phone, email, subject, message } = body;

    // Validate required fields
    if (!company || !phone || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check Zoho environment variables
    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      console.error('Zoho SMTP environment variables are missing');

      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    // Basic HTML escaping
    const escapeHtml = (value: string) => {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    const htmlBody = `
      <div style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
      ">
        <h2 style="
          color: #1D79C5;
          border-bottom: 2px solid #E8F3FA;
          padding-bottom: 8px;
        ">
          New Contact Form Submission
        </h2>

        <p>
          <strong>Company:</strong>
          ${escapeHtml(company)}
        </p>

        <p>
          <strong>Phone:</strong>
          ${escapeHtml(phone)}
        </p>

        <p>
          <strong>Customer Email:</strong>
          ${escapeHtml(email)}
        </p>

        <p>
          <strong>Subject:</strong>
          ${escapeHtml(subject)}
        </p>

        <h3 style="margin-top: 20px; color: #0B2540;">
          Message:
        </h3>

        <div style="
          background: #f9f9f9;
          padding: 15px;
          border-left: 4px solid #1D79C5;
          border-radius: 4px;
        ">
          ${safeMessage}
        </div>

        <hr style="
          margin-top: 30px;
          border: 0;
          border-top: 1px solid #eaeaea;
        " />

        <p style="font-size: 12px; color: #888;">
          This email was sent from your website's contact form.
        </p>
      </div>
    `;

    // Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"VEST Solutions Website" <${process.env.ZOHO_EMAIL}>`,
      to: 'info@vestsolution.com',
      replyTo: email,
      subject: `[Website Contact] ${subject}`,
      html: htmlBody,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        error: 'Failed to send message. Please try again later.',
      },
      { status: 500 }
    );
  }
}
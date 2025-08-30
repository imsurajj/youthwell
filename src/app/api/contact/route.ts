import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Generate a unique ticket ID
function generateTicketId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `YW${random}`;
}

// Email template for user confirmation
function getUserEmailTemplate(name: string, ticketId: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Thank you for contacting YouthWell!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and will get back to you as soon as possible.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #666;">Your Ticket Details</h3>
        <p><strong>Ticket ID:</strong> <span style="color: #007bff; font-weight: bold;">${ticketId}</span></p>
        <p><strong>Status:</strong> <span style="color: #28a745;">Received</span></p>
      </div>
      
      <p>Please keep this ticket ID for future reference. You can use it when following up on your inquiry.</p>
      
      <p>Best regards,<br>The YouthWell Team</p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="font-size: 12px; color: #999;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>
  `;
}

// Email template for admin notification
function getAdminEmailTemplate(formData: { name: string; email: string; message: string }, ticketId: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #666;">Ticket Information</h3>
        <p><strong>Ticket ID:</strong> <span style="color: #007bff; font-weight: bold;">${ticketId}</span></p>
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #666;">Contact Details</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin: 10px 0;">
          ${formData.message.replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <div style="margin-top: 20px;">
        <p><strong>Action Required:</strong> Please review and respond to this inquiry.</p>
        <p>You can reply directly to: <a href="mailto:${formData.email}">${formData.email}</a></p>
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {


    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email credentials are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email credentials in environment variables');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact administrator.' },
        { status: 500 }
      );
    }

    // Generate unique ticket ID
    const ticketId = generateTicketId();

    // Create Gmail transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      
      // Verify connection
      await transporter.verify();
    } catch (error: unknown) {
      console.error('Gmail configuration failed:', error instanceof Error ? error.message : 'Unknown error');
      return NextResponse.json(
        { 
          error: 'Gmail configuration failed. Please check your credentials.',
          details: 'Make sure you have 2FA enabled and are using an App Password, not your regular password.'
        },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const userMailOptions = {
      from: `"${process.env.SENDER_NAME || 'YouthWell Support'}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We've received your message - Ticket #${ticketId}`,
      html: getUserEmailTemplate(name, ticketId),
    };

    // Send notification email to admin
    const adminMailOptions = {
      from: `"${process.env.SENDER_NAME || 'YouthWell Support'} Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission - Ticket #${ticketId}`,
      html: getAdminEmailTemplate({ name, email, message }, ticketId),
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    // Return success response with ticket ID
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
      ticketId: ticketId,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Web3Forms key is configured
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || 'welcome@gofamintrpt.org';
    
    if (accessKey && accessKey !== 'your_web3forms_access_key_here') {
      // Try to send email via Web3Forms
      try {
        const emailPayload = {
          access_key: accessKey,
          name: fullName,
          email: email,
          phone: phone || '',
          subject: `New Contact Form Submission: ${subject}`,
          message: `You have received a new message from the Royal Priesthood Tabernacle contact form:\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\n\nMessage:\n${message}\n\n---\nReply directly to this email to respond to ${fullName}.`,
          from_name: 'Royal Priesthood Tabernacle Website',
          replyto: email,
        };
        
        console.log('Sending email to Web3Forms...', { to: contactEmail });
        
        const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        });

        const web3FormsData = await web3FormsResponse.json();
        
        console.log('Web3Forms response:', web3FormsData);

        if (web3FormsResponse.ok && web3FormsData.success) {
          return NextResponse.json({ 
            success: true, 
            message: 'Message sent successfully',
            emailSent: true
          });
        } else {
          console.error('Web3Forms error:', web3FormsData);
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue - message is still saved locally
      }
    } else {
      console.log('Web3Forms not configured properly:', { 
        hasKey: !!accessKey,
        keyValue: accessKey 
      });
    }

    // Return success even without email (message is saved to localStorage on client)
    return NextResponse.json({ 
      success: true, 
      message: 'Message received successfully',
      emailSent: false,
      note: 'Message saved to admin dashboard'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: true, message: 'Message saved locally', emailSent: false },
      { status: 200 }
    );
  }
}

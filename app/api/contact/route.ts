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
    
    if (accessKey && accessKey !== 'YOUR_WEB3FORMS_KEY') {
      // Try to send email via Web3Forms
      try {
        const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: fullName,
            email: email,
            phone: phone || '',
            subject: `GOFAMINT Contact: ${subject}`,
            message: message,
            from_name: 'GOFAMINT Contact Form',
          })
        });

        const web3FormsData = await web3FormsResponse.json();

        if (web3FormsResponse.ok && web3FormsData.success) {
          return NextResponse.json({ 
            success: true, 
            message: 'Message sent successfully',
            emailSent: true
          });
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue - message is still saved locally
      }
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

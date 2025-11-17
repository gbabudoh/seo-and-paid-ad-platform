import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, message } = body;

    // TODO: Send email notification to admin
    // TODO: Store consultation request in database
    
    console.log('Consultation request received:', { name, email, company, phone, message });

    return NextResponse.json(
      { message: 'Consultation request received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Consultation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}


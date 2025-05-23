import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  emails: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as RequestBody;
    const { emails } = body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ message: 'Invalid request: No emails provided or emails format is incorrect.' }, { status: 400 });
    }

    // For now, just log the emails.
    // In a real application, you would save these to a database.
    console.log('Received emails:', emails);

    return NextResponse.json({
      message: 'Emails received successfully!',
      data: emails,
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing request:', error);
    if (error instanceof SyntaxError) { // Handle JSON parsing errors specifically
        return NextResponse.json({ message: 'Invalid JSON payload.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

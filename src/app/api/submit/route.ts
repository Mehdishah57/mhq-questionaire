import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Response from '@/models/Response';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const data = await request.json();

        // Basic validation could go here
        if (!data || !data.answers) {
            return NextResponse.json(
                { success: false, error: 'Invalid data format' },
                { status: 400 }
            );
        }

        const response = await Response.create({
            answers: data.answers,
        });

        return NextResponse.json({ success: true, data: response }, { status: 201 });
    } catch (error) {
        console.error('Error submitting response:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

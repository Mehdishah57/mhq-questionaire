import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Response from '@/models/Response';

export const dynamic = 'force-dynamic'; // Ensure this route is not cached

export async function GET() {
    try {
        await dbConnect();
        const responses = await Response.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: responses }, { status: 200 });
    } catch (error) {
        console.error('Error fetching responses:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

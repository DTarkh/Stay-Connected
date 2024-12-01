import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const response = await fetch('https://nunu29.pythonanywhere.com/questions/');
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Extract domain from email
        const domain = email.split('@')[1];

        // Check if domain has MX records (indicating it's a valid email domain)
        const mxRecords = await resolveMx(domain);

        if (mxRecords && mxRecords.length > 0) {
            // Store the verified email in your database here
            // For now, we'll just return success
            return NextResponse.json(
                { success: true, message: 'Email verified successfully' },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: 'Invalid business email domain' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Verification error:', error);
        return NextResponse.json(
            { error: 'Failed to verify email' },
            { status: 500 }
        );
    }
} 
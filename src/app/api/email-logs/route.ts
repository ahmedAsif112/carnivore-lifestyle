import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
export async function GET() {
    try {
        const logs = await prisma.emailLog.findMany({
            orderBy: { timestamp: 'desc' },
        });
        return NextResponse.json(logs);
    } catch (error) {
        console.error('❌ Failed to fetch logs:', error);
        return NextResponse.json({ error: 'Failed to read logs' }, { status: 500 });
    }
}

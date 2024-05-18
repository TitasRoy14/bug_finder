import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(users, { status: 201 });
}

export async function POST(request: NextRequest) {
  const userOb = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      id: userOb.userId,
    },
  });

  return NextResponse.json(user, { status: 200 });
}

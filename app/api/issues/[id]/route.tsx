import authOptions from '@/app/auth/authOptions';
import { patchIssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { Issue } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //check to see if user logged in
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body: Issue = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // here we checking the assigned to user id validation and corresponding steps

  const { title, description, assignedToUserId } = body;
  if (assignedToUserId !== null) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
  }

  // Here we finding the existence of the issue

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json(
      { error: 'Issue does not exist' },
      { status: 404 }
    );

  // updation part

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // check to see if user logged in
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: 'No issue found' }, { status: 404 });

  const res = await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json(res, { status: 200 });
}

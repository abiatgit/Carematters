import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch user with role and unit relation
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        unit: {
          include: {
            careHome: true,
          },
        },
      },
    });

    if (!currentUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    let careHome = null;

    if (currentUser.role === 'MANAGER') {
      // If manager, get the care home where user is the creator
      careHome = await prisma.careHome.findFirst({
        where: { createdBy: currentUser.id },
      });
    } else {
      // For staff or others, get care home via unit
      careHome = currentUser.unit?.careHome ?? null;
    }

    return NextResponse.json({
      success: true,
      user: currentUser,
      careHome,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

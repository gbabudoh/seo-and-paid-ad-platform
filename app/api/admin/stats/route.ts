import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth/config';
import { ClientService, CampaignService, UserService } from '@/src/lib/services';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || session.user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const [clients, campaigns, users] = await Promise.all([
      ClientService.getAll(1000, 0),
      CampaignService.getAll(1000, 0),
      UserService.getAll(1000, 0),
    ]);

    // Calculate stats
    const totalCampaigns = campaigns.length;
    const totalRevenue = 0; // Placeholder - would calculate from actual revenue data

    return NextResponse.json({
      totalCampaigns,
      totalRevenue,
      totalClients: clients.length,
      totalUsers: users.length,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}


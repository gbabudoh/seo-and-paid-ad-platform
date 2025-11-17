import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth/config';
import { CampaignService } from '@/src/lib/services';
import { ClientService } from '@/src/lib/services';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get client for this user
    const client = await ClientService.getByUserId(session.user.id);
    if (!client) {
      return NextResponse.json({ message: 'Client not found' }, { status: 404 });
    }

    const campaigns = await CampaignService.getByClientId(client._id);
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { clientId, name, type, budget, currency, startDate, endDate, settings } = body;

    // Validate required fields
    if (!clientId || !name || !type || !startDate) {
      return NextResponse.json(
        { message: 'Missing required fields: clientId, name, type, and startDate are required' },
        { status: 400 }
      );
    }

    // Verify the client belongs to this user
    const client = await ClientService.getByUserId(session.user.id);
    if (!client || client._id !== clientId) {
      return NextResponse.json(
        { message: 'Unauthorized: Client does not belong to this user' },
        { status: 403 }
      );
    }

    // Create campaign
    const campaign = await CampaignService.create({
      clientId,
      name,
      type,
      status: 'active',
      budget: budget ? parseFloat(budget) : undefined,
      currency: currency || 'USD',
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      settings: settings || {
        targetKeywords: [],
        targetLocations: [],
      },
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

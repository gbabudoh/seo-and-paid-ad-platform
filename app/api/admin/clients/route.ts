import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth/config';
import { ClientService } from '@/src/lib/services';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authentication and admin role
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');
    const status = searchParams.get('status');

    const clients = await ClientService.getAll(limit, skip);
    
    // Filter by status if provided
    const filteredClients = status
      ? clients.filter(client => client.status === status)
      : clients;

    return NextResponse.json({ clients: filteredClients, total: filteredClients.length });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth/config';
import { ClientService } from '@/src/lib/services';
import { clientOnboardingSchema } from '@/src/lib/utils/validation';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Transform the data to match the expected schema
    // Handle case where frontend sends roiType/roiValue instead of roiExpectation object
    const roiValue = typeof body.roiValue === 'string' ? parseFloat(body.roiValue) : (body.roiValue || 0);
    
    const transformedBody = {
      companyName: body.companyName,
      website: body.website,
      industry: body.industry,
      targetCountries: Array.isArray(body.targetCountries) 
        ? body.targetCountries 
        : (body.targetCountries ? body.targetCountries.split(',').map((c: string) => c.trim().toUpperCase()) : []),
      preferredLanguage: body.preferredLanguage || 'en',
      packageTier: body.packageTier,
      roiExpectation: body.roiExpectation || {
        type: body.roiType,
        value: roiValue,
        metric: body.roiMetric,
      },
      // Create default targetAudience if not provided (required by schema)
      targetAudience: body.targetAudience || {
        demographics: {
          locations: Array.isArray(body.targetCountries) 
            ? body.targetCountries 
            : (body.targetCountries ? body.targetCountries.split(',').map((c: string) => c.trim().toUpperCase()) : []),
        },
        interests: [],
        behaviors: [],
      },
      // Add default budget allocation if not provided
      budgetAllocation: body.budgetAllocation || {
        seo: 40,
        googleAds: 30,
        metaAds: 30,
      },
    };
    
    // Validate input
    const validationResult = clientOnboardingSchema.safeParse(transformedBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          message: 'Validation failed', 
          errors: validationResult.error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const client = await ClientService.create(session.user.id, validationResult.data);

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error('Onboarding error:', error);
    
    // Provide more detailed error information
    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
      errorMessage = error.message;
      // Check for common MongoDB errors
      if (error.message.includes('E11000')) {
        errorMessage = 'A client profile already exists for this user';
      } else if (error.message.includes('validation')) {
        errorMessage = 'Validation error: ' + error.message;
      } else if (error.message.includes('Cast to ObjectId')) {
        errorMessage = 'Invalid user ID format';
      }
    }
    
    return NextResponse.json(
      { 
        message: errorMessage,
        error: error instanceof Error ? error.stack : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


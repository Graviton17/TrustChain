import { NextRequest, NextResponse } from 'next/server';
import { databases } from '@/models/server/config';
import { InsurancePolicy, CreateInsurancePolicyRequest } from '@/types/insurance';
import { ID, Query } from 'appwrite';
import env from '@/app/env';

const DATABASE_ID = 'trustchain';
const INSURANCE_COLLECTION_ID = 'insurance';

export async function POST(req: NextRequest) {
  try {
    console.log('Received POST request to create insurance policy');
    
    const body: CreateInsurancePolicyRequest = await req.json();
    console.log('Request body:', body);

    // Validate required fields
    if (!body.policy_name || !body.policy_type) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json(
        { success: false, error: 'Policy name and type are required' },
        { status: 400 }
      );
    }

    // Create document data
    const documentData = {
      providerId: body.providerId || 'default-provider',
      policy_name: body.policy_name,
      policy_type: body.policy_type,
      target_region: body.target_region || '',
      description: body.description || '',
      total_outlay_covered: body.total_outlay_covered || '',
      eligibility_summary: body.eligibility_summary || '',
      terms_url: body.terms_url || '',
    };

    console.log('Creating document with data:', documentData);
    console.log('Using database:', DATABASE_ID);
    console.log('Using collection:', INSURANCE_COLLECTION_ID);

    // Create the insurance policy
    const policy = await databases.createDocument(
      DATABASE_ID,
      INSURANCE_COLLECTION_ID,
      ID.unique(),
      documentData
    );

    return NextResponse.json({
      success: true,
      data: policy,
    });
  } catch (error: any) {
    console.error('Error creating insurance policy:', error);
    
    // Get detailed error information
    const errorMessage = error.message || 'Unknown error';
    const errorCode = error.code || 'NO_CODE';
    
    console.error('Detailed error:', {
      message: errorMessage,
      code: errorCode,
      stack: error.stack
    });

    return NextResponse.json(
      { 
        success: false, 
        error: `Failed to create insurance policy: ${errorMessage}`,
        code: errorCode
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const policies = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_INSURANCE_COLLECTION_ID!
    );

    return NextResponse.json({
      success: true,
      data: policies.documents,
      total: policies.total,
    });
  } catch (error) {
    console.error('Error fetching insurance policies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch insurance policies' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const policyId = url.pathname.split('/').pop();

    if (!policyId) {
      return NextResponse.json(
        { success: false, error: 'Policy ID is required' },
        { status: 400 }
      );
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_INSURANCE_COLLECTION_ID!,
      policyId
    );

    return NextResponse.json({
      success: true,
      message: 'Policy deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting insurance policy:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete insurance policy' },
      { status: 500 }
    );
  }
}

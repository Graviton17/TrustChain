"use client";

import { useEffect, useState } from 'react';
import { Shield, Plus, Trash2 } from 'lucide-react';
import { InsurancePolicy, CreateInsurancePolicyRequest } from '@/types/insurance';

const InsuranceManager = () => {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingPolicy, setIsAddingPolicy] = useState(false);
  const [newPolicy, setNewPolicy] = useState<CreateInsurancePolicyRequest>({
    providerId: '',
    policy_name: '',
    policy_type: 'National',
    target_region: '',
    description: '',
    total_outlay_covered: '',
    eligibility_summary: '',
    terms_url: ''
  });

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await fetch('/api/insurance');
      const data = await response.json();
      if (data.success && data.data) {
        setPolicies(data.data);
      } else {
        setError(data.error || 'Failed to fetch insurance policies');
      }
    } catch (err) {
      setError('Failed to fetch insurance policies');
      console.error('Error fetching policies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePolicy = async () => {
    try {
      setError(null); // Clear any previous errors
      
      // Basic validation
      if (!newPolicy.policy_name || !newPolicy.policy_type) {
        setError('Policy name and type are required');
        return;
      }

      // Set default providerId if not provided
      const policyToCreate = {
        ...newPolicy,
        providerId: newPolicy.providerId || 'default-provider'
      };

      // Log the request data
      console.log('Attempting to create policy:', policyToCreate);

      const response = await fetch('/api/insurance/provider/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(policyToCreate),
      });

      // Log response details
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Invalid response type:', contentType);
        throw new Error('Invalid response type from server');
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        const errorMessage = data.error || `Server error: ${response.status}`;
        console.error('Server Error:', {
          status: response.status,
          error: errorMessage,
          code: data.code
        });
        throw new Error(errorMessage);
      }

      if (!data.success) {
        console.error('API Error:', data);
        throw new Error(data.error || 'Failed to create policy');
      }
      
      // Success case
      console.log('Policy created successfully:', data);
      setIsAddingPolicy(false);
      setNewPolicy({
        providerId: '',
        policy_name: '',
        policy_type: 'National',
        target_region: '',
        description: '',
        total_outlay_covered: '',
        eligibility_summary: '',
        terms_url: ''
      });
      setError(null);
      await fetchPolicies();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create policy');
      console.error('Error creating policy:', err);
    }
  };

  const handleDeletePolicy = async (policyId: string) => {
    try {
      const response = await fetch(`/api/insurance/provider/${policyId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        fetchPolicies();
      } else {
        setError(data.error || 'Failed to delete policy');
      }
    } catch (err) {
      setError('Failed to delete policy');
      console.error('Error deleting policy:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Insurance Policy Manager</h1>
                <p className="text-sm text-green-600">Manage Green Hydrogen Insurance Policies</p>
              </div>
            </div>
            <button
              onClick={() => setIsAddingPolicy(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Policy</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {isAddingPolicy ? (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Insurance Policy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Policy Name</label>
                <input
                  type="text"
                  value={newPolicy.policy_name}
                  onChange={(e) => setNewPolicy({ ...newPolicy, policy_name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
                <select
                  value={newPolicy.policy_type}
                  onChange={(e) => setNewPolicy({ ...newPolicy, policy_type: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="National">National</option>
                  <option value="State-Level">State-Level</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Region</label>
                <input
                  type="text"
                  value={newPolicy.target_region}
                  onChange={(e) => setNewPolicy({ ...newPolicy, target_region: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Outlay Covered</label>
                <input
                  type="text"
                  value={newPolicy.total_outlay_covered}
                  onChange={(e) => setNewPolicy({ ...newPolicy, total_outlay_covered: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newPolicy.description}
                  onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Summary</label>
                <textarea
                  value={newPolicy.eligibility_summary}
                  onChange={(e) => setNewPolicy({ ...newPolicy, eligibility_summary: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Terms URL</label>
                <input
                  type="text"
                  value={newPolicy.terms_url}
                  onChange={(e) => setNewPolicy({ ...newPolicy, terms_url: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsAddingPolicy(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePolicy}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Create Policy
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {policies.map((policy) => (
              <div key={policy.$id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{policy.policy_name}</h3>
                    <p className="text-sm text-gray-500">Type: {policy.policy_type}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeletePolicy(policy.$id!)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Target Region</h4>
                    <p className="text-gray-600">{policy.target_region || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Total Outlay Covered</h4>
                    <p className="text-gray-600">{policy.total_outlay_covered || 'N/A'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-medium text-gray-700">Description</h4>
                    <p className="text-gray-600">{policy.description || 'No description available'}</p>
                  </div>
                  {policy.eligibility_summary && (
                    <div className="md:col-span-2">
                      <h4 className="font-medium text-gray-700">Eligibility</h4>
                      <p className="text-gray-600">{policy.eligibility_summary}</p>
                    </div>
                  )}
                  {policy.terms_url && (
                    <div className="md:col-span-2">
                      <a
                        href={policy.terms_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700"
                      >
                        View Terms and Conditions →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InsuranceManager;

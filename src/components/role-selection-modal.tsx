import { Factory, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoleSelectionModal({ isOpen, onClose }: RoleSelectionModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleRoleSelect = (role: 'producer' | 'consumer') => {
    onClose();
    // Both producer and consumer need to provide company details first
    router.push(`/companyDetail?role=${role}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
        <p className="text-gray-600 mb-6">
          Select whether you want to participate as a Producer or Consumer in the Green Hydrogen ecosystem.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleRoleSelect('producer')}
            className="flex flex-col items-center p-6 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
          >
            <Factory className="w-12 h-12 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Producer</h3>
            <p className="text-sm text-gray-500 text-center mt-2">
              Submit your project details for green hydrogen production
            </p>
          </button>

          <button
            onClick={() => handleRoleSelect('consumer')}
            className="flex flex-col items-center p-6 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <Users className="w-12 h-12 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Consumer</h3>
            <p className="text-sm text-gray-500 text-center mt-2">
              Purchase and utilize green hydrogen
            </p>
          </button>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

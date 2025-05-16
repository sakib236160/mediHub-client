import { useState, useEffect } from 'react';
import { updateProfile, updateEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const UpdateModal = ({ isOpen, onClose }) => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      if (!auth.currentUser) {
        throw new Error("No authenticated user found.");
      }

      // Update display name and photo URL
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: user?.photoURL || '',
      });

      //  Update email if changed
      if (email !== user.email) {
        await updateEmail(auth.currentUser, email);
      }

      // Reload user info
      await auth.currentUser.reload();
      setUser(auth.currentUser);

      toast.success('Profile updated successfully!');
      onClose();
    } catch (error) {
      console.error('Update failed:', error.message);
      toast.error('Update failed: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>

        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            className="w-full border border-gray-300 rounded p-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            className="w-full border border-gray-300 rounded p-2"
            type="email"
            value={email}
            readOnly
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-300 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
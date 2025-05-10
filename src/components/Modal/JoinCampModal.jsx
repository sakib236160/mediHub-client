/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Fragment, useState } from 'react';
import Button from '../Shared/Button/Button';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const JoinCampModal = ({ closeModal, isOpen, camp, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    name,
    fees,
    seller,
  } = camp;

  const [submitInfo, setSubmitInfo] = useState({
    customer: {
      name: user?.displayName || '',
      email: user?.email || '',
      image: user?.photoURL || '',
    },
    campId: _id,
    fees: fees,
    seller: seller?.email || '',
    address: '',
    status: 'Pending',
    age: '',
    gender: '',
    phone: '',
    emergencyContact: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Save order info
      await axiosSecure.post('/order', submitInfo);

      // 2. Decrease participant count from camp
      await axiosSecure.patch(`/camps/participant/${_id}`, {
        participantToUpdate: 1,
      });

      toast.success('Join camp successfully!');
       refetch();
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-semibold text-gray-900 mb-6 text-center"
                >
                  Camp Registration
                </DialogTitle>

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <input
                    type="text"
                    value={user?.displayName || ''}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                  <input
                    type="text"
                    placeholder="Your Age"
                    onChange={(e) =>
                      setSubmitInfo((prev) => ({ ...prev, age: e.target.value }))
                    }
                    className="input input-bordered w-full"
                  />
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                  <select
                    className="select select-bordered w-full"
                    defaultValue=""
                    onChange={(e) =>
                      setSubmitInfo((prev) => ({ ...prev, gender: e.target.value }))
                    }
                  >
                    <option disabled value="">
                      Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Your Phone Number"
                    onChange={(e) =>
                      setSubmitInfo((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="input input-bordered w-full"
                  />
                  <input
                    type="number"
                    value={fees}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                  <input
                    type="text"
                    placeholder="Enter Your Address"
                    onChange={(e) =>
                      setSubmitInfo((prev) => ({ ...prev, address: e.target.value }))
                    }
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    placeholder="Emergency Contact"
                    onChange={(e) =>
                      setSubmitInfo((prev) => ({
                        ...prev,
                        emergencyContact: e.target.value,
                      }))
                    }
                    className="input input-bordered w-full"
                  />

                  <div className="col-span-1 md:col-span-2 text-center space-y-3 mt-4">
                    <Button type="submit" label="Submit Camp" />
                    <p className="text-lg font-semibold text-gray-800">
                      Pay: <span className="text-blue-600">${fees}</span>
                    </p>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default JoinCampModal;


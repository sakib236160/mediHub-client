// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import DeleteModal from '../../Modal/DeleteModal';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import toast from 'react-hot-toast';

// const CustomerOrderDataRow = ({ orderData, refetch }) => {
//   const axiosSecure = useAxiosSecure();
//   const [isOpen, setIsOpen] = useState(false);

//   const closeModal = () => setIsOpen(false);

//   // Extracting relevant data from orderData
//   const { name, image, participant, fees, address, _id, status, campId } = orderData;

//   // Handle order cancelation and increase camp participant count
//   const handleDelete = async () => {
//     try {
//       // 1. Deleting the order
//       await axiosSecure.delete(`/orders/${_id}`);

//       // 2. Increasing participant count in the camp
//       await axiosSecure.patch(`/camps/participant/${campId}`, {
//         participantToUpdate: 1,
//         status: 'increase',
//       });

//       // 3. Refreshing the UI
//       refetch();
//       toast.success('Camp Cancelled')
//     } catch (err) {
//       console.error('Error deleting order or updating camp:', err);
//       toast.error(err.response.data)
//     } finally {
//       closeModal();
//     }
//   };

//   return (
//     <tr>
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         <div className="flex items-center">
//           <div className="flex-shrink-0">
//             <div className="block relative">
//               <img
//                 alt="profile"
//                 src={image}
//                 className="mx-auto object-cover rounded h-10 w-15"
//               />
//             </div>
//           </div>
//         </div>
//       </td>

//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         <p className="text-gray-900 whitespace-no-wrap">{name}</p>
//       </td>
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         <p className="text-gray-900 whitespace-no-wrap">{address}</p>
//       </td>
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         <p className="text-gray-900 whitespace-no-wrap">${fees}</p>
//       </td>
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         <p className="text-gray-900 whitespace-no-wrap">{participant}</p>
//       </td>
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         <p className="text-gray-900 whitespace-no-wrap">{status}</p>
//       </td>

//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         <button
//           onClick={() => setIsOpen(true)}
//           className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
//         >
//           <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full"></span>
//           <span className="relative cursor-pointer">Cancel</span>
//         </button>

//         <DeleteModal handleDelete={handleDelete} isOpen={isOpen} closeModal={closeModal} />
//       </td>
//     </tr>
//   );
// };

// CustomerOrderDataRow.propTypes = {
//   orderData: PropTypes.object.isRequired,
//   refetch: PropTypes.func.isRequired,
// };

// export default CustomerOrderDataRow;




import PropTypes from 'prop-types';
import { useState } from 'react';
import DeleteModal from '../../Modal/DeleteModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import FeedbackModal from '../../Modal/FeedbackModal';


const CustomerOrderDataRow = ({ orderData, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const closeFeedbackModal = () => setIsFeedbackOpen(false);

  const { name, image, participant, fees, address, _id, status, campId } = orderData;

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/orders/${_id}`);
      await axiosSecure.patch(`/camps/participant/${campId}`, {
        participantToUpdate: 1,
        status: 'increase',
      });
      refetch();
      toast.success('Camp Cancelled');
    } catch (err) {
      console.error('Error deleting order or updating camp:', err);
      toast.error(err.response.data);
    } finally {
      closeModal();
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img alt="profile" src={image} className="mx-auto object-cover rounded h-10 w-15" />
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{name}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{address}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">${fees}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{participant}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{status}</td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-2">
        <button
          onClick={() => setIsOpen(true)}
          className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
          <span className="relative">Cancel</span>
        </button>
        <DeleteModal handleDelete={handleDelete} isOpen={isOpen} closeModal={closeModal} />
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight"
        >
          <span className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
          <span className="relative">Feedback</span>
        </button>
        <FeedbackModal orderData={orderData} isOpen={isFeedbackOpen} closeModal={closeFeedbackModal} />
      </td>
    </tr>
  );
};

CustomerOrderDataRow.propTypes = {
  orderData: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default CustomerOrderDataRow;



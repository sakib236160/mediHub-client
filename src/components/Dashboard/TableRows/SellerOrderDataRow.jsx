import PropTypes from 'prop-types'
import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
const SellerOrderDataRow = ({orderData,refetch}) => {
  const axiosSecure = useAxiosSecure()
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
const { name,customer, participant, fees, address, _id, status, campId } = orderData || {};

 // Handle order cancelation and increase camp participant count
  const handleDelete = async () => {
    try {
      // 1. Deleting the order
      await axiosSecure.delete(`/orders/${_id}`);

      // 2. Increasing participant count in the camp
      await axiosSecure.patch(`/camps/participant/${campId}`, {
        participantToUpdate: 1,
        status: 'increase',
      });

      // 3. Refreshing the UI
      refetch();
      toast.success('Camp Cancelled')
    } catch (err) {
      console.error('Error deleting order or updating camp:', err);
      toast.error(err.response.data)
    } finally {
      closeModal();
    }
  };

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{customer?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${fees}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{participant}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{address}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{status}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center gap-2'>
          <select
            required
            defaultValue={status}
            className='p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white'
            name='category'
          >
            <option value='Pending'>Pending</option>
            <option value='In Progress'>Start Processing</option>
            <option value='Delivered'>Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
          >
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Cancel</span>
          </button>
        </div>
        <DeleteModal handleDelete ={handleDelete } isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  )
}

SellerOrderDataRow.propTypes = {
  orderData: PropTypes.object,
  refetch: PropTypes.func,
}

export default SellerOrderDataRow

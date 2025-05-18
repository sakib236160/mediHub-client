import { Helmet } from 'react-helmet-async';
import SellerOrderDataRow from '../../../components/Dashboard/TableRows/SellerOrderDataRow';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useState } from 'react';

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/seller-orders/${user?.email}`);
      return data;
    },
  });

  // Pagination Logic
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Manage Registered Camps | Dashboard</title>
      </Helmet>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Name</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Email</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Fees</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Participant</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Address</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Status</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((orderData) => (
                    <SellerOrderDataRow
                      key={orderData?._id}
                      orderData={orderData}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center py-4 bg-white border-t">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="mx-2 text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageOrders;


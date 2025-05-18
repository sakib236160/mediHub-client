import { Helmet } from 'react-helmet-async';
import PlantDataRow from '../../../components/Dashboard/TableRows/PlantDataRow';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useState } from 'react';

const MyInventory = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: camps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['camps'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/camps/seller`);
      return data;
    },
  });

  // Pagination Logic
  const totalPages = Math.ceil(camps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCamps = camps.slice(startIndex, startIndex + itemsPerPage);

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
        <title>Manage Camp | Dashboard</title>
      </Helmet>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Image</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Name</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Location</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Fees</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Participant</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Delete</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCamps.map((camp) => (
                    <PlantDataRow key={camp?._id} camp={camp} refetch={refetch} />
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

export default MyInventory;


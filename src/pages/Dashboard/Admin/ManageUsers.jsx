import { Helmet } from 'react-helmet-async';
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useState } from 'react';

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-users/${user?.email}`);
      return data;
    },
  });

  // Pagination Logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <Helmet>
          <title>Manage Users | Dashboard</title>
        </Helmet>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Email</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Role</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Status</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((userData) => (
                    <UserDataRow
                      refetch={refetch}
                      key={userData?._id}
                      userData={userData}
                    />
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className='flex justify-center items-center py-4 bg-white border-t'>
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className='px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:opacity-50'
                >
                  Prev
                </button>
                <span className='mx-2 text-gray-700'>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className='px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:opacity-50'
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

export default ManageUsers;

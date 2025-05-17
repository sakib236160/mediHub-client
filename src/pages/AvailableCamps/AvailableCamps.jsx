import Container from '../../components/Shared/Container';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import Card from '../../components/Home/Card';
import { useState } from 'react';

const AvailableCamps = () => {
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['all-camps'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/camps`);
      return data;
    },
  });

  // Sorting Logic
  const sortedCamps = [...camps].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'audience') {
      const aAudience = a.audience || a.targetAudience || '';
      const bAudience = b.audience || b.targetAudience || '';
      return aAudience.localeCompare(bAudience);
    }
    if (sortBy === 'most-registered') return b.participant - a.participant;
    return 0;
  });

  // Search Filtering Logic
  const filteredCamps = sortedCamps.filter((camp) =>
    camp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      {/* Top Search & Sort Section */}
      <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded-xl py-5 my-5">
        <div className="mx-auto md:w-2/3 flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-6">
          {/* Search Input */}
          <div className="relative w-full md:w-2/3">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-blue-900 border border-blue-300 rounded-lg bg-blue-50"
              placeholder="Search Camps..."
            />
            <button
              type="submit"
              onClick={(e) => e.preventDefault()}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>

          {/* Sort Dropdown */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 rounded-md border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="default">Sort By</option>
              <option value="name">Camp Name (A-Z)</option>
              <option value="audience">Target Audience</option>
              <option value="most-registered">Most Registered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Camp Cards */}
      {filteredCamps && filteredCamps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-16">
          {filteredCamps.map((camp) => (
            <Card key={camp._id} camp={camp} showJoinButton={true} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No camps found.</p>
      )}
    </Container>
  );
};

export default AvailableCamps;

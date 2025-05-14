import Card from './Card'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'
import { Link } from 'react-router-dom'
import SectionTitle from '../SectionTitle/SectionTitle'

const PopularCamps = () => {
  const { data: camps, isLoading } = useQuery({
    queryKey: ['popular-camps'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/camps`)
      return data;
    }
  })

  if (isLoading) return <LoadingSpinner />

  const popularCamps = camps?.slice(0, 6) || [];

  return (
    <Container>
       <SectionTitle
        heading={"Popular Camps"}
        subHeading={"Explore Events Aimed at Community Wellness"}
      />

      {popularCamps.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {popularCamps.map(camp => (
              <Card key={camp._id} camp={camp} />
            ))}
          </div>

          {/* See All Button */}
          <div className="text-center mt-10 mb-10">
            <Link to="/available-camps">
              <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition duration-300">
                See All
              </button>
            </Link>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-8">No data available.</p>
      )}
    </Container>
  )
}

export default PopularCamps
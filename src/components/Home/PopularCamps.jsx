import Card from './Card'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'

const PopularCamps = () => {
  const {data:camps, isLoading} = useQuery({
    queryKey:['camps'],
    queryFn: async ()=>{
      const {data} = await axios(`${import.meta.env.VITE_API_URL}/camps`)
      return data
    }
  })
  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <Container>
     {
      camps && camps.length>0?  <div className='pt-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8'>
      {
        camps.map(camp=> <Card key={camp._id} camp={camp}></Card>)
      }
    </div> : <p>No data Available</p>
     }
    </Container>
  )
}

export default PopularCamps

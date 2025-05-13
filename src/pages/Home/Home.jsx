import { Helmet } from 'react-helmet-async'
import PopularCamps from '../../components/Home/PopularCamps'
import Banner from '../Banner/Banner'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> MediHub | Buy Your Desired Plant</title>
      </Helmet>
      <Banner></Banner>
      <PopularCamps></PopularCamps>
    </div>
  )
}

export default Home

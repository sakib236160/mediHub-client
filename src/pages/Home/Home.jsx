import { Helmet } from 'react-helmet-async'
import PopularCamps from '../../components/Home/PopularCamps'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> MediHub | Buy Your Desired Plant</title>
      </Helmet>
      <PopularCamps></PopularCamps>
    </div>
  )
}

export default Home

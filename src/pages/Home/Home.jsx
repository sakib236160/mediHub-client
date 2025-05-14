import { Helmet } from 'react-helmet-async'
import PopularCamps from '../../components/Home/PopularCamps'
import Banner from '../Banner/Banner'
import Testimonials from '../Testimonials/Testimonials'
import Faq from '../Faq/Faq'
import NewsLetter from '../NewsLetter/NewsLetter'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> MediHub | Buy Your Desired Plant</title>
      </Helmet>
      <Banner></Banner>
      <PopularCamps></PopularCamps>
      <Testimonials></Testimonials>
      <Faq></Faq>
      <NewsLetter></NewsLetter>
    </div>
  )
}

export default Home

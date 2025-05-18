import { Helmet } from 'react-helmet-async'
import PopularCamps from '../../components/Home/PopularCamps'
import Banner from '../Banner/Banner'
// import Testimonials from '../Testimonials/Testimonials'
import Faq from '../Faq/Faq'
import NewsLetter from '../NewsLetter/NewsLetter'
import Review from '../Review/Review'
import MedicareHighlight from '../MedicareHighlight/MedicareHighlight'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> MediCare | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularCamps></PopularCamps>
      <MedicareHighlight></MedicareHighlight>
      <Review></Review>
      <Faq></Faq>
      <NewsLetter></NewsLetter>
    </div>
  )
}

export default Home

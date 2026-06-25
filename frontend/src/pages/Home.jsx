import Hero from "../components/Hero"
import LatestCollections from "../components/LatestCollections"
import Bestseller from "../components/Bestseller"
import OurPolicy from "../components/OurPolicy"
import NewsletterBox from "../components/NewsletterBox"



const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollections/>
      <Bestseller/>
      <OurPolicy/>
      <NewsletterBox/>
      
    </div>
  )
}

export default Home
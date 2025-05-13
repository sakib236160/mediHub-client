import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from '../../assets/Home/banner_01.png';
import img2 from '../../assets/Home/banner_02.png';
import img3 from '../../assets/Home/banner_03.png';
import img4 from '../../assets/Home/banner_04.png';
import img5 from '../../assets/Home/banner_05.png';
import Container from "../../components/Shared/Container";

const Banner = () => {
  return (
    <Container>
        <div className="">
        <Carousel>
      <div>
        <img src={img1} />
        <p className="legend">Your Health, Our Mission</p>
      </div>
      <div>
        <img src={img2}  />
        <p className="legend">Organizing Medical Camps for All
        </p>
      </div>
      <div>
        <img src={img3}  />
        <p className="legend">Join Us for Better Healthcare
        </p>
      </div>
      <div>
        <img src={img4}  />
        <p className="legend">Connecting Doctors with Communities
        </p>
      </div>
      <div>
        <img src={img5}  />
        <p className="legend">Empowering Health, Saving Lives
        </p>
      </div>
    </Carousel>
    </div>
    </Container>
  );
};

export default Banner;
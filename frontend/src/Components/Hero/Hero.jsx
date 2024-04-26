import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image2 from '../Assets/hero_img55.jpg'
import 'aos/dist/aos.css'

const Hero=()=>{

    const scrollToNewCollections = () => {
        const element = document.getElementById("latestCollections");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    
    return(

        <div className="hero" data-aos="fade-up">

            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                <div className="hero-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="hand icon" />
                </div>
                <p>Collections</p>
                <p>For everyone</p>
                </div>
            
            <div className="hero-latest-btn"  onClick={scrollToNewCollections}>
                <div>Latest Collections</div>
                <img src={arrow_icon} alt="arrow" />
            </div>
            
            </div>
            <div className="hero-right">

                <img src={hero_image2} alt="heroimg" />
            </div>

        </div>
    )
}

export default Hero
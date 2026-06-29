import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      {/* Header */}
      <div className="text-2xl text-center pt-8 border-t border-gray-300">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About section */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-112.5 object-cover"
          src={assets.about_img}
          alt="About ForeverBuy"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever Was Born Out Of A Passion For Innovation And A Desire To Revolutionize The Way
            People Shop Online. Our Journey Began With A Simple Idea: To Provide A Platform Where
            Customers Can Easily Discover, Explore, And Purchase A Wide Range Of Products From
            The Comfort Of Their Homes.
          </p>
          <p>
            Since Our Inception, We've Worked Tirelessly To Curate A Diverse Selection Of High-Quality
            Products That Cater To Every Taste And Preference. From Fashion And Beauty To Electronics
            And Home Essentials, We Offer An Extensive Collection Sourced From Trusted Brands And
            Suppliers.
          </p>
          <div>
            <p className="font-semibold text-gray-800 mb-2">Our Mission</p>
            <p>
              Our Mission At Forever Is To Empower Customers With Choice, Convenience, And Confidence.
              We're Dedicated To Providing A Seamless Shopping Experience That Exceeds Expectations,
              From Browsing And Ordering To Delivery And Beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row gap-0 mb-20">
        {[
          {
            heading: "QUALITY ASSURANCE:",
            body: "We Meticulously Select And Vet Each Product To Ensure It Meets Our Stringent Quality Standards.",
          },
          {
            heading: "CONVENIENCE:",
            body: "With Our User-Friendly Interface And Hassle-Free Ordering Process, Shopping Has Never Been Easier.",
          },
          {
            heading: "EXCEPTIONAL CUSTOMER SERVICE:",
            body: "Our Team Of Dedicated Professionals Is Here To Assist You The Way, Ensuring Your Satisfaction Is Our Top Priority.",
          },
        ].map(({ heading, body }) => (
          <div
            key={heading}
            className="border border-gray-300 px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5 flex-1"
          >
            <p className="font-bold text-sm">{heading}</p>
            <p className="text-gray-600 text-sm">{body}</p>
          </div>
        ))}
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;

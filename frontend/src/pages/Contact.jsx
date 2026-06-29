import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t border-gray-300">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-120 object-cover"
          src={assets.contact_img}
          alt="Contact ForeverBuy"
        />

        <div className="flex flex-col justify-center gap-6 text-gray-600">
          <div>
            <p className="font-semibold text-xl text-gray-800">OUR STORE</p>
            <p className="text-gray-600 mt-2">
              54709 Willms Station<br />
              Suite 350, Washington, USA
            </p>
            <p className="text-gray-600 mt-2">
              Tel: +234 806 800 2341<br />
              Email: emmanuelngene145@gmail.com
            </p>
          </div>

          <div>
            <p className="font-semibold text-xl text-gray-800">CAREERS AT FOREVER</p>
            <p className="text-gray-600 mt-2">Learn more about our teams and job openings.</p>
            <button className="border border-black px-8 py-4 text-sm mt-4 hover:bg-black hover:text-white transition-all duration-500">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;

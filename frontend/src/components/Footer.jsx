import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>

      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">

        {/* Logo Section */}
        <div>
          <img
            src={assets.logo}
            alt="ForeverBuy Logo"
            className="mb-5 w-32"
          />

          <p className="w-full md:w-2/3 text-gray-600">
            ForeverBuy is your destination for quality fashion and lifestyle
            products. Discover the latest trends, best sellers, and exclusive
            collections at unbeatable prices.
          </p>
        </div>

        {/* Company */}
        <div>
          <p className="text-xl font-medium mb-5">
            COMPANY
          </p>

          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xl font-medium mb-5">
            GET IN TOUCH
          </p>

          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+234 806 800 2341</li>
            <li>contact@foreverbuy.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className="text-gray-200" />

        <p className="py-5 text-sm text-center">
          Copyright 2026 © ForeverBuy.com - All Rights Reserved.
        </p>
      </div>

    </div>
  );
};

export default Footer;
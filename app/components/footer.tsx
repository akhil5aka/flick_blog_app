import Image from "next/image";
import fbicon from "../../assets/fb_icon.png";
import youtubIcon from "../../assets/youtube_icon.jpg";
import twitterIcon from "../../assets/twiter_icon.jpg";
 
// Import CSS as a module
import Styles from "./main_style.module.css";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className={Styles.footer_container_div}>
        {" "}
        {/* Correct usage of the imported class from CSS module */}
        {/* Flick Section */}
        {/* <div className={Styles.description_div}> */}
        <div className="w-3/12">
          <h2 className="text-2xl font-bold text-purple-500 mb-4">Flick.</h2>
          <p className="text-sm">
            Flick Network is a leading provider of innovative financial
            technology solutions, specializing in treasury management, AP/AR
            processing, e-invoicing compliance, and PEPPOL integration. Our
            platform helps businesses streamline their financial operations.
          </p>
          <div className={Styles.icon_main_div}>
            {/* Social Icons */}

            <div>
              <a href="#">
                <Image
                  className={Styles.icon_class}
                  src={fbicon}
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
            </div>
            <div>
              <a href="#">
                <Image
                  className={Styles.icon_class}
                  src={youtubIcon}
                  alt="YouTube"
                  width={24}
                  height={24}
                />
              </a>
            </div>
            <div>
              <a href="#">
                <Image
                  className={Styles.icon_class}
                  src={twitterIcon}
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
        </div>
        {/* General Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">General</h3>
          <ul className="space-y-2">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>About us</a>
            </li>
            <li>
              <a>Contact us</a>
            </li>
            <li>
              <a>Our customers</a>
            </li>
            <li>
              <a>Blogs</a>
            </li>
            <li>
              <a>Sitemap</a>
            </li>
          </ul>
        </div>
        {/* Solutions Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Solutions</h3>
          <ul className="space-y-2">
            <li>
              <a>E-Invoicing Malaysia</a>
            </li>
            <li>
              <a>E-Invoicing Saudi Arabia</a>
            </li>
            <li>
              <a>Treasury Management</a>
            </li>
            <li>
              <a>Procurement Management</a>
            </li>
          </ul>
        </div>
        {/* Contact Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Contact</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">Saudi Arabia</h4>
              <p>Emaar Square, Sharafiyah, Jeddah</p>
              <p>📞 +966 5637 45 369</p>
              <p>📧 saudi@flick.network</p>
            </div>
            <div>
              <h4 className="font-bold">Malaysia</h4>
              <p>Wisma UOA 2, unit 13A, Level 15, Jalan Pinang, Kuala Lumpur</p>
              <p>📞 +60 11-2762 1784</p>
              <p>📧 malaysia@flick.network</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 mt-10 border-t border-gray-700 pt-4 text-sm flex justify-between">
        <p>© 2024 Flick Network. All rights reserved</p>
        <div className="flex space-x-4">
          <a>Privacy Policy</a>
          <a>Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

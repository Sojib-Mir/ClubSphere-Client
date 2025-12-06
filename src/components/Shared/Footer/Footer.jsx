import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-red-500/20 to-pink-600/20 py-8 px-4 md:max-w-7xl w-full mx-auto rounded-tr rounded-tl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* Brand Name*/}
        <div className="md:col-span-2">
          <Link to={"/"} className="font-bold text-xl flex items-center">
            <span className="mr-1">
              <img className="w-5 h-5 rounded" src="./logo-square.png" alt="" />
            </span>{" "}
            Club<sapn className="text-pink-500">Sphere</sapn>
          </Link>
          <p className="text-sm mt-3 opacity-80">
            Your smart solution for managing every club event and membership
            efficiently. With a simple interface, quick event registration and
            membership tracking, and secure data handling, we help you save time
            and effort. All your club activities, managed in one place —
            effortlessly.
          </p>
        </div>

        {/* Quick Link */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-200">
            Quick Link
          </h3>
          <ul className="space-y-2 mt-4">
            <li>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                Clubs
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-200">
            Resources
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                Learning Blog
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                Guides & Tips
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                Clubs Management
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                Events Management
              </Link>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-200">
            Community
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                Events Management Tips
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                Clubs Management Tips
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                Share Your Feedback
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                Help & Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-200">
            Connect With Us
          </h3>

          <div className="flex space-x-4 mb-4">
            <a
              href="https://facebook.com"
              className="text-gray-900 dark:text-white hover:text-blue-700"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-900 dark:text-white hover:text-blue-400"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-900 dark:text-white hover:text-pink-600"
            >
              <Instagram size={24} />
            </a>
          </div>

          <a
            href="mailto:support@clubcphere.com"
            className="flex items-center text-gray-900 dark:text-white hover:text-blue-600"
          >
            <Mail size={18} className="mr-2" /> support@clubsphere.com
          </a>
        </div>
      </div>

      <div className="border-t border-[#fa7171] mt-8 pt-4 text-center">
        <p className="text-sm text-gray-900 dark:text-gray-200">
          © {currentYear} ClubSphere | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

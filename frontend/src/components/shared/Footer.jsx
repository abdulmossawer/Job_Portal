import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Employ Hunter</h2>
            <p className="mb-4">Your gateway to discovering and applying for the best job opportunities that match your skills and career goals.</p>
            <ul className="flex space-x-4">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100">
                  <FaGithub size={24} />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100">
                  <FaLinkedin size={24} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100">
                  <FaTwitter size={24} />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2"><Link to="/" className="hover:text-gray-100">Home</Link></li>
              <li className="mb-2"><Link to="/jobs" className="hover:text-gray-100">Jobs</Link></li>
              <li className="mb-2"><Link to="/browse" className="hover:text-gray-100">Browse</Link></li>
              <li className="mb-2"><Link to="/about" className="hover:text-gray-100">About Us</Link></li>
              <li className="mb-2"><Link to="/contact" className="hover:text-gray-100">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p className="mb-2">123 Hutton Road, Asansol, 713347 (WB)</p>
            <p className="mb-2">Email: <a href="mailto:info@employhunter.com" className="hover:text-gray-100">info@employhunter.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="hover:text-gray-100">+123 456 7890</a></p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Employ Hunter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

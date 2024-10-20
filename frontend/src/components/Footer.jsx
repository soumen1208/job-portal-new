import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-white text-black-400 max-w-7xl mx-auto mt-20 mb-8 border-t border-t-gray-300">
            <div className="container mx-auto px-4 my-5">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and Description */}
                    <div className="mb-6 md:mb-0">
                        <img src="/logo.png" alt="Company Logo" className="h-12 mb-2" />
                        <p className="text-sm text-gray-500">
                            Your Company is dedicated to providing the best service with a commitment to quality and customer satisfaction.
                        </p>
                    </div>
                    <div className='flex flex-col gap-3'>

                        {/* Navigation Links */}
                        <div className="flex space-x-8 mb-6 md:mb-0">
                            <a href="/about" className="text-sm hover:text-gray-400">About Us</a>
                            <a href="/services" className="text-sm hover:text-gray-400">Services</a>
                            <a href="/contact" className="text-sm hover:text-gray-400">Contact</a>
                            <a href="/privacy" className="text-sm hover:text-gray-400">Privacy Policy</a>
                            <a href="/terms" className="text-sm hover:text-gray-400">Terms of Service</a>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex space-x-6 ">
                            <Link to='https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F'><img className='h-8 w-8 rounded-full' src="https://w7.pngwing.com/pngs/282/704/png-transparent-facebook-messenger-logo-icon-facebook-facebook-logo-blue-text-trademark-thumbnail.png" alt="" /></Link>
                            <Link to=''> <img className='h-8 w-8 rounded-full' src="https://w7.pngwing.com/pngs/722/1011/png-transparent-logo-icon-instagram-logo-instagram-logo-purple-violet-text-thumbnail.png" alt="" /> </Link>
                            <Link to=''><img className='h-8 w-8 rounded-full' src="https://w7.pngwing.com/pngs/511/605/png-transparent-in-logo-linkedin-diduco-ab-icon-linkedin-blue-angle-text-thumbnail.png" alt="" /></Link>
                            <Link to=''><img className='h-8 w-8 rounded-full' src="https://w7.pngwing.com/pngs/708/311/png-transparent-icon-logo-twitter-logo-twitter-logo-blue-social-media-area-thumbnail.png" alt="" /></Link>
                        </div>

                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
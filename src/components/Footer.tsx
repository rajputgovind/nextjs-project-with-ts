import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import fb from "../../public/facebook-round_svgrepo.com.svg";
import insta from "../../public/instagram-round_svgrepo.com.svg";
import twit from "../../public/twitter-round_svgrepo.com.svg";
import link from "../../public/linkedin-round_svgrepo.com.svg";
import logo from "../../public/AI-property-Logo-footer.svg";

const footerLinks = [
  {
    title: "About Us",
    links: [
      { name: "Company Overview", href: "/company-overview" },
      { name: "Our Mission", href: "/our-mission" },
      { name: "Team", href: "/team" },
      { name: "Career", href: "/career" },
      { name: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Property Search",
    links: [
      { name: "Find Your Dream Property", href: "/find-property" },
      { name: "Search by Location", href: "/search-location" },
      { name: "Search by Type", href: "/search-type" },
      { name: "Search by Price", href: "/search-price" },
      { name: "Latest Listings", href: "/latest-listings" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Home Loans", href: "/home-loans" },
      { name: "Property Valuation", href: "/property-valuation" },
      { name: "Market Analysis", href: "/market-analysis" },
      { name: "Virtual Tours", href: "/virtual-tours" },
      { name: "Expert Consultation", href: "/expert-consultation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "FAQ", href: "/faq" },
      { name: "Guides", href: "/guides" },
      { name: "Market Trends", href: "/market-trends" },
      { name: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { name: "Customer Support", href: "/customer-support" },
      { name: "Request a Callback", href: "/request-callback" },
      { name: "Feedback", href: "/feedback" },
    ],
  },
  //   {
  //     title: 'Social Links',
  //     links: [
  //       { name: 'Privacy Policy', href: '/customer-support' },
  //       { name: 'Terms of Use', href: '/request-callback' },

  //     ],
  //   },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FDE6F4]">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="flex flex-col items-center mb-8">
          <Image
            src={logo}
            alt="AI PROPERTY.SG Logo"
            width={100}
            height={100}
          />
        </div>

        <p className="text-center mb-12 max-w-3xl mx-auto text-[#3A3A3A] text-[16px] leading-[22px]">
          AI PROPERTY.SG is a leading property platform using AI to provide
          personalized recommendations and market insights, simplifying your
          real estate journey from search to final transaction. Explore
          confidently with our intuitive tools and dedicated support.
        </p>

        <div className="hidden md:grid md:grid-cols-5 gap-8 mb-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <p className="font-medium text-lg mb-4 text-black">
                {section.title}
              </p>
              <ul className="md:space-y-2 space-y-0">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-pink-500 transition-colors text-[14px] leading-4 text-[#3A3A3A]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="md:hidden grid grid-cols-2 gap-8 mb-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <p className="font-medium text-lg mb-4 text-black">
                {section.title}
              </p>
              <ul className="md:space-y-2 space-y-0">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-pink-500 transition-colors text-[14px] leading-4 text-[#3A3A3A]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="md:flex md:justify-between md:items-center md:border-t md:border-pink-200 md:pt-4">
          <p className="hidden md:flex text-sm mb-4 md:mb-0 text-center md:text-left">
            Copyright 2024 AI Property. All right Reserved
          </p>
          <div className="hidden md:flex md:space-x-4">
            <Link
              href="/privacy-policy"
              className="text-sm hover:text-pink-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="text-sm hover:text-pink-500 transition-colors"
            >
              Terms of Use
            </Link>
          </div>
          <div className="flex space-x-4 md:mb-0">
            <a
              href="#"
              className="text-gray-600 hover:text-pink-500 transition-colors"
            >
              {/* <Facebook size={24} /> */}
              <Image src={fb} alt="" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-pink-500 transition-colors"
            >
              {/* <Instagram size={24} /> */}
              <Image src={insta} alt="" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-pink-500 transition-colors"
            >
              {/* <Twitter size={24} /> */}
              <Image src={twit} alt="" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-pink-500 transition-colors"
            >
              {/* <Linkedin size={24} /> */}
              <Image src={link} alt="" />
            </a>
          </div>
        </div>

        {/* <div className="md:hidden mt-4 pt-4 border-t border-pink-200">
          <div className="flex justify-between items-center mb-4">
            <Link href="/privacy-policy" className="text-sm hover:text-pink-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="text-sm hover:text-pink-500 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div> */}
        
      </div>
      <div className="md:hidden bg-pink-500 text-white py-4 text-center">
        <p className="text-sm">
          Copyright 2024 AI Property. All right Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;

"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import bed from "../../public/bed.svg";
import tub from "../../public/Bath-Tub.svg";
import car from "../../public/Car.svg";
import heart from "../../public/heart.png";
import grey from "../../public/greyheart.png";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useRouter } from "next/navigation";

interface PropertyCardProps {
  id: string; // Add id prop
  imageUrl: string;
  // max_price: string;
  // min_price: string;
  location: string;
  // bedrooms: number;
  // bathrooms: number;
  parking: number;
  underOffer?: boolean;
  is_leasehold: boolean;
  lease_year: number;
  name: string
}

export default function PropertyCard({
  imageUrl,
  location,
  underOffer = false,
  id,
  is_leasehold,
  lease_year,
  name
}: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter
  // Function to show the popover
  const handleMouseEnter = () => {
    if (!token) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsHovered(true);
    }
  };

  // Function to hide the popover with a slight delay
  const handleMouseLeave = () => {
    if (!token) {
      timeoutRef.current = setTimeout(() => setIsHovered(false), 200);
    }
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true); // Open modal when clicking "Log in"
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false); // Close modal on successful login or close button click
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleImageClick = () => {
    router.push(`/single-property/${id}`);
  };
  return (
    <div className="bg-white rounded-lg shadow-md  p-2 relative">
      <div className="relative" onClick={handleImageClick}>
        <Image
          src={imageUrl}
          alt={`Property in ${location}`}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-lg"
        />
        {underOffer && (
          <span className="absolute bottom-2 left-2 bg-[#EF2BA0] text-white text-xs font-medium px-2 py-1 rounded-lg">
            Under Offer
          </span>
        )}
      </div>
      <div className="py-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-black">
            {name}
          </p>
          

          {/* Heart Icon with Hover Effect */}
          {/* <div
            className="relative "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={isHovered ? heart : grey}
              alt="Heart Icon"
              className="hover:cursor-pointer"
            />
            
            {isHovered && (
              <div
                className="absolute top-10 -right-12 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <p className="font-semibold text-black">Add to collection</p>
                <p className="text-sm text-gray-500">
                  Log in or sign up to add to collection. Save properties to
                  your collections and share with loved ones.
                </p>
                <div className="flex mt-3">
                  <button
                    className="text-pink-500 border border-pink-500 rounded-full px-4 py-1 mr-2"
                    onClick={handleLoginClick}
                  >
                    Log in
                  </button>
                  <button
                    className="bg-pink-500 text-white rounded-full px-4 py-1"
                    onClick={openSignUpModal}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            )}
          </div> */}
        </div>
        <p className="text-sm text-[#3A3A3A] truncate">{location}</p>
        <hr className="my-5" />
        <div className="flex justify-between text-[#443F6D]">
          <div className="flex items-center gap-3">
            <button className="bg-[#E9E8ED] text-[#443F6D] px-5 py-1 rounded-lg">
              {is_leasehold ? `Leasehold` : "Freehold"}
            </button>
          </div>
        </div>
      </div>
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={closeSignUpModal}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
      />
    </div>
  );
}

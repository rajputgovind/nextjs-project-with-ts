"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import space from '../../public/space.svg'
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import heart from "../../public/heart.png";
import grey from "../../public/greyheart.png";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

interface Images {
  _id: string;
  title: string;
  fileName: string;
  recordType: string;
  recordId: string;
  path: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface Listing {
  id: string;
  images: Images[];
  title: string;
  // priceRange: string;
  location: string;
  isFavorite: boolean;
}

function SampleNextArrow(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  const { onClick } = props;
  return (
    <button className="absolute right-4 top-1/2 z-10" onClick={onClick}>
      <ChevronRight size={20} className="text-white" />
    </button>
  );
}

function SamplePrevArrow(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  const { onClick } = props;
  return (
    <button className="absolute left-4 top-1/2 z-10" onClick={onClick}>
      <ChevronLeft size={20} className="text-white" />
    </button>
  );
}

export default function ListingCard({
  listing,
}: {
  listing: Listing | undefined;
}) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(listing?.isFavorite ?? false);
  const token = useSelector((state: RootState) => state.auth.token);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  if (!listing) {
    return null;
  }

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
  console.log("lisss", listing.images);
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md mb-5">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 overflow-hidden rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl">
          <div className="relative h-[205px] md:h-[260px] ">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${
                listing.images && listing?.images[0]?.path
              }`}
              alt={`${listing?.title}`}
              fill
              className="object-cover rounded-[26px] md:p-4"
            />
          </div>
        </div>
        <div className="relative w-full md:w-1/2 p-4 md:p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="px-4 py-2 bg-gray-100 text-[#443F6D] text-xs font-medium rounded-[50px]">
              {listing.title}
            </span>
            {/* <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart
                size={18}
                className={isFavorite ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}
              />
            </button> */}
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
          <hr className="mb-5" />
          {/* <h3 className="text-xl font-medium mb-2 text-black">{listing?.priceRange}</h3> */}
          <p className="text-[15px] text-[#3E4958] mb-6">{listing?.location}</p>
          <button
            onClick={() => router.push(`/single-property/${listing?.id}`)}
            className="w-full bg-[#EF2BA0] text-white py-2.5 px-4 rounded-[4px] text-[16px] font-medium hover:bg-pink-600 transition-colors"
          >
            View Property
          </button>
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

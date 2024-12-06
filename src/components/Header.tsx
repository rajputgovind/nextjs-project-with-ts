"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import logo from "../../public/Logo-AI.svg";
import SignUpModal from "../components/SignUpModal";
import menu from "../../public/menu.svg";
import user from "../../public/user-login.svg";
import LoginModal from "./LoginModal";
import cross from "../../public/cross.svg";
import crop from "../../public/cropped-logo.svg";
import profile2 from "../../public/profile3.png";
import heart from "../../public/heart.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { logout } from "@/app/redux/slice/authSlice";
import { ProfileSettingsModal } from "./ProfileSettingModal";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const userData = useSelector((state: RootState) => state.auth.user);
  const modalRef = useRef<HTMLDivElement>(null); // Add ref for modal content
  const [screenSize, setScreenSize] = useState("desktop");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("mobile");
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/project", label: "Project" },
    { href: "/home-loans", label: "Home Loans" },
    { href: "/faq", label: "Faq" },
    { href: "/contact", label: "Contact" },
    { href: "affordability-analysis", label: "Affordability  Analysis" },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the modal when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image className="custom-logo-width" src={logo} alt="" />
            </Link>
            {screenSize === "mobile" ? (
              <div className="flex items-center">
                {!token ? (
                  <>
                    <button
                      onClick={openSignUpModal}
                      className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium mr-4"
                    >
                      Sign up
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-900 mr-2"
                      onClick={openLoginModal}
                    >
                      <Image src={user} alt="" />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="text-black text-sm font-medium mr-2">
                      <span onClick={handleLogout}>Sign Out</span>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 mr-4">
                      <Image
                        src={heart}
                        alt=""
                        className="rounded-full"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 mr-2">
                      <Image
                        // src={profile}
                        src={
                          userData?.images && userData?.images[0].path
                            ? `${process.env.NEXT_PUBLIC_API_URL}${userData?.images[0].path}`
                            : profile2
                        }
                        alt=""
                        className="rounded-full"
                        width={30}
                        height={30}
                      />
                    </button>
                  </>
                )}
                <button
                  className="text-gray-600 hover:text-gray-900"
                  onClick={toggleMenu}
                >
                  {isMenuOpen ? (
                    <Image src={cross} alt="" />
                  ) : (
                    <Image src={menu} alt="" />
                  )}
                </button>
              </div>
            ) : screenSize === "tablet" ? (
              <div className="flex items-center">
                <nav className="flex space-x-4 mr-4">
                  {navLinks.slice(0, 3).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-black text-[18px] hover:text-pink-500"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                {!token ? (
                  <button
                    onClick={openSignUpModal}
                    className="text-pink-500 hover:text-pink-600 font-medium mr-4"
                  >
                    Sign Up
                  </button>
                ) : (
                  <>
                    <button className="mr-4">
                      <Image
                        src={heart}
                        alt=""
                        className="rounded-full"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button className="text-black text-sm font-medium mr-4">
                      <span onClick={handleLogout}>Sign Out</span>
                    </button>
                  </>
                )}

                <button
                  className="text-gray-600 hover:text-gray-900"
                  onClick={toggleMenu}
                >
                  <Image src={menu} alt="" />
                </button>
              </div>
            ) : (
              <>
                <nav className="hidden lg:flex space-x-8 text-black text-[18px] custom-text-header">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className=" hover:text-[#EC008C]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="hidden lg:flex items-center space-x-4 text-[18px] custom-text-header">
                  {!token ? (
                    <>
                      <button
                        onClick={openSignUpModal}
                        className="text-[#EC008C] hover:text-[#EC008C] font-medium"
                      >
                        Sign Up
                      </button>
                      <button
                        onClick={openLoginModal}
                        className="bg-[#EC008C] text-white px-5 py-1 rounded-md font-medium hover:bg-pink-600"
                      >
                        Sign in
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="mr-4">
                        <Image
                          src={heart}
                          alt=""
                          className="rounded-full"
                          width={30}
                          height={30}
                        />
                      </button>
                      <button className="text-black text-sm font-medium mr-4">
                        <span onClick={handleLogout}>Sign Out</span>
                      </button>
                    </>
                  )}

                  {token && (
                    <div
                      className="relative inline-block text-left"
                      ref={modalRef}
                    >
                      <button
                        className="text-gray-600 hover:text-gray-900 mr-4 focus:outline-none flex justify-center items-center"
                        onClick={toggleDropdown}
                      >
                        <Image
                          // src={profile}
                          src={
                            userData?.images && userData?.images[0]?.path
                              ? `${process.env.NEXT_PUBLIC_API_URL}${userData?.images[0]?.path}`
                              : profile2
                          }
                          alt="Profile"
                          className="rounded-full w-[30px] h-[30px] object-contain bg-white outline outline-[#EC008C]"
                          width={30}
                          height={30}
                        />
                      </button>
                      {isOpen && (
                        <div
                          className="absolute right-0 mt-2 w-44 bg-white rounded-[20px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                          onClick={handleOptionClick}
                        >
                          <div className="px-4 py-2">
                            <p className="text-[#EC008C] font-medium text-[16px]">
                              {userData?.name}
                            </p>
                            <hr className="my-1" />
                          </div>
                          <ul
                            className="py-1 overflow-hidden"
                            onClick={toggleProfileModal}
                          >
                            <li className="px-4 py-3 rounded-[20px] hover:bg-gray-100 cursor-pointer">
                              Profile
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Off-canvas Menu for Mobile and Tablet */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50  transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={toggleMenu}
        ></div>
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-30 transition-transform duration-300 ${
            isMenuOpen
              ? "transform translate-x-0"
              : "transform translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4">
            <Image
              src={crop}
              alt="Logo"
              className="w-[90px]"
              width={40}
              height={40}
            />
            <button onClick={toggleMenu}>
              <Image src={cross} alt="Close" />
            </button>
          </div>

          <div className="p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-600 hover:text-gray-900"
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
            {!token ? (
              <>
                <button
                  onClick={openSignUpModal}
                  className="block py-2 px-4 w-full text-center bg-pink-500 text-white font-medium rounded-md"
                >
                  Sign Up
                </button>
                <button
                  onClick={openLoginModal}
                  className="block py-2 px-4 w-full text-center bg-pink-500 text-white font-medium rounded-md mt-2"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="block py-2 px-4 w-full text-center text-black font-medium rounded-md"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* SignUp and Login Modals */}
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

      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={toggleProfileModal}
      />
      
    </>
  );
}

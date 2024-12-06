'use client'
import Image from "next/image";
import Link from "next/link";
import mail from "../../public/Register-icon.svg";
import lock from "../../public/lock-icon.svg";
import cross from "../../public/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { getSingleUser, login } from "@/app/redux/slice/authSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsSignUpModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function LoginModal({ isOpen, onClose, setIsSignUpModalOpen }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const modalRef = useRef<HTMLDivElement>(null); // Add ref for modal content
  // Handle login form submission
  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data;
    try {
      const response = await dispatch(login({ email, password })).unwrap(); // Dispatching login action
      if (response?.message === "Logged in successfully") {
        await dispatch(getSingleUser(response?.user?._id));
        reset();
        toast.success("Sign In successful!");
        onClose(); // Close modal on successful response
      }
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        reset();
        toast.error(error.message);
      } else if (typeof error === "string") {
        reset();
        toast.error(error);
      } else {
        console.error("Unknown Error:", error);
        reset();
        toast.error("An unexpected error occurred.");
      }
    }
    
  };

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {loading === true ? <Loader /> : ""}
      <div
        className="bg-white md:pt-20 md:pb-11 p-8 rounded-[30px] shadow-md md:w-[646px] sm:w-full max-w-full mx-4 relative md:px-[150px]"
        ref={modalRef}
      >
        <button
          onClick={onClose}
          className="absolute top-10 right-10 text-gray-500 hover:text-gray-700"
        >
          <Image src={cross} alt="" />
        </button>
        <div className="flex justify-center mb-4">
          <Image
            src="/AI-property-Logo-Vertical.png"
            alt="AI Property Logo"
            width={90}
            height={90}
          />
        </div>
        <h2 className="text-[16px] font-normal text-center text-[#443F6D] leading-5 mb-4">
          Welcome back, Log in to customize your search experience.
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <div className="relative">
            <Image
              src={mail}
              alt=""
              className="absolute left-3 top-1/2 transform -translate-y-1/2 "
            />
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border border-[#7D7999] rounded-[50px] focus:outline-none focus:ring-1 focus:ring-[#EF2BA0]"
            />
            {errors.email && typeof errors.email.message === "string" && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <Image
              src={lock}
              alt=""
              className="absolute left-3 top-1/2 transform -translate-y-1/2 "
            />

            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border border-[#7D7999] rounded-[50px] focus:outline-none focus:ring-1 focus:ring-[#EF2BA0]"
            />
            {errors.password && typeof errors.password.message === "string" && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#EF2BA0] text-white py-2 rounded-[50px] hover:bg-[#D72790] transition duration-300"
          >
            SIGN IN
          </button>
        </form>
        <p className="text-center mt-4 text-[16px] text-[#443F6D]">
          Don’t have an account?{" "}
          <Link 
            onClick={() => {
             onClose()
             setIsSignUpModalOpen(true)
            }} 
            href='' 
            className="text-[#EF2BA0] hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-center mt-4 text-[16px] leading-6 text-[#443F6D]">
          By registering you agree to the AI Property{" "}
          <Link href="/terms" className="text-[#EF2BA0] hover:underline">
            Term of Use
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-[#EF2BA0] hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

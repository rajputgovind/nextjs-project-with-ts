"use client";
import Image from "next/image";
import Link from "next/link";
// import { Mail, User, Lock, X } from 'lucide-react'
import mail from "../../public/Register-icon.svg";
import user from "../../public/user-icon.svg";
import lock from "../../public/lock-icon.svg";
import cross from "../../public/cross.svg";
// import AiPropertyImg from '../../public/AI-property-Logo-Vertical.png'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signUp } from "@/app/redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SignUpModal({ isOpen, onClose,  setIsLoginModalOpen}: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const modalRef = useRef<HTMLDivElement>(null); // Add ref for modal content
  
  const handleSignUp: SubmitHandler<FieldValues> = async (data) => {
    const { email, password, name } = data;
    try {
      await dispatch(signUp({ email, password, name })).unwrap();
      reset();
      toast.success("Sign up successful!");
      onClose(); // Close modal on successful response
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
}

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close modal when clicking outside
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
          {/* <X size={24} /> */}
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
          Register to customize your search experience and manage your
          notifications
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div className="relative">
            {/* <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} /> */}
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
            {/* <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} /> */}
            <Image
              src={user}
              alt=""
              className="absolute left-3 top-1/2 transform -translate-y-1/2 "
            />

            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Name"
              className="w-full pl-10 pr-3 py-2 border border-[#7D7999] rounded-[50px] focus:outline-none focus:ring-1 focus:ring-[#EF2BA0]"
            />
            {errors.name && typeof errors.name.message === "string" && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="relative">
            {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} /> */}
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
          <div className="relative">
            {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} /> */}
            <Image
              src={lock}
              alt=""
              className="absolute left-3 top-1/2 transform -translate-y-1/2 "
            />

            <input
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords don't match",
              })}
              type="password"
              placeholder="Confirm password"
              className="w-full pl-10 pr-3 py-2 border border-[#7D7999] rounded-[50px] focus:outline-none focus:ring-1 focus:ring-[#EF2BA0]"
            />
            {errors.confirmPassword &&
              typeof errors.confirmPassword.message === "string" && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#EF2BA0] text-white py-2 rounded-[50px] hover:bg-[#D72790] transition duration-300"
          >
            SIGN UP
          </button>
        </form>
        <p className="text-center mt-4 text-[16px] text-[#443F6D]">
          Already have an account?{" "}
          <Link 
            onClick={() => {
             onClose()
             setIsLoginModalOpen(true)
            }} 
            href='#'
            className="text-[#EF2BA0] hover:underline">
            Log in
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

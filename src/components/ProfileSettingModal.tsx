"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import edit from "../../public/Edit-profile.png";
import cover from "../../public/cover-img.png";
import profile2 from "../../public/profile3.png";
import userIcon from "../../public/user-icon.svg";
import mail from "../../public/mail-icon.png";
import unlock from "../../public/unlock-icon.png";
import globe from "../../public/Form-icon.png";
import city from "../../public/mail-icon.png";
import state from "../../public/mail-icon.png";
import genderIcon from "../../public/mail-icon.png";
import pin from "../../public/mail-icon.png";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { getSingleUser, updateUser } from "@/app/redux/slice/authSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loader from "./Loader";

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  country: string;
  state: string;
  city: string;
  gender: string;
  pin_code: string;
}

export function ProfileSettingsModal({
  isOpen,
  onClose,
}: ProfileSettingsModalProps) {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [showImage, setShowImage] = useState<string | undefined>(undefined);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user } = useSelector((state: RootState) => state.auth);
  const modalRef = useRef<HTMLDivElement>(null); // Add ref for modal content
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
      setShowImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (user) {
        const formData = new FormData();
        // formData.append("_id", user._id);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("country", data.country);
        formData.append("state", data.state);
        formData.append("city", data.city);
        formData.append("gender", data.gender);
        formData.append("pin_code", data.pin_code);
        if (profileImage) {
          formData.append("profile_image", profileImage);
        }
        await dispatch(updateUser({ id: user._id, userData: formData }));
        getSingleUserDatas();
        toast.success("Update successful!");
        onClose(); // Close modal on successful response
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred!");
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      getSingleUserData();
    }
  }, [isOpen]);

  const getSingleUserData = async () => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("country", user.country || "");
      setValue("state", user.state || "");
      setValue("city", user.city || "");
      setValue("gender", user.gender || "defaultOption");
      setValue("pin_code", user.pin_code || "");
    }
  };

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

  useEffect(() => {
    if (isOpen) {
      getSingleUserDatas();
    }
  }, [isOpen]);

  const getSingleUserDatas = async () => {
    if (user?._id) {
      const res = await dispatch(getSingleUser(user?._id));
      if (res?.payload[0]?.images?.length > 0) {
        if (res.payload[0]?.images?.length > 0) {
          setShowImage(
            `${process.env.NEXT_PUBLIC_API_URL}${res.payload[0].images[0].path}`
          );
        }
      }
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      {loading === true ? <Loader /> : ""}
      <div
        ref={modalRef} // Assign modalRef here
        className="bg-white rounded-3xl w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[570px] overflow-y-auto custom-scrollbar animate-in fade-in duration-300 relative px-7 pt-10 pb-[40px]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={24} />
        </button>

        {/* Cover Photo Section */}
        <div className="relative h-32">
          <Image
            src={cover}
            alt="Cover"
            fill
            className="object-cover rounded-t-3xl"
          />
          <div className="absolute -bottom-10 left-8 sm:left-10 md:left-12">
            <div className="relative">
              <Image
                // src={profile}
                src={showImage || profile2}
                alt="Profile"
                width={110}
                height={110}
                className="rounded-full border-4 border-white object-contain bg-white w-[110px] h-[110px]"
              />
              <label
                htmlFor="profilePhotoUpload"
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer"
              >
                <Image src={edit} alt="edit" width={22} />
              </label>
              <input
                id="profilePhotoUpload"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div className="bg-[#fff6fc] rounded-b-2xl p-7 mb-4 custom-shadow">
          <h2 className="text-[23px] font-medium mb-1 pt-8 text-[#0B0B0B]">
            Your Photo
          </h2>
          <p className="text-[#3A3A3A] text-[18px] mb-3">
            This will be displayed on your profile
          </p>
          <div className="flex gap-5 flex-wrap">
            <button className="px-5 py-2 bg-[#E7E7E7] rounded-[4px] text-sm font-semibold hover:bg-gray-50 transition-colors text-[18px]">
              Upload New
            </button>
            <button className="px-5 py-2 bg-[#EC008C] text-white rounded-[4px] text-sm font-semibold hover:bg-pink-600 transition-colors text-[18px]">
              Save
            </button>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="pt-10">
          <div className="bg-[#fff6fc] rounded-2xl p-7 mb-4 custom-shadow">
            <h2 className="text-[23px] font-medium text-[#0B0B0B] mb-4">
              Personal Information
            </h2>
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mb-5">
                <Image
                  src={userIcon}
                  className="absolute left-4 top-3"
                  alt=""
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full pl-11 pr-4 py-2 bg-transparent border-[#7D7999]  rounded-full text-sm border "
                  {...register("name")}
                />
              </div>
              <div className="relative mb-5">
                <Image src={mail} alt="" className="absolute left-4 top-3" />
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full pl-11 pr-4 py-2 bg-transparent border-[#7D7999]  rounded-full text-sm border "
                  disabled
                />
              </div>
              <div className="relative mb-5">
                <Image
                  src={unlock}
                  alt="unlock"
                  className="absolute left-4 top-3"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-11 pr-4 py-2 bg-transparent border-[#7D7999]  rounded-full text-sm border "
                  disabled
                />
              </div>
              <div className="relative mb-5">
                <Image
                  src={globe}
                  alt="globe"
                  className="absolute left-4 top-3"
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full pl-11 pr-4 py-2 bg-transparent border-[#7D7999]  rounded-full text-sm border "
                  {...register("country")}
                />
              </div>
              <div className="relative mb-5">
                <Image
                  src={state}
                  alt="state"
                  className="absolute left-4 top-3"
                />
                <input
                  type="text"
                  placeholder="State"
                  className="w-full pl-11 pr-4 py-2 bg-transparent border-[#7D7999] rounded-full text-sm border "
                  {...register("state")}
                />
              </div>
              <div className="relative mb-5">
                <Image
                  src={city}
                  alt="city"
                  className="absolute left-4 top-3"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full pl-11 pr-4 py-2 bg-transparent border-[#7D7999] rounded-full text-sm border "
                  {...register("city")}
                />
              </div>
              <div className="relative mb-5">
                <Image
                  src={genderIcon}
                  alt="genderIcon"
                  className="absolute left-4 top-3"
                />
                <select
                  className="w-full pl-11 pr-4 py-2 bg-transparent border-[#7D7999] rounded-full text-sm border "
                  {...register("gender")}
                >
                  <option value="defaultOption" disabled>
                    Select an option
                  </option>
                  {/* //Male, Female, Other */}
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="relative mb-5">
                <Image src={pin} alt="pin" className="absolute left-4 top-3" />
                <input
                  type="text"
                  placeholder="Pin Code"
                  className="w-full pl-11 pr-4 py-2 bg-transparent border-[#7D7999] rounded-full text-sm border "
                  {...register("pin_code")}
                />
              </div>
              <div className="flex justify-end pt-2">
                <button
                  className="px-5 py-2 bg-[#EC008C] text-white rounded-[4px] text-sm font-semibold hover:bg-pink-600 transition-colors text-[18px]"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

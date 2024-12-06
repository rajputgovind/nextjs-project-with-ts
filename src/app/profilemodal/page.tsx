"use client";

import { useState } from "react";
import Image from "next/image";
import edit from "../../../public/Edit-profile.png";
import cover from "../../../public/cover-img.png";
import profile from "../../../public/profile-setting-pic.png";
import user from '../../../public/user-icon.svg';
import mail from '../../../public/mail-icon.png';
import unlock from '../../../public/unlock-icon.png';
import globe from '../../../public/Form-icon.png'
import { X,} from "lucide-react";

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileSettingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-8">
      {/* Open Modal Button */}
      <button
        onClick={openModal}
        className="px-4 py-2 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors"
      >
        Open Modal
      </button>

      {/* Profile Settings Modal */}
      <ProfileSettingsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

function ProfileSettingsModal({ isOpen, onClose }: ProfileSettingsModalProps) {
  // const [profilePhoto, setProfilePhoto] = useState(
  //   "/placeholder.svg?height=100&width=100"
  // );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[804px] overflow-y-auto custom-scrollbar animate-in fade-in duration-300 relative px-7 pt-20 pb-[40px]">
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
                src={profile}
                alt="Profile"
                width={110}
                height={110}
                className="rounded-full border-4 border-white object-cover"
              />
              <label
                htmlFor="profilePhotoUpload"
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer"
              >
                <Image src={edit} alt="" width={22} />
              </label>
              <input id="profilePhotoUpload" type="file" className="hidden" />
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
        {/* Content Section */}
        <div className="pt-10">
          {/* Photo Upload Section */}

          {/* Personal Information Section */}
          <div className="bg-[#fff6fc] rounded-2xl p-7 mb-4 custom-shadow">
            <h2 className="text-[23px] font-medium text-[#0B0B0B] mb-4">
              Personal Information
            </h2>
            <form className="space-y-3">
              <div className="relative mb-5">
                <Image src={user} className="absolute left-4 top-3" alt=""/>
                            
                  
              
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full pl-11 pr-4 py-2 bg-transparent border-[#7D7999]  rounded-full text-sm border "
                />
              </div>
              <div className="relative mb-5">
                <Image src={mail} alt="" className="absolute left-4 top-3"/>
                
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full pl-11 pr-4 py-2 bg-transparent border-[#7D7999]  rounded-full text-sm border "
                />
              </div>
              <div className="relative mb-5">
                <Image src={unlock} alt="" className="absolute left-4 top-3"/>
                
                  
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-11 pr-4 py-2 bg-transparent border-[#7D7999]  rounded-full text-sm border "
                />
              </div>
              <div className="relative mb-5">
              <Image src={globe} alt="" className="absolute left-4 top-3"/>
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full pl-11 pr-4 py-2 bg-transparent border-[#7D7999]  rounded-full text-sm border "
                />
              </div>
              <div className="flex justify-end pt-2">
                <button className="px-5 py-2 bg-[#EC008C] text-white   rounded-[4px] text-sm font-semibold hover:bg-pink-600 transition-colors text-[18px]">
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

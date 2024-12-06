"use client";

import { Phone, Mail, Globe, MapPin, MailIcon, PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import night from "../../../public/night-city.png";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { contactUs } from "../redux/slice/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  contactUsValidation,
  ContactUsValidationType,
} from "@/validations/contactUsSchema";

const ContactUsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsValidationType>({
    resolver: yupResolver(contactUsValidation),
  });

  const handleSendMessage: SubmitHandler<FieldValues> = async (data) => {
    const { full_name, email, contact_no, message } = data;
    try {
      const result = await dispatch(
        contactUs({ full_name, email, contact_no, message })
      ).unwrap();
      if (result?.success) {
        toast.success(result?.message);
        reset();
      }
    } catch (error: unknown) {
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

  const handleCallUsClick = () => {
    window.location.href = `tel:+$13165550116`;
  };

  const handleEmailclick = () => {
    window.location.href = "mailto:propertyai@gmail.com";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <Image src={night} alt="City skyline" fill className="" priority />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 md:pt-[100px]">
        <div className="mx-auto">
          <div className="grid md:grid-cols-2 gap-8 ">
            {/* Contact Info */}
            <div>
              <h1 className="text-[24px] font-medium leading-[24px] text-[#0B0B0B] mb-4">
                We&apos;d Love to Hear From You!
              </h1>
              <p className="text-[#3A3A3A] leading-[22px] mb-12 max-w-2xl">
                Have questions or need assistance? Whether you&apos;re looking
                for more information about our services or just want to say
                hello, our team is here to help. Please fill out the form below,
                and we&apos;ll get back to you as soon as possible.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1 */}
                <div
                  className="bg-white rounded-lg p-4 flex items-center space-x-4 shadow-sm border border-[#A3A0B7]"
                  onClick={handleCallUsClick}
                >
                  <div className="w-14 h-14 bg-[#FDE6F4] rounded-[4px] flex items-center justify-center">
                 <PhoneCallIcon className="w-[19px] h-[19px]"/>
                  </div>
                  <div>
                    <div className="font-medium">Call Us</div>
                    <div className="text-[#7D7999]">(316) 555-0116</div>
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  className="bg-white rounded-lg p-4 flex items-center space-x-4 shadow-sm border border-[#A3A0B7]"
                  onClick={handleEmailclick}
                >
                  <div className="w-14 h-14 bg-[#FDE6F4] rounded-[4px] flex items-center justify-center">
                  <MailIcon className="w-[19px] h-[19px]"/>
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-[#7D7999]">propertyai@gmail.com</div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-lg p-4 flex items-center space-x-4 shadow-sm border border-[#A3A0B7]">
                  <div className="w-14 h-14 bg-[#FDE6F4] rounded-[4px] flex items-center justify-center">
                    <Globe className="w-[19px] h-[19px]" />
                  </div>
                  <div>
                    <div className="font-medium">Website</div>
                    <div className="text-[#7D7999]">alma.lawson@example.com</div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-lg p-4 flex items-center space-x-4 shadow-sm border border-[#A3A0B7]">
                  <div className="w-14 h-14 bg-[#FDE6F4] rounded-[4px] flex items-center justify-center">
                    <MapPin className="w-[19px] h-[19px]" />
                  </div>
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-[#7D7999]">
                      1901 Thornridge Cir. 
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="bg-[#FFF6FC] border border-[#F796D0] py-10 px-7 rounded-[20px]">
              <h2 className="text-2xl font-semibold mb-9">Contact Us</h2>
              <form
                className="space-y-8"
                onSubmit={handleSubmit(handleSendMessage)}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="rounded-full border-[#7D7999] bg-white w-full px-5 py-4 border"
                    {...register("full_name")}
                  />
                  {errors.full_name &&
                    typeof errors.full_name.message === "string" && (
                      <p className="text-red-500">{errors.full_name.message}</p>
                    )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="rounded-full border-[#7D7999] bg-white w-full px-5 py-4 border"
                    {...register("email")}
                  />
                  {errors.email && typeof errors.email.message === "string" && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Contact No"
                    className="rounded-full border-[#7D7999] bg-white w-full px-5 py-4 border"
                    {...register("contact_no")}
                  />
                  {errors.contact_no &&
                    typeof errors.contact_no.message === "string" && (
                      <p className="text-red-500">
                        {errors.contact_no.message}
                      </p>
                    )}
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    className="min-h-[120px] rounded-3xl border-[#7D7999] bg-white resize-none w-full px-5 py-4 border"
                    {...register("message")}
                  />
                  {errors.message &&
                    typeof errors.message.message === "string" && (
                      <p className="text-red-500">{errors.message.message}</p>
                    )}
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="rounded bg-[#EC008C] hover:bg-pink-600 text-white px-5 py-2 font-semibold text-[18px]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[536px] w-full mt-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2950.1997293350946!2d-71.0552375!3d42.3599611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37014d5da4937%3A0x15bb76d3c7c385e6!2sBoston%2C%20MA%2C%20USA!5e0!3m2!1sen!2s!4v1625761977556!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default ContactUsPage;

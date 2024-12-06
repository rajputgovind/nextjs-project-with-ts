import * as yup from "yup";

export const contactUsValidation = yup.object({
  full_name: yup
    .string()
    .min(3, "*Full name must be at least 3 characters long")
    .required("*Full name is required"),
  email: yup
    .string()
    .email("*Please enter a valid email address")
    .required("*Email is required"),
  contact_no: yup
    .string()
    .matches(/^[0-9]{10}$/, "*Contact number must be exactly 10 digits")
    .required("*Contact number is required"),
  message: yup
    .string()
    .min(10, "*Message must be at least 10 characters long")
    .required("*Message is required"),
});

export type ContactUsValidationType = yup.InferType<typeof contactUsValidation>;

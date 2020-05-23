import * as Yup from "yup";
import { SignUpFormValues, LoginFormValues } from "../types/types";

const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

// SIGN UP FORM
export const signUpFormValidationSchema = Yup.object({
  firstname: Yup.string()
    .required("First name is required")
    .min(1, "Needs more than 1 character")
    .max(30, "Must be 30 characters or less"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(1, "Needs more than 1 character")
    .max(30, "Must be 30 characters or less"),
  username: Yup.string()
    .required("Username is required")
    .min(4, "Needs more than 4 characters")
    .max(20, "Must be 20 characters or less"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Needs more than 8 characters")
    .max(20, "Must be 30 characters or less")
    .matches(passwordRegex, "Password is too weak"),
  confirmPassword: Yup.string()
    .required("Confirm needs to be confirmed")
    .oneOf([Yup.ref("password")], "Password does not match"),
});

export const signUpFormInitialValues: SignUpFormValues = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  confirmPassword: "",
};

// LOGIN FORM
export const loginFormValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Needs more than 4 characters")
    .max(20, "Must be 20 characters or less"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Needs more than 8 characters")
    .max(20, "Must be 30 characters or less")
    .matches(passwordRegex, "Password is too weak"),
});

export const loginFormInitialValues: LoginFormValues = {
  username: "",
  password: "",
};
import { useState } from "react";

const MAX_PASS_SYMBOLS = 8;
const EMAIL_VALIDATION = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

interface IErrors {
  email: string;
  password: string;
}

export default function errorHandler({
  email,
  password,
}: IErrors): IErrors | {} {
  console.log("errors :", {
    email,
    password,
  });

  let errors: any = {};
  console.log("errors :", errors);

  if (email && !EMAIL_VALIDATION.test(email)) {
    errors.email = "Email is not valid, try again!";
  }
  if (
    password.split("").length &&
    password.split("").length < MAX_PASS_SYMBOLS
  ) {
    errors.password = "Password should have more than 8 symbols, try again!";
  }

  return errors;
}

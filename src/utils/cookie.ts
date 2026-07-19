import { CookieOptions } from "express";
import { ENV } from "./env";
ENV
const isProduction = ENV.NODE_ENV === "production";

export const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "strict",
  maxAge: Number(ENV.ACCESS_TOKEN_MAX_AGE),   
};

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "strict",
  maxAge: Number(ENV.REFRESH_TOKEN_MAX_AGE), 
};
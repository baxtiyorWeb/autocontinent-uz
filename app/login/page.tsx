"use client";

import type React from "react";
import { JSX, useState, useRef, ChangeEvent, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TelegramBotButton } from "@/components/ui/telegram-bot-button";
import axios from "axios"; // Import axios for making HTTP requests
import api from "@/lib/api";

export default function LoginPage(): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(5).fill("")
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Create refs for each input field
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Effect to focus on the first input when the step changes
  useEffect(() => {
    if (step === "code") {
      inputRefs[0].current?.focus();
    }
  }, [step]);

  const handlePhoneSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      console.log("Phone number submitted:", phoneNumber);
      setStep("code");
    } catch (err) {
      console.error("Failed to request OTP:", err);
      setError("Telefon raqamini yuborishda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const fullCode = verificationCode.join("");

    try {
      const API_URL = "/verify-code/";
      const response = await api.post(API_URL, {
        code: fullCode,
        phone: phoneNumber,
      });

      if (response.status === 200 && response.data.success) {
        console.log("Verification successful:", response.data);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        console.log("Verification successful:", response.data);
        localStorage.setItem("accessToken", response.data.data.access);
        localStorage.setItem("refreshToken", response.data.data.refresh);
        console.log("User data saved to localStorage.");
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      } else {
        setError(
          response.data.message ||
            "Kodni tekshirishda kutilmagan muammo yuz berdi."
        );
      }
    } catch (err) {
      console.error("Verification failed:", err);
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 400) {
          setError(
            err.response.data.detail ||
              "Noto'g'ri kod yoki telefon raqami. Iltimos, qayta urinib ko'ring."
          );
        } else if (err.response.status === 404) {
          setError("Server topilmadi yoki xato manzil.");
        } else {
          setError(
            "Kodni tekshirishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring."
          );
        }
      } else {
        setError("Tarmoq xatosi yoki serverga ulanishda muammo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const value = e.target.value;

    // Handle pasting the entire code
    if (value.length === 5 && /^\d{5}$/.test(value)) {
      const newCode = value.split("");
      setVerificationCode(newCode);
      inputRefs[inputRefs.length - 1].current?.focus(); // Focus last input
      return;
    }

    // Handle single digit input
    const newVerificationCode = [...verificationCode];
    if (/^\d?$/.test(value)) {
      // Allow only a single digit or empty
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      // Move focus to the next input if a digit was entered
      if (value && index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && verificationCode[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const isCodeComplete = verificationCode.every(
    (digit) => digit !== "" && !isNaN(Number(digit))
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* <Header /> */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-sm mx-auto w-full">
          <Card className="shadow-none border-none bg-white/80 backdrop-blur-sm p-6">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-14 h-14 bg-gradient-to-r from-primary to-blue-700 rounded-xl flex items-center justify-center mb-3">
                {step === "phone" ? (
                  <Phone className="h-7 w-7 text-white" />
                ) : (
                  <MessageCircle className="h-7 w-7 text-white" />
                )}
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                {step === "phone"
                  ? "Telefon raqamini kiriting"
                  : "Kodni Kiriting"}
              </CardTitle>
              <p className="text-gray-600 text-sm mt-1.5">
                {step === "phone" ? (
                  "Tasdiqlash kodi uchun telefon raqamingizni kiriting."
                ) : (
                  <Link href={"https://t.me/avtokontinentuz_bot"}>
                    @avtokontinentuz_bot telegram botiga kiring va 1 daqiqalik
                    kodingizni oling
                  </Link>
                )}
              </p>
            </CardHeader>

            <CardContent className="p-0">
              {step === "phone" && (
                <form onSubmit={handlePhoneSubmit} className="space-y-5">
                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="Telefon raqamingiz (e.g., +998901234567)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-11 text-base border-gray-300 focus:border-primary rounded-lg shadow-sm focus:ring-primary focus:ring-1"
                    required
                  />
                  {error && (
                    <p className="text-red-500 text-sm text-center mt-2">
                      {error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-primary-foreground font-semibold text-base"
                    disabled={isLoading || !phoneNumber}
                  >
                    {isLoading ? "Yuborilmoqda..." : "Kod olish"}
                  </Button>
                </form>
              )}

              {step === "code" && (
                <form onSubmit={handleCodeSubmit} className="space-y-5">
                  <div className="flex justify-center gap-2">
                    {verificationCode.map((digit, index) => (
                      <Input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className="w-12 h-14 text-2xl text-center font-bold border-gray-300 focus:border-primary rounded-lg shadow-sm focus:ring-primary focus:ring-1"
                        required
                        inputMode="numeric"
                        pattern="[0-9]"
                        ref={inputRefs[index]}
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm text-center mt-2">
                      {error}
                    </p>
                  )}

                  <div className="space-y-3">
                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-primary-foreground font-semibold text-base"
                      disabled={isLoading || !isCodeComplete}
                    >
                      {isLoading ? "Tekshirilmoqda..." : "Tasdiqlash"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-11 text-base"
                      onClick={() => {
                        setStep("phone");
                        setVerificationCode(Array(5).fill("")); // Reset code when changing number
                        setError(null);
                      }}
                      disabled={isLoading}
                    >
                      Raqamni o'zgartirish
                    </Button>
                  </div>
                </form>
              )}

              {step === "code" && (
                <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm mb-0.5">
                        Telegram bot
                      </h4>
                      <p className="text-xs text-blue-700">
                        Tasdiqlash kodi Telegram botimiz orqali yuboriladi.
                        Botga start bosing va kontaktingizni ulashing.
                      </p>
                      {/* <TelegramBotButton /> */}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-600">
              Muammo bormi?{" "}
              <Link
                href="/help"
                className="text-primary hover:text-blue-700 font-medium"
              >
                Yordam olish
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

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
  // We need a way to get the phone number.
  // For this example, I'll hardcode one. In a real app,
  // this would come from a previous input step or context.
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // State for phone number
  const [step, setStep] = useState<"phone" | "code">("phone"); // Start with phone input
  const [verificationCode, setVerificationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
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
  }, [step]); // Dependency array includes step

  const handlePhoneSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // In a real application, you'd send the phone number to your backend
    // to request an OTP. For this example, we'll just simulate success.
    try {
      // Simulate API call to request OTP (e.g., POST to /api/request-otp)
      // await axios.post("http://127.0.0.1:8000/api/request-otp/", { phone: phoneNumber });
      console.log("Phone number submitted:", phoneNumber);
      setStep("code"); // Move to code step on successful phone submission
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

    const fullCode = verificationCode.join(""); // Combine digits into a single string

    try {
      const API_URL = "/verify-code/";

      const response = await api.post(API_URL, {
        code: fullCode,
        phone: phoneNumber, // Send the phone number along with the code
      });

      if (response.status === 200) {
        // Assuming 200 OK for successful verification
        console.log("Verification successful:", response.data);
        // Redirect to home or previous page upon successful verification

        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      } else {
        setError("Kodni tekshirishda kutilmagan muammo yuz berdi.");
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
    const { value } = e.target;
    const newVerificationCode = [...verificationCode];

    if (value.length > 1) {
      newVerificationCode[index] = value[value.length - 1];
    } else {
      newVerificationCode[index] = value;
    }

    setVerificationCode(newVerificationCode);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
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
                        setVerificationCode(["", "", "", ""]); // Reset code when changing number
                        setError(null);
                      }}
                      disabled={isLoading}
                    >
                      Raqamni o'zgartirish
                    </Button>
                  </div>
                </form>
              )}

              {/* Telegram Bot Info - Always visible if it relates to obtaining the code */}
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
                      <TelegramBotButton />
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

      <Footer />
    </div>
  );
}

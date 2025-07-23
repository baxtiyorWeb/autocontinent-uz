"use client";

import type React from "react";
import { JSX, useState, useRef, ChangeEvent, useEffect } from "react"; // Import useEffect
import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header"; // Assuming these components exist and are correctly imported
import { Footer } from "@/components/footer"; // Assuming these components exist and are correctly imported
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TelegramBotButton } from "@/components/ui/telegram-bot-button"; // Assuming this component exists

export default function LoginPage(): JSX.Element {
  // Start directly at the "code" step
  const [step, setStep] = useState<"code">("code"); // Changed initial step to "code"
  const [verificationCode, setVerificationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]); // Array for 4 digits
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Create refs for each input field
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Effect to focus on the first input when the component mounts
  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []); // Empty dependency array means this runs once on mount

  const handleCodeSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to home or previous page
      window.location.href = "/"; // Misol uchun, bosh sahifaga yo'naltirish
    }, 1500);
  };

  const handleOtpChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = e.target;
    const newVerificationCode = [...verificationCode];

    // Only allow single digit
    if (value.length > 1) {
      newVerificationCode[index] = value[value.length - 1];
    } else {
      newVerificationCode[index] = value;
    }

    setVerificationCode(newVerificationCode);

    // Auto-focus to the next input field if a digit is entered
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

  // Check if all 4 digits are entered and are numeric
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
                {/* Always show MessageCircle icon since we are directly on the code step */}
                <MessageCircle className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Kodni Kiriting {/* Fixed title as per image */}
              </CardTitle>
              <p className="text-gray-600 text-sm mt-1.5">
                @qirikkibot telegram botiga kiring va 1 daqiqalik kodingizni
                oling. {/* Fixed description as per image */}
              </p>
            </CardHeader>

            <CardContent className="p-0">
              {/* This section will always render the OTP input form */}
              <form onSubmit={handleCodeSubmit} className="space-y-5">
                <div className="flex justify-center gap-2">
                  {" "}
                  {/* Flex container for OTP inputs */}
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1} // Each input takes only one digit
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      className="w-12 h-14 text-2xl text-center font-bold border-gray-300 focus:border-primary rounded-lg shadow-sm focus:ring-primary focus:ring-1"
                      required
                      inputMode="numeric" // Optimized for number input on mobile
                      pattern="[0-9]" // Only allow digits
                      ref={inputRefs[index]} // Assign ref to each input
                    />
                  ))}
                </div>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-primary-foreground font-semibold text-base"
                    disabled={isLoading || !isCodeComplete} // Validate if all 4 digits are entered
                  >
                    {isLoading ? "Tekshirilmoqda..." : "Tasdiqlash"}
                  </Button>

                  {/* Removed "Raqamni o'zgartirish" button as phone number input is removed */}
                </div>
              </form>

              {/* Telegram Bot Info */}
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
                      Tasdiqlash kodi Telegram botimiz orqali yuboriladi. Botga
                      start bosing va kontaktingizni ulashing.
                    </p>
                    <TelegramBotButton  />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help text */}
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

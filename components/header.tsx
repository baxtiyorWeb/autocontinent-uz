"use client";

import type React from "react";
import { type JSX, useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Phone,
  MapPin,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Define a type for the user data we expect from localStorage
interface UserData {
  phone: string;
  verified_at: string;
  expires_at: string;
}

export function Header(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Effect to check for user data in localStorage on component mount
  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      localStorage.removeItem("userData"); // Clear corrupted data
    }
  }, []);

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
    setIsDropdownOpen(false);
    // Optionally, redirect to the homepage or login page
    window.location.href = "/";
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-white py-2 hidden lg:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              +998 (71) 123-45-67
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>Bepul yetkazib berish 500,000 so'mdan yuqori xaridlarda</span>
          </div>
        </div>
      </div>

      {/* Main header content */}
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#007bff] text-white p-2 rounded-lg">
            <span className="font-bold text-xl">AK</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-xl text-gray-900">AvtoKontinent</h1>
            <p className="text-sm text-gray-600">Avto ehtiyot qismlar</p>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-4 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Qidirish... (masalan: motor, tormoz, filtr)"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/favorites">
              <Heart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                2
              </Badge>
            </Link>
          </Button>

          {/* Auth Section: Shows user info or login button */}
          {userData ? (
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">+{userData.phone}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-semibold">Profil</p>
                    <p className="truncate">+{userData.phone}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              className="hidden sm:flex items-center gap-2 bg-transparent"
              asChild
            >
              <Link href="/login">
                <User className="h-4 w-4" />
                Kirish
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Mahsulotlar va turkumlar izlash"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
    </header>
  );
}

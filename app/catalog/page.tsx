"use client";
import Link from "next/link";
import { Search, Heart, ChevronRight, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { mainCategories } from "@/data/categories";
import type { JSX } from "react";

export default function CatalogPage(): JSX.Element {
  return (
    <>
      {" "}
      {/* Only visible on mobile */}
      <main className="container mx-auto px-4 py-6">
        {/* Search bar and Heart icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Mahsulotlar va turkumlar izlash"
              className="pl-10 pr-4 py-2 w-full text-sm"
            />
          </div>
          <Link href="/favorites" className="text-gray-600 hover:text-gray-900">
            <Heart className="h-5 w-5" />
          </Link>
        </div>

        {/* Category List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {mainCategories.map((category, index) => (
            <Collapsible key={index} className="w-full">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <category.icon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-800">
                      {category.name}
                    </span>
                  </div>
                  {category.subcategories &&
                  category.subcategories.length > 0 ? (
                    <ChevronDown className="h-5 w-5 text-gray-500 data-[state=open]:rotate-180 transition-transform" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </CollapsibleTrigger>
              {category.subcategories && category.subcategories.length > 0 && (
                <CollapsibleContent className="px-4 pb-2">
                  <ul className="space-y-2 py-2">
                    {category.subcategories.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={sub.href}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700 text-sm"
                        >
                          <sub.icon className="h-4 w-4 text-gray-500" />
                          <span>{sub.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              )}
            </Collapsible>
          ))}
        </div>
      </main>
    </>
  );
}

interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  bgColor: string;
}

export const banners: Banner[] = [
  {
    id: 1,
    title: "Chevrolet ehtiyot qismlari",
    description: "Eng sifatli va arzon narxlarda",
    // Chevrolet ehtiyot qismlari yoki avtomobilining yuqori sifatli rasmini toping
    image:
      "https://www.autozone.com/cdn/images/B2C/US/media/Landing/RAAutoParts/PartsZone-d.webp",
    link: "/categories/chevrolet",
    bgColor: "bg-gradient-to-r from-primary via-blue-700 to-indigo-800",
  },
  {
    id: 2,
    title: "Mercedes-Benz qismlari",
    description: "Original va sifatli mahsulotlar",
    // Mercedes-Benz avtomobili yoki uning original qismlarining zamonaviy rasmini toping
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeIWYkNlTtT_3_FOAuSZM4gQrsrmFGX1U8qw&s",
    link: "/categories/mercedes",
    bgColor: "bg-gradient-to-r from-slate-700 via-gray-800 to-slate-900",
  },
  {
    id: 3,
    title: "Bepul yetkazib berish",
    description: "500,000 so'mdan yuqori xaridlarda",
    // Yetkazib berish, pochta qutisi yoki qadoqlash mavzusidagi dinamik, ko'zni qamashtiruvchi rasm
    image:
      "https://media.istockphoto.com/id/1447292368/photo/close-up-view-of-delivery-man-organizing-packages-before-handing-package-to-customers.jpg?s=612x612&w=0&k=20&c=LUnr_gfYKWWEGG-Qn46g2kAb3FZUDuhoJJBe0cUEpwE=",
    link: "/delivery",
    bgColor: "bg-gradient-to-r from-emerald-600 via-green-700 to-teal-800",
  },
];

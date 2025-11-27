// 🔄 TODO: Replace with API call when backend is ready
// Example: export async function getCarouselImages() {
//   const res = await fetch('/api/carousel-images')
//   return res.json()
// }

export const carouselImages = [
  "/img/carousel-1.png",
  "/img/carousel-1.png",
  "/img/carousel-1.png",
  "/img/carousel-1.png",
  "/img/carousel-1.png",
]

// 🔄 TODO: Replace with API call when backend is ready
export const carouselImagesMobile = [
  "/img/carousel-1-mobile.png",
  "/img/carousel-1-mobile.png",
  "/img/carousel-1-mobile.png",
  "/img/carousel-1-mobile.png",
  "/img/carousel-1-mobile.png",
]

// 🔄 TODO: Replace with API call when backend is ready
// Example: export async function getCategories() {
//   const res = await fetch('/api/categories')
//   return res.json()
// }

export type Category = {
  title: string
  image: string
  imageMobile: string
  href: string
  position: "top" | "bottom"
  imageClassName?: string
  containerClassName?: string
}

export const categories: Category[] = [
  {
    title: "Living Room",
    image: "/img/section_1.png",
    imageMobile: "/img/mobile/section_1_mobile.png",
    href: "#",
    position: "top",
    imageClassName: "md:w-full 2xl:w-full",
    containerClassName: "row-span-2",
  },
  {
    title: "Bedroom",
    image: "/img/section_2.png",
    imageMobile: "/img/mobile/section_2_mobile.png",
    href: "#",
    position: "bottom",
    imageClassName: "md:w-full 2xl:absolute 2xl:right-0 2xl:top-0 2xl:w-full",
    containerClassName: "",
  },
  {
    title: "Kitchen",
    image: "/img/section_3.png",
    imageMobile: "/img/mobile/section_3_mobile.png",
    href: "#",
    position: "bottom",
    imageClassName: "md:w-full 2xl:absolute 2xl:right-0 2xl:top-0 2xl:w-full",
    containerClassName: "",
  },
]

// 🔄 TODO: Replace with API call when backend is ready
// Example: export async function getProducts() {
//   const res = await fetch('/api/products')
//   return res.json()
// }

export type ProductVariant = {
  color: string
  colorHex?: string // For color swatch display
  image: string
  images?: string[] // Gallery images for this variant
  sku: string
  quantity: number
  price: number
  price_sale?: number
  size?: string // "Small", "Medium", "Large"
  material?: string // "Fabric", "Leather", "Wood"
}

export type Product = {
  id: number
  name: string
  slug?: string
  status?: "New" | "Hot" | null
  discount?: number // percentage: 50 means 50%
  category: string
  measurement: string
  description: string
  stars_evaluate: number
  rating_count: number

  // Additional fields
  brand?: string
  material?: string
  weight?: number // in kg
  warranty?: string
  tags?: string[] // ["modern", "bestseller", "eco-friendly"]

  // SEO
  meta_title?: string
  meta_description?: string

  variants: ProductVariant[] // Multiple colors/options
  is_featured?: boolean
  is_active?: boolean
}

export const MockProducts: Product[] = [
  {
    id: 1,
    name: "Loveseat Sofa",
    status: "New",
    discount: 50,
    category: "Living Room",
    measurement: "80 x 35 x 40 inches",
    description: "A comfortable loveseat sofa perfect for small spaces.",
    stars_evaluate: 5,
    rating_count: 128,
    variants: [
      {
        color: "Blue",
        colorHex: "#4A90E2",
        image: "/img/product/product_1.png",
        sku: "LS-12345-BL",
        quantity: 10,
        price: 400,
        price_sale: 199,
      },
      {
        color: "Gray",
        colorHex: "#6B7280",
        image: "/img/product/product_1_gray.png",
        sku: "LS-12345-GR",
        quantity: 8,
        price: 400,
        price_sale: 199,
      },
      {
        color: "Beige",
        colorHex: "#D4B896",
        image: "/img/product/product_1_beige.png",
        sku: "LS-12345-BG",
        quantity: 5,
        price: 400,
        price_sale: 199,
      },
    ],
  },
  {
    id: 2,
    name: "Modern Armchair",
    status: null,
    discount: 30,
    category: "Living Room",
    measurement: "32 x 32 x 35 inches",
    description: "Elegant armchair with premium fabric upholstery.",
    stars_evaluate: 4,
    rating_count: 85,
    variants: [
      {
        color: "Gray",
        colorHex: "#6B7280",
        image: "/img/product/product_2.png",
        sku: "MA-67890-GR",
        quantity: 15,
        price: 299,
        price_sale: 209,
      },
    ],
  },
  {
    id: 3,
    name: "Dining Table Set",
    status: "Hot",
    category: "Kitchen",
    measurement: "60 x 36 x 30 inches",
    description: "6-seater dining table with matching chairs.",
    stars_evaluate: 4.5,
    rating_count: 64,
    variants: [
      {
        color: "Oak",
        colorHex: "#C19A6B",
        image: "/img/product/product_3.png",
        sku: "DT-11223-OAK",
        quantity: 5,
        price: 899,
      },
      {
        color: "Walnut",
        colorHex: "#5C4033",
        image: "/img/product/product_3_walnut.png",
        sku: "DT-11223-WAL",
        quantity: 3,
        price: 899,
      },
    ],
  },
  {
    id: 4,
    name: "Queen Bed Frame",
    category: "Bedroom",
    measurement: "80 x 60 x 45 inches",
    description: "Solid wood queen bed frame with modern design.",
    stars_evaluate: 4.5,
    rating_count: 92,
    variants: [
      {
        color: "Walnut",
        colorHex: "#5C4033",
        image: "/img/product/product_4.png",
        sku: "QB-44556-WAL",
        quantity: 8,
        price: 699,
      },
    ],
  },
  {
    id: 5,
    name: "Coffee Table",
    status: "New",
    category: "Living Room",
    measurement: "48 x 24 x 18 inches",
    description: "Modern glass-top coffee table with metal frame.",
    stars_evaluate: 4,
    rating_count: 156,
    variants: [
      {
        color: "Black",
        colorHex: "#000000",
        image: "/img/product/product_5.png",
        sku: "CT-22334-BK",
        quantity: 12,
        price: 249,
        price_sale: 199,
      },
      {
        color: "Gold",
        colorHex: "#D4AF37",
        image: "/img/product/product_5_gold.png",
        sku: "CT-22334-GD",
        quantity: 7,
        price: 279,
        price_sale: 229,
      },
    ],
  },
  {
    id: 6,
    name: "Office Desk",
    status: "Hot",
    discount: 25,
    category: "Office",
    measurement: "55 x 28 x 30 inches",
    description: "Ergonomic office desk with cable management system.",
    stars_evaluate: 4.5,
    rating_count: 203,
    variants: [
      {
        color: "White",
        colorHex: "#FFFFFF",
        image: "/img/product/product_6.png",
        sku: "OD-55667-WH",
        quantity: 15,
        price: 399,
        price_sale: 299,
      },
      {
        color: "Black",
        colorHex: "#000000",
        image: "/img/product/product_6_black.png",
        sku: "OD-55667-BK",
        quantity: 10,
        price: 399,
        price_sale: 299,
      },
    ],
  },
  {
    id: 7,
    name: "Bookshelf",
    category: "Living Room",
    measurement: "36 x 12 x 72 inches",
    description: "5-tier wooden bookshelf with modern ladder design.",
    stars_evaluate: 4.5,
    rating_count: 89,
    variants: [
      {
        color: "Oak",
        colorHex: "#C19A6B",
        image: "/img/product/product_7.png",
        sku: "BS-77889-OAK",
        quantity: 6,
        price: 349,
      },
      {
        color: "White",
        colorHex: "#FFFFFF",
        image: "/img/product/product_7_white.png",
        sku: "BS-77889-WH",
        quantity: 9,
        price: 349,
      },
    ],
  },
  {
    id: 8,
    name: "Nightstand",
    status: "New",
    discount: 35,
    category: "Bedroom",
    measurement: "20 x 18 x 24 inches",
    description: "Two-drawer nightstand with modern handles.",
    stars_evaluate: 4,
    rating_count: 112,
    variants: [
      {
        color: "Gray",
        colorHex: "#6B7280",
        image: "/img/product/product_8.png",
        sku: "NS-99001-GR",
        quantity: 20,
        price: 179,
        price_sale: 116,
      },
      {
        color: "Walnut",
        colorHex: "#5C4033",
        image: "/img/product/product_8_walnut.png",
        sku: "NS-99001-WAL",
        quantity: 14,
        price: 179,
        price_sale: 116,
      },
    ],
  },
  {
    id: 9,
    name: "Bar Stool Set",
    status: "Hot",
    category: "Kitchen",
    measurement: "16 x 16 x 30 inches",
    description: "Set of 2 adjustable bar stools with backrest.",
    stars_evaluate: 4.5,
    rating_count: 178,
    variants: [
      {
        color: "Black",
        colorHex: "#000000",
        image: "/img/product/product_9.png",
        sku: "BSS-11223-BK",
        quantity: 25,
        price: 189,
      },
      {
        color: "Brown",
        colorHex: "#8B4513",
        image: "/img/product/product_9_brown.png",
        sku: "BSS-11223-BR",
        quantity: 18,
        price: 189,
      },
    ],
  },
  {
    id: 10,
    name: "TV Stand",
    discount: 20,
    category: "Living Room",
    measurement: "60 x 18 x 22 inches",
    description: "Modern TV stand with open shelves and storage.",
    stars_evaluate: 4,
    rating_count: 145,
    variants: [
      {
        color: "Oak",
        colorHex: "#C19A6B",
        image: "/img/product/product_10.png",
        sku: "TV-33445-OAK",
        quantity: 11,
        price: 449,
        price_sale: 359,
      },
      {
        color: "Black",
        colorHex: "#000000",
        image: "/img/product/product_10_black.png",
        sku: "TV-33445-BK",
        quantity: 8,
        price: 449,
        price_sale: 359,
      },
    ],
  },
  {
    id: 11,
    name: "Accent Chair",
    status: "New",
    category: "Living Room",
    measurement: "28 x 30 x 36 inches",
    description: "Velvet accent chair with wooden legs.",
    stars_evaluate: 5,
    rating_count: 97,
    variants: [
      {
        color: "Navy",
        colorHex: "#000080",
        image: "/img/product/product_11.png",
        sku: "AC-55667-NV",
        quantity: 13,
        price: 329,
      },
      {
        color: "Pink",
        colorHex: "#FFC0CB",
        image: "/img/product/product_11_pink.png",
        sku: "AC-55667-PK",
        quantity: 9,
        price: 329,
      },
      {
        color: "Green",
        colorHex: "#228B22",
        image: "/img/product/product_11_green.png",
        sku: "AC-55667-GN",
        quantity: 6,
        price: 329,
      },
    ],
  },
  {
    id: 12,
    name: "Kitchen Island",
    status: "Hot",
    discount: 15,
    category: "Kitchen",
    measurement: "48 x 24 x 36 inches",
    description: "Multi-functional kitchen island with storage drawers.",
    stars_evaluate: 4.5,
    rating_count: 134,
    variants: [
      {
        color: "White",
        colorHex: "#FFFFFF",
        image: "/img/product/product_12.png",
        sku: "KI-77889-WH",
        quantity: 5,
        price: 699,
        price_sale: 594,
      },
      {
        color: "Gray",
        colorHex: "#6B7280",
        image: "/img/product/product_12_gray.png",
        sku: "KI-77889-GR",
        quantity: 4,
        price: 699,
        price_sale: 594,
      },
    ],
  },
  {
    id: 13,
    name: "Floor Lamp",
    category: "Living Room",
    measurement: "12 x 12 x 65 inches",
    description: "Modern arc floor lamp with marble base.",
    stars_evaluate: 4,
    rating_count: 167,
    variants: [
      {
        color: "Gold",
        colorHex: "#D4AF37",
        image: "/img/product/product_13.png",
        sku: "FL-99001-GD",
        quantity: 22,
        price: 179,
      },
      {
        color: "Black",
        colorHex: "#000000",
        image: "/img/product/product_13_black.png",
        sku: "FL-99001-BK",
        quantity: 19,
        price: 179,
      },
    ],
  },
  {
    id: 14,
    name: "Dresser",
    discount: 30,
    category: "Bedroom",
    measurement: "60 x 18 x 32 inches",
    description: "6-drawer dresser with brushed metal handles.",
    stars_evaluate: 4.5,
    rating_count: 121,
    variants: [
      {
        color: "White",
        colorHex: "#FFFFFF",
        image: "/img/product/product_14.png",
        sku: "DR-22334-WH",
        quantity: 7,
        price: 599,
        price_sale: 419,
      },
      {
        color: "Oak",
        colorHex: "#C19A6B",
        image: "/img/product/product_14_oak.png",
        sku: "DR-22334-OAK",
        quantity: 5,
        price: 599,
        price_sale: 419,
      },
    ],
  },
]

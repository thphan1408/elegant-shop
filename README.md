# 🛍️ 3legant - Modern E-commerce Platform

> A beautiful, performant, and feature-rich e-commerce website built with Next.js 16, React Query, and modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

---

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng nổi bật](#-tính-năng-nổi-bật)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt](#-cài-đặt)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Tính năng chi tiết](#-tính-năng-chi-tiết)
- [Tối ưu Performance](#-tối-ưu-performance)
- [API Integration](#-api-integration)
- [Scripts](#-scripts)
- [Deployment](#-deployment)
- [Tài liệu tham khảo](#-tài-liệu-tham-khảo)

---

## 🎯 Giới thiệu

**3legant** là một nền tảng thương mại điện tử hiện đại được xây dựng với mục tiêu cung cấp trải nghiệm mua sắm tuyệt vời cho người dùng. Dự án tập trung vào:

- ⚡ **Performance**: Tối ưu tốc độ tải và phản hồi
- 🎨 **UX/UI**: Giao diện đẹp, responsive, dễ sử dụng
- 🔒 **Security**: Bảo mật cao với XSS protection và input validation
- 📱 **Mobile-first**: Thiết kế ưu tiên mobile, hỗ trợ đầy đủ desktop
- 🚀 **Scalability**: Kiến trúc dễ mở rộng và maintain

---

## ✨ Tính năng nổi bật

### 🛒 Shopping Features

- ✅ **Product Catalog**: Hiển thị danh sách sản phẩm với pagination và filtering
- ✅ **Product Detail**: Trang chi tiết sản phẩm với variants (màu sắc, size)
- ✅ **Shopping Cart**: Giỏ hàng với persistence (lưu vào localStorage)
- ✅ **Related Products**: Gợi ý sản phẩm liên quan
- ✅ **Category Navigation**: Điều hướng theo danh mục
- ✅ **Search Functionality**: Tìm kiếm sản phẩm (UI ready)

### 🎨 UI/UX Features

- ✅ **Responsive Design**: Tối ưu cho mobile, tablet, desktop
- ✅ **Dark/Light Mode**: Chuyển đổi theme tự động theo system preference
- ✅ **Hero Carousel**: Banner quảng cáo với autoplay
- ✅ **Smooth Animations**: Transition mượt mà với CSS animations
- ✅ **Loading States**: Hiển thị trạng thái loading cho các thao tác async
- ✅ **Error Handling**: Xử lý lỗi thân thiện với người dùng
- ✅ **Toast Notifications**: Sonner toast với custom styles (success: green, error: red)
- ✅ **Clean UI Components**: Dropdown menus và select components không có hover effects
- ✅ **Accessible Components**: Radix UI components với ARIA support

### 🔐 Authentication & User Management

- ✅ **Sign In Page**: Đăng nhập với form validation và remember me
- ✅ **Sign Up Page**: Đăng ký tài khoản mới với privacy policy
- ✅ **Form Validation**: Sử dụng Zod và React Hook Form
- ✅ **Authentication Store**: Zustand store quản lý auth state với persistence
- ✅ **Route Protection**: Proxy middleware bảo vệ routes và redirect tự động
- ✅ **Token Management**: Tự động refresh token và xử lý 401 errors
- ✅ **Role-Based Access**: Phân quyền ADMIN, MODERATOR, USER
- ✅ **User Menu**: Dropdown menu với profile, settings, orders, shipping
- ✅ **Admin Dashboard**: Trang quản trị dành cho ADMIN
- ✅ **Profile Page**: Trang profile với avatar upload (sẵn sàng tích hợp API)

### 📧 Marketing Features

- ✅ **Newsletter Subscription**: Đăng ký nhận thông tin khuyến mãi
- ✅ **Articles Section**: Hiển thị bài viết/blog
- ✅ **Promotional Banners**: Banner quảng cáo khuyến mãi

### ⚡ Performance Optimizations

- ✅ **React Query Caching**: Cache API responses để giảm số lần gọi API
- ✅ **Server-Side Prefetching**: Prefetch data ở server để tăng tốc độ
- ✅ **Code Splitting**: Tự động split code theo routes
- ✅ **Image Optimization**: Tối ưu hình ảnh với Next.js Image component
- ✅ **Selective Re-rendering**: Tối ưu re-render với Zustand selectors

---

## 🛠️ Công nghệ sử dụng

### Core Framework

- **[Next.js 16](https://nextjs.org/)** - React framework với App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### State Management & Data Fetching

- **[Zustand](https://docs.pmnd.rs/zustand/)** - Lightweight state management cho cart và authentication
- **[React Query (TanStack Query)](https://tanstack.com/query)** - Server state management và caching

### Styling

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme switching

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Form validation resolvers

### HTTP Client

- **[Axios](https://axios-http.com/)** - HTTP client với interceptors
- **[DOMPurify](https://github.com/cure53/DOMPurify)** - XSS protection

### UI Components

- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel component
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notification library

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking

---

## 🚀 Cài đặt

### Yêu cầu hệ thống

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0 (hoặc yarn/pnpm)

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd elegant-shop
```

### Bước 2: Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### Bước 3: Cấu hình environment variables

Tạo file `.env.local` trong thư mục root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Backend URL (cho development proxy)
BACKEND_URL=http://localhost:8080/api
```

### Bước 4: Chạy development server

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000) trong browser để xem ứng dụng.

### Bước 5: Build cho production

```bash
npm run build
npm run start
```

---

## 📁 Cấu trúc dự án

```
elegant-shop/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes group
│   │   ├── sign-in/             # Sign in page
│   │   ├── sign-up/             # Sign up page
│   │   └── components/          # Auth-specific components
│   ├── (shop)/                  # Shop routes group
│   │   ├── product/[id]/       # Product detail page
│   │   └── layout.tsx          # Shop layout
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   └── newsletter-form.tsx      # Newsletter component
│
├── components/                   # React components
│   ├── ui/                      # Reusable UI components (Radix UI)
│   ├── mobile-ui/              # Mobile-specific components
│   ├── arrivals-product.tsx    # Product listing component
│   ├── articles.tsx            # Articles section
│   ├── cart.tsx                # Shopping cart sidebar
│   ├── header.tsx              # Navigation header
│   ├── footer.tsx              # Footer component
│   ├── hero-carousel.tsx       # Hero banner carousel
│   ├── product-detail.tsx      # Product detail component
│   ├── related-products.tsx   # Related products section
│   ├── query-provider.tsx      # React Query provider
│   └── theme-provider.tsx      # Theme provider
│
├── lib/                         # Utilities & helpers
│   ├── hooks/                  # Custom React hooks
│   │   └── use-products.ts     # Product fetching hooks
│   ├── query-keys.ts           # React Query keys constants
│   ├── utils.ts                # Utility functions
│   └── data.ts                 # Mock data (temporary)
│
├── services/                    # API services
│   ├── api.ts                  # Axios instance & interceptors
│   ├── api-utils.ts            # API response handlers
│   ├── product.service.ts      # Product API calls
│   └── index.ts                # Service exports
│
├── store/                       # State management
│   ├── cart-store.ts           # Zustand cart store
│   └── auth-store.ts           # Zustand auth store
│
├── types/                       # TypeScript types
│   ├── index.ts                # Common types
│   └── product.ts              # Product-related types
│
├── public/                      # Static assets
│   ├── img/                    # Images
│   └── svg/                    # SVG icons
│
├── proxy.ts                    # Next.js proxy middleware for route protection
│
├── docs/                        # Documentation
│   ├── ZUSTAND_CART_GUIDE.md   # Cart implementation guide
│   └── PERFORMANCE_OPTIMIZATION_GUIDE.md
│
├── next.config.ts               # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

---

## 🎯 Tính năng chi tiết

### 1. Shopping Cart với Zustand

Cart được implement với Zustand và có persistence vào localStorage:

**Tính năng:**

- ✅ Thêm/xóa sản phẩm
- ✅ Cập nhật số lượng
- ✅ Tự động merge items cùng variant
- ✅ Kiểm tra stock limit
- ✅ Tính toán subtotal/total tự động
- ✅ Lưu cart vào localStorage (persist qua reload)

**Code Example:**

```tsx
import { useCartStore } from "@/store/cart-store"

const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      color: variant.color,
      price: variant.price,
      quantity: 1,
      // ... other fields
    })
  }
}
```

📖 Xem chi tiết: [Zustand Cart Guide](./docs/ZUSTAND_CART_GUIDE.md)

### 2. React Query cho Data Fetching

Sử dụng React Query để quản lý server state và caching:

**Tính năng:**

- ✅ Centralized query keys
- ✅ Custom hooks cho products
- ✅ Server-side prefetching
- ✅ Automatic cache invalidation
- ✅ Optimistic updates support

**Code Example:**

```tsx
import { useProducts, useProduct } from "@/lib/hooks/use-products"

// Fetch all products
const { data: products, isLoading } = useProducts()

// Fetch single product
const { data: product } = useProduct(productId)
```

### 3. Product Detail Page

Trang chi tiết sản phẩm với:

- ✅ Variant selection (màu sắc)
- ✅ Quantity selector với stock validation
- ✅ Add to cart functionality
- ✅ Related products section
- ✅ Server-side prefetching cho performance

### 4. Responsive Design

- ✅ **Mobile-first approach**: Thiết kế ưu tiên mobile
- ✅ **Breakpoints**: sm, md, lg, xl, 2xl
- ✅ **Mobile menu**: Slide-out menu cho mobile
- ✅ **Responsive images**: Tự động optimize theo device
- ✅ **Touch-friendly**: Buttons và interactions tối ưu cho touch

### 5. Theme Switching

Hỗ trợ dark/light mode với `next-themes`:

- ✅ System preference detection
- ✅ Manual toggle
- ✅ Persist user preference
- ✅ Smooth transitions

---

## ⚡ Tối ưu Performance

### 1. React Query Caching Strategy

```tsx
// QueryProvider configuration
staleTime: 5 * 60 * 1000,      // 5 minutes
gcTime: 10 * 60 * 1000,         // 10 minutes (garbage collection)
refetchOnWindowFocus: false,     // Không refetch khi focus
refetchOnMount: false,          // Không refetch nếu data còn fresh
```

### 2. Server-Side Prefetching

Product detail page prefetch data ở server:

```tsx
// app/(shop)/product/[id]/page.tsx
const queryClient = new QueryClient()
await queryClient.prefetchQuery({
  queryKey: queryKeys.products.detail(id),
  queryFn: () => getProductById(id),
})
```

### 3. Code Splitting

- ✅ Automatic route-based code splitting
- ✅ Dynamic imports cho heavy components
- ✅ Lazy loading cho below-fold content

### 4. Image Optimization

- ✅ Next.js Image component với automatic optimization
- ✅ Responsive images với `sizes` attribute
- ✅ Priority loading cho LCP images
- ✅ WebP format support

### 5. Selective Re-rendering

Zustand selectors để tránh unnecessary re-renders:

```tsx
// ✅ Chỉ subscribe state cần dùng
const addItem = useCartStore((state) => state.addItem)
const items = useCartStore((state) => state.items)

// ❌ Tránh subscribe toàn bộ store
const { addItem, items, isOpen, ... } = useCartStore()
```

📖 Xem chi tiết: [Performance Optimization Guide](./docs/PERFORMANCE_OPTIMIZATION_GUIDE.md)

---

## 🔌 API Integration

### API Configuration

File `services/api.ts` chứa Axios instance với:

- ✅ Base URL configuration
- ✅ Request interceptors (thêm auth token)
- ✅ Response interceptors (sanitize XSS, error handling)
- ✅ Timeout configuration

### API Services

**Product Service** (`services/product.service.ts`):

- `getProducts(params?)` - Lấy danh sách sản phẩm
- `getProductById(id)` - Lấy chi tiết sản phẩm
- `getProductsByCategory(category)` - Lấy sản phẩm theo category
- `createProduct(data)` - Tạo sản phẩm mới (admin)
- `updateProduct(id, data)` - Cập nhật sản phẩm
- `deleteProduct(id)` - Xóa sản phẩm

### Response Handling

`services/api-utils.ts` xử lý các format response khác nhau:

- Pagination response: `{ data: [], total, page, limit }`
- Wrapped response: `{ statusCode: 200, data: {} }`
- Direct array: `[]`
- Single object: `{}`

### Error Handling

- ✅ 401 Unauthorized: Tự động clear token và redirect
- ✅ 404 Not Found: Return null thay vì throw error
- ✅ 500 Server Error: Hiển thị error message thân thiện
- ✅ Network Error: Hiển thị thông báo kiểm tra kết nối

---

## 📜 Scripts

```bash
# Development
npm run dev          # Chạy development server (port 3000)

# Production
npm run build        # Build production bundle
npm run start        # Chạy production server

# Code Quality
npm run lint         # Chạy ESLint
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code lên GitHub/GitLab
2. Import project vào Vercel
3. Cấu hình environment variables
4. Deploy tự động

### Environment Variables cho Production

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Build Optimization

- ✅ Automatic code splitting
- ✅ Tree shaking unused code
- ✅ Minification và compression
- ✅ Static asset optimization

---

## 📚 Tài liệu tham khảo

### Documentation Files

- [Zustand Cart Implementation Guide](./docs/ZUSTAND_CART_GUIDE.md)
- [Performance Optimization Guide](./docs/PERFORMANCE_OPTIMIZATION_GUIDE.md)

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

---

## 🎓 Các tính năng đã implement trong quá trình phát triển

### Phase 1: Foundation

- ✅ Setup Next.js 16 với App Router
- ✅ Cấu hình TypeScript và Tailwind CSS
- ✅ Tạo layout structure và routing
- ✅ Setup component library với Radix UI

### Phase 2: Core Features

- ✅ Product listing với React Query
- ✅ Product detail page với variants
- ✅ Shopping cart với Zustand + persistence
- ✅ Category navigation
- ✅ Related products section

### Phase 3: UI/UX Enhancements

- ✅ Responsive design cho mobile/tablet/desktop
- ✅ Dark/Light theme switching
- ✅ Hero carousel với autoplay
- ✅ Loading states và error handling
- ✅ Smooth animations và transitions

### Phase 4: Performance Optimization

- ✅ React Query caching strategy
- ✅ Server-side prefetching
- ✅ Image optimization với Next.js Image
- ✅ Code splitting và lazy loading
- ✅ Selective re-rendering với Zustand selectors

### Phase 5: API Integration

- ✅ Axios setup với interceptors
- ✅ API service layer
- ✅ Error handling và retry logic
- ✅ XSS protection với DOMPurify
- ✅ Response structure handling

### Phase 6: Authentication System

- ✅ Sign in page với form validation và remember me
- ✅ Sign up page với Zod validation và privacy policy
- ✅ Auth layout với sidebar
- ✅ Form error handling với toast notifications
- ✅ Zustand auth store với token management
- ✅ Proxy middleware cho route protection
- ✅ Token refresh và auto-logout handling

### Phase 7: User Management & Profile

- ✅ User menu với role-based access
- ✅ Profile page với avatar upload UI
- ✅ Admin dashboard với access control
- ✅ Protected pages (change-info, change-password, orders, shipping)
- ✅ Role-based menu items (ẩn orders/shipping cho ADMIN/MODERATOR)

### Phase 8: UI/UX Enhancements

- ✅ Sonner toast notifications với custom styling
- ✅ Clean dropdown menus không có hover effects
- ✅ Improved select components
- ✅ Better error handling và user feedback

### Phase 9: Marketing Features

- ✅ Newsletter subscription form
- ✅ Articles section
- ✅ Promotional banners
- ✅ Service cards section

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**3legant Team**

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Radix UI for accessible components
- Tailwind CSS for the utility-first approach
- All open-source contributors

---

**Made with ❤️ using Next.js and React**

# Design spec – Test Mobile App (FOSO)
Nguồn: https://www.figma.com/design/m4o6E4TzrfRnqNnmrXGsia/Test-Mobile-App---August---FOSO--Copy-?node-id=2869-20079 (trang "📱 Mobile app", 2228:2). Chỉ đọc, không comment.

## 1. Màn hình
| Màn | Node | Kích thước | Ảnh |
|---|---|---|---|
| Trang chủ (Home) | 2246:8425 | 393 × 3064 | screens/home.png |
| Danh mục (Category) | 2869:20079 | 393 × 975 | screens/category.png |
File chỉ có 2 màn này (không có chi tiết SP, giỏ hàng, tin tức, tài khoản → tự thiết kế theo cùng design system nếu muốn).

## 2. Màu (tokens Figma)
| Token | Hex | Dùng cho |
|---|---|---|
| brand/50 | #E6F1FF | nền nút "Mua ngay", sidebar danh mục |
| brand/500 | #0373F3 | link "Xem tất cả" (Category) |
| brand/600 | #025FCA | nền header/nền Home, tab active, text nút |
| brand/700 | #024897 | ngày bài viết, text sidebar |
| brand/800 | #013065 | tiêu đề section |
| text-primary / grey/800 | #1C252E | text chính |
| grey/700 | #454F5B | text phụ (đã bán) |
| grey/600 | #637381 | |
| text-disabled | #919EAB | placeholder, giá gốc gạch |
| grey/400 | #C4CDD5 | |
| grey/300 | #DFE3E8 | divider, dot inactive |
| grey/100 | #F9FAFB | nền content |
| Greyscale/400 | #9CA3AF | tab inactive |
| Greyscale/900 | #111827 | |
| white | #FFFFFF | card, search |
| error/main | #FF5630 | chấm chuông, gradient |
| error/dark | #B71D18 | giá bán, % giảm |
| error/darker | #7A0916 | text badge "Chỉ còn 1 sản phẩm" |
| Red/700 | #E53935 | |
| warning/lighter / light / main | #FFF5CC / #FFD666 / #FFAB00 | badge, icon flash |
| info/8% / 24% | #00B8D914 / #00B8D93D | |
Gradient: đồng hồ flash sale `error/main → error/dark` (~176°); icon tia sét `warning/light → warning/main`; nền flash sale `rgba(255,237,217,.2) → rgba(255,232,206,.3)` + blur.

## 3. Typography – font **Epilogue** (Regular 400 / Medium 500 / SemiBold 600 / Bold 700)
| Style | Size/Line | Weight | Dùng |
|---|---|---|---|
| h-section | 18/24 | 600 | "Danh mục tiêu biểu", "Bộ Lọc Không Khí" |
| title | 16/24 | 500–600 | tên SP, tiêu đề bài viết, "Sub Category 1" |
| body | 14/20 (letter 0.15) | 400–600 | placeholder, giá, nút |
| caption | 12/16 (letter 0.24) | 500 | tên danh mục, ngày, % giảm |
| small | 10/16 | 500 | "Xem tất cả", tab label, giá gốc |
| tiny | 8 | 600 | badge giỏ hàng |
Status bar: SF Pro Text Semibold.

## 4. Spacing / radius / shadow
- Lề màn 12, gap 4/8/12/16/24, section cách nhau 24. Search: h36, px12 py8, radius 999. Bell 40×40 (icon 28, chấm đỏ 10).
- Radius: 2, 4, 8 (card/ảnh/nút), 12 (khung danh mục), 20 (sheet/content Category), 100/999 (pill).
- Shadow card: `0 0 2 rgba(145,158,171,.2)` + `0 12 24 -4 rgba(145,158,171,.12)`; shadow mềm `0 4 16 rgba(0,0,0,.08)`; effect 1 `0 4 32 #00000014`.

## 5. Layout
### Home (scroll, nền brand/600 phía trên, content từ y=51)
| Section | y | size |
|---|---|---|
| Header: search 317×36 + bell | 0 | 369×52 |
| Banner mã NGUOIMOI | 76 | 369×65 |
| Danh mục tiêu biểu (item 79×98, gap 4, slider 60×8 thumb 24×6) | 165 | 369×161 |
| Carousel banner 369×170 + dots (10×3 active) | 350 | 369×181 |
| FLASH SALE (nền blur, card 156w, timer 3 ô đỏ) | 555 | 393×401 |
| Thương hiệu | 980 | 369×151 |
| Sản phẩm bán chạy | 1155 | 369×355 |
| Highlight 2 banner 177×270 | 1534 | 390×270 |
| Dành cho bạn | 1828 | 369×327 |
| Hàng mới về (nền riêng) | 2179 | 393×359 |
| Bài viết nổi bật (thumb 120, gap 16) | 2562 | 369×336 |
| Bottom bar | 2966 | 393×98 |
### Category (393×975)
Header xanh: back + search 273×36 + bell. Content sheet trắng bo 20 trên. Sidebar trái 90 rộng nền brand/50, item 100–116 cao, item active nền trắng nối liền content, text 12/16 brand/700. Bên phải 303 rộng: tiêu đề 18/24 + mũi tên; mỗi Sub Category: header 14 semibold + "Xem tất cả" 10 #0373F3, grid 3 cột (ảnh ~70, tên 12/16 center), divider grey/300. Bottom bar 98 (tab active brand/600 + indicator trên, badge giỏ 12 đỏ).

## 6. Components
SearchBar, BellButton(dot), CategoryChip(79×98, radius 8 trắng), BannerCarousel(dots), FlashSaleHeader(CountdownTimer ô đỏ gradient radius 4), ProductCard(ảnh vuông, badge "Chỉ còn 1 sản phẩm" pill warning, tên 16/24 2 dòng, giá 14 bold #B71D18, giá gốc 10 gạch #919EAB + %; ProgressBar đã bán gradient đỏ + icon lửa; nút "Mua ngay" h32 nền #E6F1FF text #025FCA radius 8), BrandItem, HighlightBanner, ArticleItem, SidebarItem, SubCategoryGrid, BottomTabBar(badge).

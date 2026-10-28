import type { ImageSource } from 'expo-image';

import { images } from './images';

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: ImageSource;
  soldLabel?: string;
  progress?: number;
  stockBadge?: string;
};

const baseName = 'Lọc gió động cơ Air Filter - Chevrolet';

function product(
  id: string,
  image: ImageSource,
  extra?: Partial<Pick<Product, 'soldLabel' | 'progress' | 'stockBadge' | 'name'>>,
): Product {
  return {
    id,
    name: extra?.name ?? baseName,
    price: 299000,
    originalPrice: 329000,
    discountPercent: 10,
    image,
    soldLabel: extra?.soldLabel,
    progress: extra?.progress,
    stockBadge: extra?.stockBadge,
  };
}

const endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);
export const flashSaleEndsAt = endOfToday.getTime();

export const flashProducts: Product[] = [
  product('flash-1', images.oilWhite, { soldLabel: 'Đã bán 88 sản phẩm', progress: 0.72 }),
  product('flash-2', images.oilWhite, { soldLabel: 'Đã bán 88 sản phẩm', progress: 0.64 }),
  product('flash-3', images.oilCut, {
    name: 'Lọc dầu động cơ Oil Filter - Toyota',
    soldLabel: 'Đã bán 64 sản phẩm',
    progress: 0.5,
  }),
  product('flash-4', images.oilYellow, {
    name: 'Lọc dầu động cơ Oil Filter - Honda',
    soldLabel: 'Đã bán 42 sản phẩm',
    progress: 0.38,
  }),
];

export const bestProducts: Product[] = [
  product('best-1', images.oilWhite, { stockBadge: 'Chỉ còn 1 sản phẩm' }),
  product('best-2', images.oilWhite, { stockBadge: 'Chỉ còn 1 sản phẩm' }),
  product('best-3', images.oilCut, { name: 'Lọc dầu động cơ Oil Filter - Kia', stockBadge: 'Chỉ còn 1 sản phẩm' }),
  product('best-4', images.oilBosch, { name: 'Lọc dầu Bosch - Ford Ranger', stockBadge: 'Chỉ còn 2 sản phẩm' }),
];

export const cartSeed: { product: Product; qty: number }[] = [
  { product: product('best-1', images.oilWhite), qty: 6 },
  { product: product('cart-oil', images.oilCut, { name: 'Lọc dầu động cơ Oil Filter - Chevrolet' }), qty: 4 },
  { product: product('cart-fuel', images.fuelInline, { name: 'Lọc nhiên liệu Fuel Filter' }), qty: 2 },
];

export const forYouProducts: Product[] = [
  product('fy-1', images.oilWhite),
  product('fy-2', images.oilCut, { name: 'Lọc dầu động cơ Oil Filter - Mazda' }),
  product('fy-3', images.cylinders, { name: 'Lọc gió động cơ Air Filter - Hino' }),
  product('fy-4', images.fuelCan, { name: 'Lọc nhiên liệu Fuel Filter - Isuzu' }),
];

export const newProducts: Product[] = [
  product('new-1', images.oilWhite),
  product('new-2', images.oilWhite, { name: 'Lọc gió động cơ Air Filter - Hyundai' }),
  product('new-3', images.oilYellow, { name: 'Lọc dầu động cơ Oil Filter - Mitsubishi' }),
  product('new-4', images.boxFilter, { name: 'Lọc gió điều hòa Cabin Filter - Toyota' }),
];

export const featuredCategories = [
  { id: 'air', categoryId: 'air', name: 'Bộ Lọc Không Khí', image: images.airPanel },
  { id: 'oil', categoryId: 'oil', name: 'Bộ Lọc Dầu', image: images.oilBosch },
  { id: 'fuel', categoryId: 'fuel', name: 'Bộ Lọc Nhiên Liệu', image: images.fuelInline },
  { id: 'cabin', categoryId: 'cabin', name: 'Bộ Lọc Trong Cabin', image: images.cabin },
  { id: 'fuel-2', categoryId: 'fuel', name: 'Bộ Lọc Nhiên Liệu', image: images.fuelCan },
  { id: 'air-2', categoryId: 'air', name: 'Bộ Lọc Không Khí', image: images.cylinders },
] as const;

export const brands = [
  { id: 'honda', name: 'Honda', image: images.honda },
  { id: 'ford', name: 'Ford', image: images.ford },
  { id: 'bmw', name: 'BMW', image: images.bmw },
  { id: 'audi', name: 'Audi', image: images.audi },
  { id: 'kia', name: 'Kia', image: images.kia },
  { id: 'nissan', name: 'Nissan', image: images.nissan },
  { id: 'chevrolet', name: 'Chevrolet', image: images.chevrolet },
  { id: 'volkswagen', name: 'Volkswagen', image: images.volkswagen },
  { id: 'lexus', name: 'Lexus', image: images.lexus },
  { id: 'volvo', name: 'Volvo', image: images.volvo },
] as const;

export const bannerSlides = [
  {
    id: 'sale',
    kind: 'promo' as const,
    eyebrow: 'Ưu đãi cuối tuần',
    title: 'Giảm đến\n40%',
    note: 'Bộ lọc chính hãng',
    colors: ['#025FCA', '#0373F3'] as const,
    image: images.oilYellow,
  },
  { id: 'hero', kind: 'image' as const, image: images.carousel },
  {
    id: 'flat',
    kind: 'promo' as const,
    eyebrow: 'Mới cực hot!',
    title: 'Đồng giá\n299K',
    note: 'Số lượng có hạn',
    colors: ['#013065', '#025FCA'] as const,
    image: images.oilWhite,
  },
  {
    id: 'ship',
    kind: 'promo' as const,
    eyebrow: 'Freeship',
    title: 'Đơn từ\n500K',
    note: 'Áp dụng toàn quốc',
    colors: ['#024897', '#00A3E0'] as const,
    image: images.fuelCan,
  },
];

export type Article = {
  id: string;
  title: string;
  excerpt?: string;
  date: string;
  image: ImageSource;
};

export const articles: Article[] = [
  {
    id: 'a1',
    title: 'Đầu phun sprinkler là gì?',
    excerpt: 'Cấu tạo, ứng dụng và nguyên lý hoạt động',
    date: '13/02/2025',
    image: images.articleA,
  },
  {
    id: 'a2',
    title: 'Cách chọn lọc gió động cơ đúng dòng xe Chevrolet',
    date: '13/02/2025',
    image: images.articleB,
  },
  {
    id: 'a3',
    title: 'Khi nào cần thay lọc nhiên liệu và lọc dầu?',
    date: '15/10/2025',
    image: images.articleC,
  },
];

const subNames = ['Bộ lọc gió', 'Bộ lọc trong cabin', 'Bộ lọc nhiên liệu', 'Bộ lọc gió', 'Bộ lọc gió', 'Bộ lọc gió'];
const subImages = [
  images.oilYellow,
  images.oilWhite,
  images.redFilter,
  images.oilCut,
  images.fuelCan,
  images.cylinders,
  images.boxFilter,
  images.airPanel,
  images.cabin,
];

export type SubItem = { id: string; name: string; image: ImageSource };
export type SubGroup = { id: string; title: string; items: SubItem[] };
export type CatalogCategory = {
  id: string;
  name: string;
  image: ImageSource;
  groups: SubGroup[];
};

function makeGroups(categoryId: string): SubGroup[] {
  return [1, 2].map((group) => ({
    id: `${categoryId}-sub-${group}`,
    title: `Sub Category ${group}`,
    items: subNames.map((name, index) => ({
      id: `${categoryId}-${group}-${index}`,
      name,
      image: subImages[(index + group) % subImages.length] ?? images.airPanel,
    })),
  }));
}

const catalogSeed = [
  { id: 'oil', name: 'Bộ Lọc Dầu', image: images.oilBosch },
  { id: 'air', name: 'Bộ Lọc Không Khí', image: images.airPanel },
  { id: 'fuel', name: 'Bộ Lọc Nhiên Liệu', image: images.fuelInline },
  { id: 'cabin', name: 'Bộ Lọc Trong Cabin', image: images.cabin },
  { id: 'hydraulic', name: 'Lọc Thủy Lực', image: images.cylinders },
  { id: 'gear', name: 'Lọc Hộp Số', image: images.oilYellow },
  { id: 'accessories', name: 'Phụ Kiện Lọc', image: images.boxFilter },
] as const;

export const catalog: CatalogCategory[] = catalogSeed.map((item) => ({
  ...item,
  groups: makeGroups(item.id),
}));

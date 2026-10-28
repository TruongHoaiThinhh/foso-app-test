const priceFormat = new Intl.NumberFormat('vi-VN');

export function formatPrice(value: number): string {
  return `${priceFormat.format(value)} đ`;
}

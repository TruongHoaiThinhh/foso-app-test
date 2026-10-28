# FOSO

## Cách chạy

Cần Node `22.13` trở lên (`.nvmrc`).

```bash
nvm use
npm install
npx expo start
```

Mở bằng Expo Go, simulator iOS (`npm run ios`) hoặc Android (`npm run android`).

```bash
npm run typecheck
npm run lint
```

## Technical

App bán phụ tùng ô tô. Không có backend.

- Expo SDK 58, React Native 0.88, React 19, TypeScript `strict`. Entry là `expo-router/entry`.
- Điều hướng bằng Expo Router. Tab nằm ở `app/(tabs)`: trang chủ, giỏ hàng, danh mục, tin tức, tài khoản. Màn hình nằm ở `src/features`.
- Alias `@/*` trỏ tới `src/*`.
- Font Epilogue. Màu, khoảng cách và kiểu chữ nằm ở `src/theme`.
- Giỏ hàng nằm trong React context `src/state/cart.tsx`, chỉ giữ trong bộ nhớ của phiên chạy.
- Sản phẩm, danh mục và bài viết lấy từ `src/mocks`.
- Ảnh dùng `expo-image`. Animation dùng Reanimated 4, vì SDK 58 trên React Native 0.88 không dùng Reanimated 3.

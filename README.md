# Sahibinden Clone 🚗📱

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-53.0.9-blue)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.76.0-green)](https://reactnative.dev)
[![Strapi](https://img.shields.io/badge/Strapi-Backend-purple)](https://strapi.io)

**Sahibinden Clone**, React Native ve Expo ile geliştirilmiş, Strapi backend ile entegre bir mobil uygulamadır. Kullanıcılar, kategoriler ve alt kategoriler arasında gezinebilir, ürünleri listeleyebilir ve ilan oluşturabilir. Modern bir kullanıcı arayüzü için NativeWind ile stilize edilmiştir ve Expo Router ile akıcı bir navigasyon sunar.

## 🎯 Özellikler

- **Dinamik Kategori ve Alt Kategori Listeleme**: Strapi API üzerinden kategoriler (`/api/categories`) ve alt kategoriler (`/api/subcategories`) dinamik olarak çekilir.
- **Ürün Listeleme**: Kategori ve alt kategori bazında filtrelenmiş ürün listeleri.
- **İlan Oluşturma**: Kullanıcılar yeni ilan ekleyebilir (`PostAdScreen`).
- **Kişiselleştirilmiş Öneriler**: Kullanıcıya özel içerik (`PersonalizedScreen`).
- **Özelleştirilmiş UI**: NativeWind v4 ile Tailwind CSS tabanlı stil.
- **Akıcı Navigasyon**: Expo Router ile sekmeli ve yığın navigasyon.
- **Performans**: React Native Reanimated ile optimize edilmiş animasyonlar.

## 🛠️ Teknoloji Yığını

| Teknoloji             | Sürüm       | Açıklama                                    |
|-----------------------|-------------|---------------------------------------------|
| React Native          | 0.76.0      | Mobil uygulama çerçevesi                   |
| Expo                  | 53.0.9      | Geliştirme ve dağıtım platformu            |
| NativeWind            | 4.1.23      | Tailwind CSS tabanlı stil                  |
| Expo Router           | 5.0.7       | Dosya tabanlı navigasyon                   |
| Strapi                | -           | Başsız CMS ve API backend                  |
| React Native Reanimated | 3.16.2    | Akıcı animasyonlar                         |
| React Native Vector Icons | 10.2.0  | Özelleştirilmiş ikonlar                    |
| React                 | 19.0.0      | UI kütüphanesi                             |

## 📋 Ön Koşullar

- **Node.js**: v18 veya üstü (`node --version`)
- **npm**: v9 veya üstü (`npm --version`)
- **Expo CLI**: `npm install -g expo-cli`
- **Strapi Backend**: Çalışan bir Strapi sunucusu
- **Mobil Cihaz/Emülatör**: Android Studio, Xcode veya Expo Go uygulaması

## 🚀 Kurulum

1. **Depoyu Klonlayın**:
   ```bash
   git clone https://github.com/azovayt/sahibinden-clone.git
   cd sahibinden-clone

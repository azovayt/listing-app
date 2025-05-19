# Sahibinden Clone 🚗📱

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-53.0.9-blue)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.76.0-green)](https://reactnative.dev)
[![Strapi](https://img.shields.io/badge/Strapi-5-purple)](https://strapi.io)

**Sahibinden Clone**, React Native ve Expo ile geliştirilmiş, VPS sunucusunda çalışan Strapi v4 backend ile entegre bir mobil uygulamadır. Kullanıcılar, kategoriler ve alt kategoriler arasında gezinebilir, ürünleri listeleyebilir ve ilan oluşturabilir. NativeWind ile modern bir arayüz ve Expo Router ile akıcı bir navigasyon sunar.

## 🎯 Özellikler

- **Dinamik Kategori ve Alt Kategori Listeleme**: Strapi API’sinden kategoriler (`/api/categories`) ve alt kategoriler (`/api/subcategories`) dinamik olarak çekilir.
- **Ürün Listeleme**: Kategori veya alt kategori bazında filtrelenmiş ürün listeleri.
- **İlan Oluşturma**: Kullanıcılar yeni ilan ekleyebilir (`PostAdScreen`).
- **Kişiselleştirilmiş Öneriler**: Kullanıcıya özel içerik önerileri (`PersonalizedScreen`).
- **Merkezi API Yönetimi**: Özel `useFetch` hook’u ile optimize edilmiş API çağrıları.
- **Modern UI**: NativeWind v4 ile Tailwind CSS tabanlı stil.
- **Akıcı Navigasyon**: Expo Router ile sekmeli ve yığın navigasyon (ikinci sıradaki arama sekmesi, gizli tab bar).
- **Performans**: React Native Reanimated ile akıcı animasyonlar.
- **Ikonlar**: Ionicons ile özelleştirilmiş kategori ve alt kategori ikonları.

## 🛠️ Teknoloji Yığını

| Teknoloji                     | Sürüm       | Açıklama                                    |
|-------------------------------|-------------|---------------------------------------------|
| React Native                  | 0.76.0      | Mobil uygulama çerçevesi                   |
| Expo                          | 53.0.9      | Geliştirme ve dağıtım platformu            |
| NativeWind                    | 4.1.23      | Tailwind CSS tabanlı stil                  |
| Expo Router                   | 5.0.7       | Dosya tabanlı navigasyon                   |
| Strapi                        | 5.0.0       | Başsız CMS ve API backend                  |
| React Native Reanimated       | 3.16.2      | Akıcı animasyonlar                         |
| React Native Vector Icons     | 10.2.0      | Özelleştirilmiş ikonlar (Ionicons)         |
| React                         | 19.0.0      | UI kütüphanesi                             |

## 📋 Ön Koşullar

- **Node.js**: v18 veya üstü (`node --version`)
- **npm**: v9 veya üstü (`npm --version`)
- **Expo CLI**: `npm install -g expo-cli`
- **Strapi Backend**: Çalışan bir Strapi sunucusu (ör. `http://195.85.207.74:1337`)
- **Mobil Cihaz/Emülatör**: Android Studio, Xcode veya Expo Go uygulaması

## 📁 Dosya Yapısı

```bash
sahibinden-clone/
├── app/
│   ├── (tabs)/
│   │   ├── (search)/
│   │   │   ├── index.tsx            # Kategori listeleme ekranı
│   │   │   ├── _layout.tsx          # Search uygulama düzeni
│   │   │   ├── subcategories.tsx    # Alt kategori listeleme
│   │   │   └── categoryproducts.tsx # Ürün listeleme
│   │   ├── personalized.tsx         # Kişiselleştirilmiş öneriler
│   │   ├── post-ad.tsx              # İlan oluşturma ekranı
│   │   ├── services.tsx             # Servisler ekranı
│   │   └── _layout.tsx              # Sekmeli navigasyon düzeni
│   ├── _layout.tsx                  # Genel uygulama düzeni
├── src/
│   ├── components/
│   │   ├── CustomHeader.tsx       # Özelleştirilmiş başlık bileşeni
│   │   ├── ProductList.tsx        # Ürün listeleme bileşeni
│   │   └── TabNavigator.tsx       # Sekme navigasyon bileşeni
│   ├── hooks/
│   │   └── useFetch.ts            # Merkezi API çağrıları için özel hook
│   ├── screens/
│   │   ├── PersonalizedScreen.tsx # Kişiselleştirilmiş öneriler ekranı
│   │   ├── PostAdScreen.tsx       # İlan oluşturma ekranı
│   │   ├── ServicesScreen.tsx     # Servisler ekranı
│   │   └── ShowCaseScreen.tsx     # Kategori vitrin ekranı
├── assets/
│   ├── S-Logo1.png                # Uygulama logosu
│   ├── S-Logo2.png                # Alternatif logo
├── .env                           # Çevresel değişkenler (gitignore'da)
├── .gitignore                     # Git tarafından yoksayılan dosyalar
├── babel.config.js                # Babel yapılandırması
├── tailwind.config.js             # NativeWind yapılandırması
├── global.css                     # Global stiller
├── metro.config.js                # Metro bundler yapılandırması
├── package.json                   # Bağımlılıklar ve script'ler
├── tsconfig.json                  # TypeScript yapılandırması
├── LICENSE                        # MIT Lisansı
└── README.md                      # Proje dokümantasyonu
```

## 📸 Ekran Görüntüleri

| Showcase | Search | Post Ad |
|-----------------|---------------------|---------------------|
| <img src="https://github.com/user-attachments/assets/52b8fd4e-a0f5-44ed-9d76-1a28a740c111" width="300" /> | <img src="https://github.com/user-attachments/assets/f7dddd65-56bb-4e68-9c9a-e55fa2123d1a" width="300" /> | <img src="https://github.com/user-attachments/assets/da10f356-952f-4c66-8978-86efb96e9cef" width="300" /> |

| Services | Personalized | Sub Category|
|-----------------|---------------------|---------------------|
| <img src="https://github.com/user-attachments/assets/e8c3706d-fb2b-4dea-a163-3377b00d2a5b" width="300" /> | <img src="https://github.com/user-attachments/assets/dc8db2cf-a8dc-4cd5-8652-d461ab128f75" width="300" /> | <img src="https://github.com/user-attachments/assets/c04d2030-9695-4a08-ad50-eb529bd47fb7" width="300" /> |




## 🚀 Kurulum

1. **Depoyu Klonlayın**:
   ```bash
   git clone https://github.com/azovayt/sahibinden-clone.git
   cd sahibinden-clone

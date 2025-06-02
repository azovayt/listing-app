# Sahibinden Clone 🚗📱

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-53.0.9-blue)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.76.0-green)](https://reactnative.dev)
[![Strapi](https://img.shields.io/badge/Strapi-5-purple)](https://strapi.io)

**Sahibinden Clone**, React Native ve Expo tabanlı, Vps sunucumdaki Strapi v5 backend ile entegre, sahibinden.com'u referans alan bir mobil uygulama. Kategoriler ve alt kategoriler arasında gezinme, ürün listeleme ve ilan oluşturma özellikleri sunar. NativeWind ile modern UI ve Expo Router ile akıcı navigasyon sağladım.

## 🎯 Özellikler

- **Dinamik Kategori ve Alt Kategori Listeleme**: Strapi API’sinden kategoriler (`/api/categories`) ve alt kategoriler (`/api/subcategories`) dinamik olarak çekilir.
- **Ürün Listeleme**: Kategori veya alt kategori bazında filtrelenmiş ürün listeleri.
- **İlan Oluşturma**: Kullanıcılar yeni ilan ekleyebilir (`PostAd`).
- **Kişiselleştirilmiş Öneriler**: Kullanıcıya özel içerik önerileri (`Personalized`).
- **Merkezi API Yönetimi**: Özel `useFetch` hook’u ile optimize edilmiş API çağrıları.
- **Modern UI**: NativeWind v4 ile Tailwind CSS tabanlı stil.
- **Akıcı Navigasyon**: Expo Router ile sekmeli navigasyon (ikinci sıradaki arama sekmesi, gizli tab bar).
- **Ikonlar**: Ionicons ile özelleştirilmiş kategori ve alt kategori ikonları.

## 🛠️ Teknoloji

| Teknoloji                 | Sürüm  | Açıklama                           |
| ------------------------- | ------ | ---------------------------------- |
| React Native              | 0.76.0 | Mobil uygulama çerçevesi           |
| Expo                      | 53.0.9 | Geliştirme ve dağıtım platformu    |
| NativeWind                | 4.1.23 | Tailwind CSS tabanlı stil          |
| Expo Router               | 5.0.7  | Dosya tabanlı navigasyon           |
| Strapi                    | 5.0.0  | Başsız CMS ve API backend          |
| React Native Vector Icons | 10.2.0 | Özelleştirilmiş ikonlar (Ionicons) |
| React                     | 19.0.0 | UI kütüphanesi                     |

## 📁 Dosya Yapısı

```bash
sahibinden-clone/
├── app/
│   ├── (tabs)/
│   │   ├── (search)/
│   │   │   ├── index.tsx            # Kategori listeleme ekranı
│   │   │   ├── _layout.tsx          # Arama uygulama düzeni
│   │   │   ├── subcategories.tsx    # Alt kategori listeleme
│   │   │   └── categoryproducts.tsx # Alt kategori ürün listeleme
│   │   ├── personalized.tsx         # Kişiselleştirilmiş içerik ekranı
│   │   ├── postad.tsx               # İlan oluşturma ekranı
│   │   ├── showcase.tsx             # Vitrin ekranı
│   │   ├── services.tsx             # Servisler ekranı
│   │   └── _layout.tsx              # Sekmeli navigasyon düzeni
│   ├── _layout.tsx                  # Genel uygulama düzeni
│   ├── login.tsx                    # Kullanıcı girişi ekranı
├── src/
│   ├── components/
│   │   ├── CustomHeader.tsx       # Özelleştirilmiş header
│   │   ├── ProductList.tsx        # Ürün listeleme
│   ├── hooks/
│   │   ├── useFetch.ts            # API için özel hook
│   │   └── useAuth.tsx            # Login için özel hook
├── assets/
│   ├── S-Logo1.png                # Logo
│   ├── S-Logo2.png                # Logo
├── .env                           # VPS sunucumdaki Strapi api adresi (EXPO_PUBLIC_URL)
```

## 📸 Ekran Görüntüleri

| Showcase                                                                                                  | Search                                                                                                    | Post Ad                                                                                                   |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/6595a987-9fee-45c7-a14e-11dc4ffa7358" width="300" /> | <img src="https://github.com/user-attachments/assets/f7dddd65-56bb-4e68-9c9a-e55fa2123d1a" width="300" /> | <img src="https://github.com/user-attachments/assets/da10f356-952f-4c66-8978-86efb96e9cef" width="300" /> |

| Services                                                                                                  | Personalized                                                                                              | Login                                                                                                     |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/d056367d-ecfb-4992-bbe1-b047d1f7a18c" width="300" /> | <img src="https://github.com/user-attachments/assets/d3b76acd-7543-480b-82b3-c734e15054eb" width="300" /> | <img src="https://github.com/user-attachments/assets/51ff4850-7401-4d12-b9ab-8d8ee10fe24d" width="300" /> |

| Car List                                                                                                  | Real Estate List                                                                                          | Motocycles List                                                                                           |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/10a33623-cb37-4db2-9113-eb7b9dd95878" width="300" /> | <img src="https://github.com/user-attachments/assets/9ed2a868-a789-4362-be84-ace818d7555e" width="300" /> | <img src="https://github.com/user-attachments/assets/48b7bbde-2323-4dde-8b83-33844702a160" width="300" /> |

# 🖼️ Smart Image Downloader — v4.2 Pro

> **Tiện ích Chrome tải hình ảnh thông minh với trích dẫn APA & Chicago tự động**
> **Chrome Extension for smart image downloading with automatic APA & Chicago citations**

[![Version](https://img.shields.io/badge/version-4.2%20Pro-7c3aed?style=flat-square)](https://github.com/nguyenhobac/google-image-downloader)
[![License](https://img.shields.io/badge/license-MIT-10b981?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Chrome%20Extension-4f46e5?style=flat-square)](https://developer.chrome.com/docs/extensions/)
[![Lang](https://img.shields.io/badge/lang-VI%20%7C%20EN-f59e0b?style=flat-square)](#)

---

## 📋 Mục lục / Table of Contents

- [Giới thiệu / Overview](#-giới-thiệu--overview)
- [Tính năng / Features](#-tính-năng--features)
- [Cài đặt / Installation](#-cài-đặt--installation)
- [Hướng dẫn sử dụng / How to Use](#-hướng-dẫn-sử-dụng--how-to-use)
- [Định dạng citation.txt / Citation File Format](#-định-dạng-citationtxt--citation-file-format)
- [Lịch sử phiên bản / Changelog](#-lịch-sử-phiên-bản--changelog)
- [Giấy phép / License](#-giấy-phép--license)

---

## 🚀 Giới thiệu / Overview

### 🇻🇳 Tiếng Việt

**Smart Image Downloader** là tiện ích mở rộng Chrome cho phép bạn quét và tải hàng loạt hình ảnh từ bất kỳ trang web nào — bao gồm cả Google Images — với độ chính xác cao. Tiện ích tự động phân loại ảnh theo tên miền gốc, ghi nhận trích dẫn học thuật theo chuẩn **APA và Chicago** vào tệp `citation.txt`, giúp tiết kiệm thời gian cho các nhà nghiên cứu, kiến trúc sư, sinh viên và chuyên gia sáng tạo.

### 🇬🇧 English

**Smart Image Downloader** is a Chrome Extension that scans and batch-downloads images from any webpage — including Google Images — with high accuracy. It automatically organizes images into domain-based subfolders and generates academic citations in both **APA and Chicago** styles into a `citation.txt` file, saving time for researchers, architects, students, and creative professionals.

---

## ✨ Tính năng / Features

### 🇻🇳 Tiếng Việt

| Tính năng | Mô tả |
|-----------|-------|
| **Quét trang trực quan** | Quét toàn diện tất cả hình ảnh trên trang đang mở, kể cả Google Images |
| **Lọc theo chiều cao H** | Chỉ lấy ảnh có chiều cao ≥ H pixel (mặc định H = 800px) |
| **Số ảnh tối đa** | Giới hạn số lượng ảnh quét mỗi lần (mặc định 50 ảnh) |
| **Quét tiếp** | Quét thêm ảnh mới không trùng với lần quét trước |
| **Tự tạo thư mục** | Tự động tạo thư mục con theo tên miền gốc của trang web |
| **Đổi tên tự động** | Đặt tên ảnh theo định dạng `YYYYMMDDSS` |
| **Trích dẫn APA & Chicago** | Tự động tạo tệp `citation.txt` với 2 chuẩn trích dẫn cho mỗi ảnh |
| **Giao diện song ngữ** | Hỗ trợ Tiếng Việt và English |
| **Chế độ tối/sáng** | Theo hệ thống, sáng hoặc tối |
| **Khôi phục phiên làm việc** | Ghi nhớ kết quả quét giữa các lần mở popup |

### 🇬🇧 English

| Feature | Description |
|---------|-------------|
| **Visual Page Scanner** | Comprehensive scan of all images on the active page, including Google Images |
| **Height Filter (H)** | Only collect images with height ≥ H pixels (default H = 800px) |
| **Max Scan Count** | Limit images per scan session (default 50) |
| **Scan More** | Continue scanning new, non-duplicate images from the same page |
| **Auto Folder** | Automatically create subfolders based on the source website domain |
| **Auto Rename** | Rename images using `YYYYMMDDSS` timestamp format |
| **APA & Chicago Citations** | Auto-generate `citation.txt` with dual citation standards per image |
| **Bilingual UI** | Vietnamese and English interface support |
| **Dark / Light Theme** | System, light, or dark mode |
| **Session Persistence** | Remembers scan results between popup sessions |

---

## 🔧 Cài đặt / Installation

### 🇻🇳 Tiếng Việt

1. **Tải xuống** hoặc clone repository này về máy:
   ```bash
   git clone https://github.com/nguyenhobac/google-image-downloader.git
   ```
2. Mở **Google Chrome** và truy cập `chrome://extensions/`
3. Bật **"Developer mode"** (góc trên bên phải)
4. Nhấn **"Load unpacked"** và chọn thư mục `GGimagedowload`
5. Biểu tượng tiện ích sẽ xuất hiện trên thanh công cụ Chrome

### 🇬🇧 English

1. **Download** or clone this repository:
   ```bash
   git clone https://github.com/nguyenhobac/google-image-downloader.git
   ```
2. Open **Google Chrome** and navigate to `chrome://extensions/`
3. Enable **"Developer mode"** (top-right toggle)
4. Click **"Load unpacked"** and select the `GGimagedowload` folder
5. The extension icon will appear in your Chrome toolbar

---

## 📖 Hướng dẫn sử dụng / How to Use

### 🇻🇳 Tiếng Việt

**Tab Quét Trang:**

1. Mở trang web hoặc trang kết quả Google Images bạn muốn quét
2. Nhấn biểu tượng tiện ích để mở popup
3. Đặt **chiều cao tối thiểu H** (kéo thanh trượt hoặc nhập số)
4. Đặt **số ảnh quét tối đa** (mặc định: 50)
5. Bật/tắt **"Tự tạo thư mục"** và **"Tự động đổi tên"** theo nhu cầu
6. Nhấn **"QUÉT HÌNH TRÊN TRANG"** — tiện ích sẽ tự cuộn trang và thu thập ảnh
7. Nhấn **"QUÉT TIẾP"** để lấy thêm ảnh mới (không trùng lặp)
8. Xem thumbnail và chi tiết từng ảnh trong khung kết quả
9. Nhấn **"TẢI HÌNH VỀ MÁY"** để tải xuống toàn bộ ảnh đạt chuẩn + tệp `citation.txt`

> 💡 Tất cả ảnh được lưu vào thư mục **`Download Images/[tên-miền]/`** trong thư mục tải xuống mặc định của Chrome.

### 🇬🇧 English

**Scan Page Tab:**

1. Open the webpage or Google Images search results you want to scan
2. Click the extension icon to open the popup
3. Set the **minimum height H** (use slider or type a value)
4. Set the **max scan count** (default: 50)
5. Toggle **"Auto-create folder"** and **"Auto-rename"** as needed
6. Click **"SCAN IMAGES ON PAGE"** — the extension auto-scrolls and collects images
7. Click **"SCAN MORE"** to collect additional unique images from the same page
8. Browse thumbnails and view details in the results panel
9. Click **"DOWNLOAD IMAGES"** to batch-download all qualifying images + `citation.txt`

> 💡 All images are saved to **`Download Images/[domain-name]/`** inside Chrome's default download folder.

---

## 📄 Định dạng citation.txt / Citation File Format

### 🇻🇳 Tiếng Việt

Mỗi lần tải xuống, tiện ích tự động tạo tệp `citation.txt` trong thư mục con tương ứng, chứa trích dẫn theo **2 chuẩn học thuật** cho từng hình ảnh:

```
===========================================================
TRÍCH DẪN HÌNH ẢNH — CHUẨN APA & CHICAGO
Tạo bởi: Tiện Ích Tải Hình Thông Minh v4.2 Pro
===========================================================
Thời gian tải : 2026-05-22 12:30:00
Thư mục lưu   : Download Images/example.com
Tổng số ảnh   : 3
-----------------------------------------------------------

1. Tệp: photo_001.jpg
   APA     : photo_001.jpg. (2026, 22/05). [Hình ảnh]. example.com. Lấy từ https://example.com/photo.jpg
   Chicago : "photo_001.jpg." Hình ảnh kỹ thuật số. example.com. Truy cập ngày 22/05/2026. Lấy từ https://example.com/photo.jpg
   URL     : https://example.com/photo.jpg
```

### 🇬🇧 English

On every download, the extension automatically creates a `citation.txt` file in the corresponding subfolder, containing **dual academic citations** for each image:

```
===========================================================
IMAGE CITATIONS — APA & CHICAGO STYLE
Generated by: Smart Image Downloader v4.2 Pro
===========================================================
Download Date : 2026-05-22 12:30:00
Target Folder : Download Images/example.com
Total Images  : 3
-----------------------------------------------------------

1. File: photo_001.jpg
   APA     : photo_001.jpg. (2026, 05/22). [Image]. example.com. Retrieved from https://example.com/photo.jpg
   Chicago : "photo_001.jpg." Digital image. example.com. Accessed May 22, 2026. https://example.com/photo.jpg
   URL     : https://example.com/photo.jpg
```

---

## 📌 Cấu trúc thư mục tải xuống / Download Folder Structure

```
📁 Downloads/
└── 📁 Download Images/
    ├── 📁 example.com/
    │   ├── 🖼️ photo_001.jpg
    │   ├── 🖼️ photo_002.png
    │   └── 📄 citation.txt
    └── 📁 another-site.vn/
        ├── 🖼️ image_001.webp
        └── 📄 citation.txt
```

---

## 🕐 Lịch sử phiên bản / Changelog

| Phiên bản | Ngày | Thay đổi |
|-----------|------|----------|
| **v4.2 Pro** | 22/05/2026 | ✅ Bổ sung chuẩn trích dẫn Chicago song song APA · Loại bỏ tuỳ chọn thời gian chờ · Xóa tab Tìm kiếm thông minh · Thu gọn background worker |
| **v4.1.1 Pro** | 2026 | 🐛 Sửa lỗi tự đóng popup và tự mở tab khi quét Google Images · Nâng cấp tải citation sang Blob URL an toàn |
| **v4.1 Pro** | 2026 | ✨ Thêm nút "Quét tiếp" · Mặc định H=800px · Bảo toàn tên thư mục theo website gốc |
| **v4.0 Pro** | 2026 | 🎨 Thêm tab Quét Trang · Lọc theo H · Tạo folder tự động · Auto-rename · Giao diện Glassmorphism |
| **v3.0** | 2025 | ⚡ Cải tiến cơ chế tương tác Google Images · Tối ưu hàng đợi scraper |
| **v2.1** | 2025 | 🔧 Quản lý lỗi kết nối · Cải tiến đường dẫn tải xuống |
| **v2.0** | 2025 | 🔍 Tích hợp bộ lọc "Large" và "Wide" trên Google Images |

---

## 🛡️ Quyền hạn tiện ích / Extension Permissions

| Quyền | Mục đích |
|-------|----------|
| `downloads` | Tải file ảnh và citation.txt về máy |
| `tabs` | Đọc URL tab đang hoạt động để xác định tên miền |
| `scripting` | Chạy script quét ảnh trên trang web |
| `activeTab` | Truy cập tab đang mở để quét |
| `storage` | Lưu cài đặt và dữ liệu quét giữa các phiên |
| `host_permissions: google.com` | Hỗ trợ quét sâu trên Google Images |

---

## 👤 Tác giả / Author

**JACK NGUYEN** — Biên soạn & Phát triển v3.0+

Dựa trên nền tảng gốc của đội ngũ **Google DeepMind & Cộng tác viên**

---

## 📜 Giấy phép / License

Phát hành theo giấy phép **MIT** — xem tệp [LICENSE](LICENSE) để biết thêm chi tiết.

Released under the **MIT License** — see [LICENSE](LICENSE) for details.

// State tracking for the image scanner tab
let allScannedImages = [];
let filteredImages = [];
let scanActiveTabHost = "";
let isScanningNow = false;
let isScanningMoreNow = false;

// -------------------------------------------------------------
// Centralized Bilingual Translation Dictionary (VI/EN)
// -------------------------------------------------------------
const locales = {
    vi: {
        appTitle: "Smart Image Downloader v4.2 Pro by JACK NGUYEN",
        appDesc: "Hệ thống tải hình ảnh thông minh tích hợp bộ lọc trực quan.",
        tabScan: "Quét Trang",
        tabSettings: "Cài Đặt",
        tabHelp: "Giới Thiệu",
        scanMinHeightLabel: "Chiều cao tối thiểu H (px)",
        scanMaxCountLabel: "Số ảnh quét tối đa",
        scanAutoFolderLabel: "Tự tạo thư mục tải",
        scanAutoFolderDesc: "Tạo thư mục con theo tên miền chính trang web (hostname)",
        scanAutoRenameLabel: "Tự động đổi tên (Thời gian)",
        scanAutoRenameDesc: "Tự động đổi tên hình ảnh theo định dạng YYYYMMDDSS",
        scanBtnText: "QUÉT HÌNH TRÊN TRANG",
        scanBtnScanning: "ĐANG QUÉT TRANG...",
        scanMoreBtnText: "QUÉT TIẾP",
        scanMoreBtnScanning: "ĐANG QUÉT TIẾP...",
        clearBtnText: "XOÁ",
        statScannedLabel: "Đã tìm thấy",
        statFilteredLabel: "Đạt chuẩn (>= H)",
        scanDownloadBtnText: "TẢI HÌNH VỀ MÁY ({count} ảnh)",
        scanDownloadBtnTextZero: "TẢI HÌNH VỀ MÁY (0 ảnh)",
        imageListLabel: "Danh sách hình ảnh",
        imageDetailLabel: "Chi tiết hình ảnh",
        detailPlaceholder: "Bấm vào một hình ảnh bên trái để xem chi tiết.",
        detailFilenameLabel: "Tên tệp:",
        detailDimensionsLabel: "Kích thước:",
        detailFolderLabel: "Thư mục tải:",
        detailDomainLabel: "Tên miền nguồn:",
        detailViewHdBtn: "Xem ảnh HD",
        detailViewSourceBtn: "Trang nguồn",
        detailFolderRoot: "Thư mục gốc",
        detailUnknown: "Không xác định",
        scanLogReady: "Hệ thống quét trang đã sẵn sàng.",
        scanLogInitializing: "Bắt đầu khởi tạo phiên quét...",
        scanLogScanMoreInitializing: "Bắt đầu khởi tạo phiên quét tiếp tục...",
        scanLogScrolling: "Đang cuộn trang tự động để kích hoạt tải ảnh (lazy-loading)...",
        scanLogExtractingAnchors: "Đang trích xuất liên kết từ các thẻ liên kết kết quả tìm kiếm...",
        scanLogDeepScanning: "Quét sâu giải lập click chuột trên Google Images để lấy thêm ảnh...",
        scanLogDeepClicking: "[Quét sâu {current}/{total}] Click ảnh: {src}...",
        scanLogBackupScanning: "Quét dữ liệu thô dự phòng từ cấu trúc scripts của Google...",
        scanLogExtractingNonGoogle: "Đang trích xuất toàn diện liên kết và thuộc tính hình ảnh trên trang...",
        scanLogMeasuringDims: "Đang đo kích thước thực ngầm của {count} ảnh chưa tải xong...",
        scanLogCompleted: "Hoàn thành! Đã thu hoạch được {count} hình ảnh.",
        scanLogAllScanned: "\nQuét hoàn tất! Đã tìm thấy tổng cộng {count} hình ảnh trên trang.",
        scanLogAllScannedMore: "\nQuét tiếp hoàn tất! Đã thu hoạch thêm hình ảnh mới.",
        scanLogNoImages: "\nKhông thể đọc cấu trúc trang hoặc không tìm thấy hình nào.",
        scanLogException: "\nGặp lỗi ngoại lệ: {msg}",
        scanLogActiveTabNotFound: "Không tìm thấy tab hoạt động.",
        scanLogSecurityError: "\nLỗi bảo mật hoặc không thể quét trên trang này: {msg}",
        
        settingsLangLabel: "Ngôn ngữ giao diện",
        settingsThemeLabel: "Giao diện (Theme)",
        settingsPersistLabel: "Giữ lại thông tin quét lần trước",
        settingsPersistDesc: "Tự động khôi phục danh sách ảnh và lịch sử quét khi mở lại popup",
        langVi: "Tiếng Việt (Mặc định)",
        langEn: "English",
        themeSystem: "Theo hệ thống (System)",
        themeLight: "Sáng (Light)",
        themeDark: "Tối (Dark)",
        
        helpInfoTitle: "Thông Tin Tiện Ích",
        helpGridVerLabel: "Phiên bản:",
        helpGridDateLabel: "Ngày cập nhật:",
        helpGridAuthorLabel: "Tác giả biên soạn:",
        helpChangelogCurrent: "Hiện tại",
        helpGridOriginalAuthorLabel: "Tác giả gốc:",
        helpChangelogTitle: "5 Phiên Bản Gần Nhất",
        helpChangelogV42: "Bổ sung chuẩn trích dẫn Chicago song song với APA, loại bỏ tuỳ chọn thời gian chờ và tab Tìm kiếm thông minh để tối ưu hiệu năng.",
        helpChangelogV411: "Sửa lỗi tự đóng chương trình và tự mở tab khi quét Google Images, nâng cấp cơ chế tải trích dẫn APA sang Blob URL an toàn.",
        helpChangelogV41: "Bổ sung nút \"Quét tiếp\" thông minh tránh trùng lặp, mặc định chiều cao tối thiểu H=800px, bảo toàn tên thư mục lưu theo Website gốc chính xác.",
        helpChangelogV4: "Thêm tab \"Quét Trang\", lọc nhanh dynamic theo chiều cao H, tự tạo folder theo tên miền web, auto-rename YYYYMMDDSS và giao diện Glassmorphism đỉnh cao.",
        helpChangelogV3: "Cải tiến cơ chế tương tác và tải hình trên Google, tăng tốc xử lý và tối ưu hóa hàng đợi scraper.",
        helpChangelogV21: "Bổ sung quản lý lỗi kết nối và cải tiến định dạng đường dẫn tải xuống mặc định.",
        helpChangelogV20: "Tích hợp bộ lọc tìm kiếm \"Kích thước lớn\" (Large) và \"Tỷ lệ rộng\" (Wide) trên thanh công cụ tìm kiếm Google.",
        
        helpGuideTitle: "Hướng Dẫn Sử Dụng Chi Tiết",
        helpGuideScanTitle: "1. Tab Quét Trang (Trực quan tại chỗ)",
        helpGuideScanDesc: `Tải hình trực tiếp từ trang web bạn đang duyệt (kể cả kết quả tìm kiếm Google):
            <ul>
                <li>Bước 1: Mở trang web mong muốn trên Chrome.</li>
                <li>Bước 2: Nhập chiều cao tối thiểu H (nhập số hoặc trượt thanh kéo).</li>
                <li>Bước 3: Nhập số lượng hình quét tối đa muốn quét (mặc định là 50).</li>
                <li>Bước 4: Bật các tùy chọn "Tự tạo thư mục" hoặc "Auto Rename".</li>
                <li>Bước 5: Bấm nút "QUÉT HÌNH TRÊN TRANG". Quét giải lập từng ảnh trong thời gian thực để lấy kích thước hình và nguồn gốc thực.</li>
                <li>Bước 6: Nếu thay đổi H, danh sách lọc sẽ tự tính toán lại theo số lượng đạt chuẩn.</li>
                <li>Bước 7: Bấm nút "TẢI HÌNH VỀ MÁY" để bắt đầu tải xuống hàng loạt vào thư mục tên miền chính (domain).</li>
            </ul>`
    },
    en: {
        appTitle: "Smart Image Downloader v4.2 Pro by JACK NGUYEN",
        appDesc: "Smart image download system with integrated visual filters.",
        tabScan: "Scan Page",
        tabSettings: "Settings",
        tabHelp: "Help/Info",
        scanMinHeightLabel: "Min Height H (px)",
        scanMaxCountLabel: "Max scan count",
        scanAutoFolderLabel: "Auto-create folder",
        scanAutoFolderDesc: "Create subfolder based on main domain of the site",
        scanAutoRenameLabel: "Auto-rename (Timestamp)",
        scanAutoRenameDesc: "Auto-rename images using YYYYMMDDSS format",
        scanBtnText: "SCAN IMAGES ON PAGE",
        scanBtnScanning: "SCANNING PAGE...",
        scanMoreBtnText: "SCAN MORE",
        scanMoreBtnScanning: "SCANNING MORE...",
        clearBtnText: "CLEAR",
        statScannedLabel: "Found",
        statFilteredLabel: "Matched (>= H)",
        scanDownloadBtnText: "DOWNLOAD IMAGES ({count} images)",
        scanDownloadBtnTextZero: "DOWNLOAD IMAGES (0 images)",
        imageListLabel: "Image List",
        imageDetailLabel: "Image Details",
        detailPlaceholder: "Click an image on the left to see details.",
        detailFilenameLabel: "File Name:",
        detailDimensionsLabel: "Dimensions:",
        detailFolderLabel: "Save Folder:",
        detailDomainLabel: "Source Domain:",
        detailViewHdBtn: "View HD Image",
        detailViewSourceBtn: "Source Page",
        detailFolderRoot: "Root Folder",
        detailUnknown: "Unknown",
        scanLogReady: "Page scanner system is ready.",
        scanLogInitializing: "Initializing scanning session...",
        scanLogScanMoreInitializing: "Initializing scan-more session...",
        scanLogScrolling: "Scrolling page automatically to trigger lazy-loading...",
        scanLogExtractingAnchors: "Extracting links from Google search result elements...",
        scanLogDeepScanning: "Simulating clicks on Google Images for deep scanning...",
        scanLogDeepClicking: "[Deep Scan {current}/{total}] Clicking image: {src}...",
        scanLogBackupScanning: "Scanning raw data from Google script structures...",
        scanLogExtractingNonGoogle: "Extracting all image links and attributes on the page...",
        scanLogMeasuringDims: "Measuring real background dimensions of {count} unloading images...",
        scanLogCompleted: "Done! Successfully harvested {count} images.",
        scanLogAllScanned: "\nScan completed! Found a total of {count} images on the page.",
        scanLogAllScannedMore: "\nScan-more completed! Harvested additional unique images.",
        scanLogNoImages: "\nCould not read page structure or no images were found.",
        scanLogException: "\nException occurred: {msg}",
        scanLogActiveTabNotFound: "No active tab found.",
        scanLogSecurityError: "\nSecurity error or cannot scan on this page: {msg}",
        
        settingsLangLabel: "Interface Language",
        settingsThemeLabel: "Theme",
        settingsPersistLabel: "Retain previous scan information",
        settingsPersistDesc: "Auto-restore image list and scan history when reopening popup",
        langVi: "Tiếng Việt (Mặc định)",
        langEn: "English",
        themeSystem: "System Default",
        themeLight: "Light Theme",
        themeDark: "Dark Theme",
        
        helpInfoTitle: "Utility Information",
        helpGridVerLabel: "Version:",
        helpGridDateLabel: "Updated date:",
        helpGridAuthorLabel: "Compiled by:",
        helpChangelogCurrent: "Current",
        helpGridOriginalAuthorLabel: "Original Author:",
        helpChangelogTitle: "Last 5 Versions",
        helpChangelogV42: "Added Chicago style citation alongside APA, removed scan delay option and Smart Search tab to optimize performance.",
        helpChangelogV411: "Fixed popup auto-closure and tab-opening bugs during Google Images scan, upgraded APA citation download mechanism to secure Blob URLs.",
        helpChangelogV41: "Added smart \"Scan more\" button, defaulted H=800px, and preserved exact original website host as destination folder.",
        helpChangelogV4: "Added \"Scan Page\" tab, H-height quick dynamic filter, domain-based auto folder, YYYYMMDDSS auto-rename, and high-end Glassmorphism UI.",
        helpChangelogV3: "Improved click simulation and extraction on Google Images, optimized worker queues.",
        helpChangelogV21: "Added connection error handler and refined default download paths.",
        helpChangelogV20: "Integrated \"Large\" size and \"Wide\" aspect ratio filters for Google Images.",
        
        helpGuideTitle: "Detailed User Guide",
        helpGuideScanTitle: "1. Page Scanner Tab (On-site visual scan)",
        helpGuideScanDesc: `Download images directly from the page you are currently browsing (including Google Search results):
            <ul>
                <li>Step 1: Open the desired website in Chrome.</li>
                <li>Step 2: Enter the minimum height H (type number or slide).</li>
                <li>Step 3: Enter the maximum image count to scan (default is 50).</li>
                <li>Step 4: Enable "Auto-create folder" or "Auto Rename" options.</li>
                <li>Step 5: Click "SCAN IMAGES ON PAGE". It will simulate on-site clicks to extract real dimension & original sources.</li>
                <li>Step 6: If you adjust H, the filtered list will recalculate instantly.</li>
                <li>Step 7: Click "DOWNLOAD IMAGES" to batch-download files into the main domain subfolder.</li>
            </ul>`
    }
};

// -------------------------------------------------------------
// Localization and Theme Utility Functions
// -------------------------------------------------------------
function applyLocalization(lang) {
    const translation = locales[lang] || locales.vi;
    
    // 1. Text elements and simple tags
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translation[key]) {
            if (el.tagName.toLowerCase() === 'input' && (el.type === 'button' || el.type === 'submit')) {
                el.value = translation[key];
            } else if (el.tagName.toLowerCase() === 'textarea' || el.tagName.toLowerCase() === 'input') {
                el.placeholder = translation[key];
            } else if (key === 'helpGuideScanDesc' || key === 'helpGuideSmartDesc') {
                el.innerHTML = translation[key];
            } else {
                el.textContent = translation[key];
            }
        }
    });

    // Update scan download button text
    const scanDownloadBtn = document.getElementById('scanDownloadBtn');
    if (scanDownloadBtn) {
        if (filteredImages.length > 0) {
            scanDownloadBtn.textContent = translation.scanDownloadBtnText.replace('{count}', filteredImages.length);
        } else {
            scanDownloadBtn.textContent = translation.scanDownloadBtnTextZero;
        }
    }

    // Dynamic button state updates
    const scanBtn = document.getElementById('scanBtn');
    if (scanBtn) {
        if (isScanningNow) {
            scanBtn.textContent = translation.scanBtnScanning;
        } else {
            scanBtn.textContent = translation.scanBtnText;
        }
    }

    const scanMoreBtn = document.getElementById('scanMoreBtn');
    if (scanMoreBtn) {
        if (isScanningMoreNow) {
            scanMoreBtn.textContent = translation.scanMoreBtnScanning;
        } else {
            scanMoreBtn.textContent = translation.scanMoreBtnText;
        }
    }

    // Initial logs translation
    const scanLog = document.getElementById('scanLog');
    if (scanLog) {
        if (scanLog.textContent.trim() === locales.vi.scanLogReady || scanLog.textContent.trim() === locales.en.scanLogReady) {
            scanLog.textContent = translation.scanLogReady;
        }
    }

    // Refresh dynamic details card if placeholder is shown
    const imageDetailCard = document.getElementById('imageDetailCard');
    if (imageDetailCard && imageDetailCard.querySelector('.detail-placeholder')) {
        imageDetailCard.innerHTML = `<div class="detail-placeholder">${translation.detailPlaceholder}</div>`;
    }

    // Refresh image list and dynamic detail translations
    filterAndDisplayImages();
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else if (theme === 'light') {
        document.body.classList.remove('dark');
    } else {
        // System preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }
}

// System theme listener for real-time changes
const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
systemThemeMediaQuery.addEventListener('change', (e) => {
    const settingsTheme = document.getElementById('settingsTheme');
    const currentTheme = settingsTheme ? settingsTheme.value : 'system';
    if (currentTheme === 'system') {
        if (e.matches) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }
});

// -------------------------------------------------------------
// Persistence Storage Functions
// -------------------------------------------------------------
function saveCurrentScanData() {
    const settingsPersist = document.getElementById('settingsPersist');
    const persistEnabled = settingsPersist ? settingsPersist.checked : true;
    if (!persistEnabled) {
        chrome.storage.local.remove('savedScanData');
        return;
    }

    const scanMinHeight = document.getElementById('scanMinHeight');
    const scanMaxCount = document.getElementById('scanMaxCount');
    const scanAutoFolder = document.getElementById('scanAutoFolder');
    const scanAutoRename = document.getElementById('scanAutoRename');
    const scanLog = document.getElementById('scanLog');

    const data = {
        allScannedImages: allScannedImages,
        scanActiveTabHost: scanActiveTabHost,
        scanMinHeight: scanMinHeight ? scanMinHeight.value : "800",
        scanMaxCount: scanMaxCount ? scanMaxCount.value : "50",
        scanDelay: "50",
        scanAutoFolder: scanAutoFolder ? scanAutoFolder.checked : true,
        scanAutoRename: scanAutoRename ? scanAutoRename.checked : false,
        scanLogText: scanLog ? scanLog.textContent : ""
    };
    chrome.storage.local.set({ savedScanData: data });
}

function saveSettings() {
    const settingsLang = document.getElementById('settingsLang');
    const settingsTheme = document.getElementById('settingsTheme');
    const settingsPersist = document.getElementById('settingsPersist');

    const settings = {
        lang: settingsLang ? settingsLang.value : 'vi',
        theme: settingsTheme ? settingsTheme.value : 'system',
        persist: settingsPersist ? settingsPersist.checked : true
    };
    chrome.storage.local.set({ settings: settings }, () => {
        if (!settings.persist) {
            chrome.storage.local.remove('savedScanData');
        } else {
            saveCurrentScanData();
        }
    });
}

// Listen for real-time scan logs from content script and persist them
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scan_log") {
        const scanLog = document.getElementById('scanLog');
        if (scanLog) {
            scanLog.style.display = 'block';
            
            // Map common log entries to English if settingsLang is set to 'en'
            const settingsLang = document.getElementById('settingsLang');
            const lang = settingsLang ? settingsLang.value : 'vi';
            const translation = locales[lang] || locales.vi;
            
            let message = request.message;
            if (lang === 'en') {
                if (message === locales.vi.scanLogInitializing) message = translation.scanLogInitializing;
                else if (message === locales.vi.scanLogScrolling) message = translation.scanLogScrolling;
                else if (message === locales.vi.scanLogExtractingAnchors) message = translation.scanLogExtractingAnchors;
                else if (message === locales.vi.scanLogDeepScanning) message = translation.scanLogDeepScanning;
                else if (message.startsWith("[Quét sâu")) {
                    const match = message.match(/\[Quét sâu (\d+)\/(\d+)\] Click ảnh: (.*)\.\.\./);
                    if (match) {
                        message = translation.scanLogDeepClicking
                            .replace('{current}', match[1])
                            .replace('{total}', match[2])
                            .replace('{src}', match[3]);
                    }
                }
                else if (message === locales.vi.scanLogBackupScanning) message = translation.scanLogBackupScanning;
                else if (message === locales.vi.scanLogExtractingNonGoogle) message = translation.scanLogExtractingNonGoogle;
                else if (message.startsWith("Đang đo kích thước thực ngầm của")) {
                    const match = message.match(/Đang đo kích thước thực ngầm của (\d+) ảnh/);
                    if (match) {
                        message = translation.scanLogMeasuringDims.replace('{count}', match[1]);
                    }
                }
                else if (message.startsWith("Hoàn thành! Đã thu hoạch được")) {
                    const match = message.match(/Hoàn thành! Đã thu hoạch được (\d+) hình ảnh/);
                    if (match) {
                        message = translation.scanLogCompleted.replace('{count}', match[1]);
                    }
                }
            }

            if (scanLog.textContent === locales.vi.scanLogReady || scanLog.textContent === locales.en.scanLogReady || 
                scanLog.textContent === locales.vi.scanLogInitializing || scanLog.textContent === locales.en.scanLogInitializing) {
                scanLog.textContent = message;
            } else {
                scanLog.textContent += "\n" + message;
            }
            scanLog.scrollTop = scanLog.scrollHeight;
            
            const settingsPersist = document.getElementById('settingsPersist');
            if (settingsPersist && settingsPersist.checked) {
                saveCurrentScanData();
            }
        }
    }
});

// Popup Init
document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Settings Loading & Initialization (Theme, Language, Persistence)
    // -------------------------------------------------------------
    const settingsLang = document.getElementById('settingsLang');
    const settingsTheme = document.getElementById('settingsTheme');
    const settingsPersist = document.getElementById('settingsPersist');

    chrome.storage.local.get(['settings'], (result) => {
        let lang = 'vi';
        let theme = 'system';
        let persist = true;

        if (result && result.settings) {
            lang = result.settings.lang || 'vi';
            theme = result.settings.theme || 'system';
            persist = result.settings.persist !== false;
        }

        // Apply settings to UI
        if (settingsLang) settingsLang.value = lang;
        if (settingsTheme) settingsTheme.value = theme;
        if (settingsPersist) settingsPersist.checked = persist;

        // Apply visual theme and localization
        applyTheme(theme);
        applyLocalization(lang);

        // If persistence is enabled, load previously saved scan data
        if (persist) {
            chrome.storage.local.get(['savedScanData'], (scanResult) => {
                if (scanResult && scanResult.savedScanData) {
                    const data = scanResult.savedScanData;
                    allScannedImages = data.allScannedImages || [];
                    scanActiveTabHost = data.scanActiveTabHost || "";
                    
                    const scanMinHeight = document.getElementById('scanMinHeight');
                    const scanMinHeightSlider = document.getElementById('scanMinHeightSlider');
                    const scanMaxCount = document.getElementById('scanMaxCount');
                    const scanAutoFolder = document.getElementById('scanAutoFolder');
                    const scanAutoRename = document.getElementById('scanAutoRename');
                    const scanLog = document.getElementById('scanLog');

                    if (scanMinHeight && data.scanMinHeight !== undefined) scanMinHeight.value = data.scanMinHeight;
                    if (scanMinHeightSlider && data.scanMinHeight !== undefined) scanMinHeightSlider.value = data.scanMinHeight;
                    if (scanMaxCount && data.scanMaxCount !== undefined) scanMaxCount.value = data.scanMaxCount;
                    if (scanAutoFolder && data.scanAutoFolder !== undefined) scanAutoFolder.checked = data.scanAutoFolder;
                    if (scanAutoRename && data.scanAutoRename !== undefined) scanAutoRename.checked = data.scanAutoRename;
                    
                    if (scanLog && data.scanLogText) {
                        scanLog.textContent = data.scanLogText;
                        scanLog.scrollTop = scanLog.scrollHeight;
                    }

                    // Enable Quét tiếp button if there are scanned images
                    const scanMoreBtn = document.getElementById('scanMoreBtn');
                    if (scanMoreBtn) {
                        scanMoreBtn.disabled = (allScannedImages.length === 0);
                    }

                    // Render restored images
                    filterAndDisplayImages();
                }
            });
        }
    });

    // Handle settings changes
    if (settingsLang) {
        settingsLang.addEventListener('change', () => {
            saveSettings();
            applyLocalization(settingsLang.value);
        });
    }

    if (settingsTheme) {
        settingsTheme.addEventListener('change', () => {
            saveSettings();
            applyTheme(settingsTheme.value);
        });
    }

    if (settingsPersist) {
        settingsPersist.addEventListener('change', () => {
            saveSettings();
        });
    }

    // -------------------------------------------------------------
    // 2. Tab Switching Logic
    // -------------------------------------------------------------
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.id.replace('-btn', '');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // -------------------------------------------------------------
    // 3. Input & Range Slider Sync Logic (Tab 1)
    // -------------------------------------------------------------
    const scanMinHeight = document.getElementById('scanMinHeight');
    const scanMinHeightSlider = document.getElementById('scanMinHeightSlider');
    const scanMaxCount = document.getElementById('scanMaxCount');
    const scanAutoFolder = document.getElementById('scanAutoFolder');
    const scanAutoRename = document.getElementById('scanAutoRename');

    if (scanMinHeight && scanMinHeightSlider) {
        scanMinHeight.addEventListener('input', () => {
            let val = parseInt(scanMinHeight.value, 10);
            if (isNaN(val)) val = 0;
            if (val < 0) val = 0;
            if (val > 2000) val = 2000;
            
            scanMinHeightSlider.value = Math.min(val, 2000);
            filterAndDisplayImages();
            saveCurrentScanData();
        });

        scanMinHeightSlider.addEventListener('input', () => {
            scanMinHeight.value = scanMinHeightSlider.value;
            filterAndDisplayImages();
            saveCurrentScanData();
        });
    }

    // Monitor other inputs for real-time scan data persistence
    if (scanAutoFolder) {
        scanAutoFolder.addEventListener('change', saveCurrentScanData);
    }
    if (scanAutoRename) {
        scanAutoRename.addEventListener('change', saveCurrentScanData);
    }

    // -------------------------------------------------------------
    // 4. Scan & Download Handlers (Tab 1)
    // -------------------------------------------------------------
    const scanBtn = document.getElementById('scanBtn');
    if (scanBtn) {
        scanBtn.addEventListener('click', handlePageScan);
    }

    const scanMoreBtn = document.getElementById('scanMoreBtn');
    if (scanMoreBtn) {
        scanMoreBtn.addEventListener('click', handlePageScanMore);
    }

    const scanDownloadBtn = document.getElementById('scanDownloadBtn');
    if (scanDownloadBtn) {
        scanDownloadBtn.addEventListener('click', handlePageDownload);
    }

    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', handleClearScan);
    }


});

// -------------------------------------------------------------
// Helper: Extract Main Domain only (Omit subdomain subparts)
// -------------------------------------------------------------
function getMainDomain(hostname) {
    let host = hostname.split(':')[0]; // Remove port if any
    
    if (/^[0-9.]+$/.test(host)) return host; // Return IP address as is
    
    const parts = host.split('.');
    if (parts.length <= 2) {
        return host;
    }
    
    // Check for country-specific second-level domains (ccSLDs e.g. co.uk, com.vn, edu.vn)
    const last = parts[parts.length - 1];
    const secondToLast = parts[parts.length - 2];
    const ccSLDs = ['com', 'co', 'net', 'org', 'edu', 'gov', 'mil', 'ac', 'nom'];
    
    if (ccSLDs.includes(secondToLast) && last.length === 2) {
        if (parts.length >= 3) {
            return parts.slice(-3).join('.');
        }
    }
    
    // Omit subdomain parts (e.g. blog.iucnurbanalliance.org -> iucnurbanalliance.org)
    return parts.slice(-2).join('.');
}

async function scanPageImages(maxCount, scanDelayMs, startIndex = 0, alreadyScannedUrls = []) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const logToPopup = (msg) => {
        try {
            chrome.runtime.sendMessage({ action: "scan_log", message: msg });
        } catch (e) {
            console.log(msg);
        }
    };

    if (startIndex > 0) {
        logToPopup("Bắt đầu khởi tạo phiên quét tiếp tục...");
    } else {
        logToPopup("Bắt đầu khởi tạo phiên quét thông minh...");
    }

    // 1. Auto-scroll to trigger lazy loading of images
    logToPopup("Đang cuộn trang tự động để kích hoạt tải ảnh (lazy-loading)...");
    const originalScrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight;
    
    // Start scrolling downward from current scroll position if scanning more
    const startScrollY = startIndex > 0 ? originalScrollTop : 0;
    const totalHeight = Math.min(docHeight, startScrollY + 8000); 
    const scrollStep = 1000;
    
    for (let scrollY = startScrollY; scrollY < totalHeight; scrollY += scrollStep) {
        window.scrollTo(0, scrollY);
        await delay(50); 
    }
    window.scrollTo(0, originalScrollTop);
    await delay(100);

    const results = [];
    const seenUrls = new Set();
    const seenThumbSources = new Set();

    const resolveUrl = (urlStr) => {
        if (!urlStr) return null;
        urlStr = urlStr.trim();
        if (urlStr.startsWith('data:')) return null;
        try {
            const resolved = new URL(urlStr, window.location.href).href;
            if (resolved.startsWith('http')) return resolved;
        } catch (e) {}
        return null;
    };

    const getFilename = (urlStr, idx) => {
        let filename = "";
        try {
            // First, parse with URL to get pathname safely (which has %20 etc. preserved, but query string stripped)
            const urlObj = new URL(urlStr);
            const urlPath = urlObj.pathname;
            const lastPart = urlPath.substring(urlPath.lastIndexOf('/') + 1);
            filename = decodeURIComponent(lastPart);
        } catch (e) {
            try {
                const base = urlStr.split('?')[0].split('#')[0];
                filename = decodeURIComponent(base.substring(base.lastIndexOf('/') + 1));
            } catch (err) {
                const base = urlStr.split('?')[0].split('#')[0];
                filename = base.substring(base.lastIndexOf('/') + 1);
            }
        }
        
        // Clean up any invalid Windows filesystem characters: \ / : * ? " < > |
        filename = filename.replace(/[\\/:*?"<>|]/g, '_');
        
        if (!filename || !filename.includes('.')) {
            filename = `image_${idx}.jpg`;
        }
        return filename;
    };

    const looksLikeUrl = (str) => {
        if (!str) return false;
        str = str.trim();
        if (str.startsWith('data:')) return false;
        if (/^https?:\/\//i.test(str)) return true;
        if (str.startsWith('/') || str.startsWith('./') || str.startsWith('../')) return true;
        if (/\.(jpg|jpeg|png|webp|gif|svg|avif|bmp|tiff)(?:\?.*)?$/i.test(str)) return true;
        return false;
    };

    const extractUrlsFromString = (str) => {
        const urls = [];
        if (!str || typeof str !== 'string') return urls;
        
        if (str.includes(',') && (str.includes('.jpg') || str.includes('.png') || str.includes('.webp') || str.includes('.jpeg') || str.includes('.avif') || str.includes('.gif'))) {
            const parts = str.split(',').map(s => s.trim().split(/\s+/)[0]);
            parts.forEach(p => {
                if (looksLikeUrl(p)) {
                    const resolved = resolveUrl(p);
                    if (resolved) urls.push(resolved);
                }
            });
        } else {
            if (looksLikeUrl(str)) {
                const resolved = resolveUrl(str);
                if (resolved) urls.push(resolved);
            }
        }
        return urls;
    };

    const getImageDimensions = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.naturalWidth, height: img.naturalHeight });
            };
            img.onerror = () => {
                resolve({ width: 0, height: 0 });
            };
            img.src = url;
            setTimeout(() => {
                resolve({ width: 0, height: 0 });
            }, 1000);
        });
    };

    const addCandidate = (imgUrl, element, customSourceUrl) => {
        if (!imgUrl) return;
        
        // Skip already scanned images to prevent duplicates
        if (alreadyScannedUrls && alreadyScannedUrls.includes(imgUrl)) return;
        
        const isSpacerOrTracker = 
            imgUrl.includes('/pixel') || 
            imgUrl.includes('/analytics') || 
            imgUrl.includes('/tracker') || 
            imgUrl.includes('doubleclick') || 
            imgUrl.includes('google-analytics') ||
            imgUrl.includes('/collect?') ||
            imgUrl.includes('facebook.com/tr') ||
            imgUrl.includes('adnxs.com') ||
            /\b(pixel|tracker|analytics|spacer|cleardot|trans)\b/i.test(imgUrl) ||
            imgUrl.endsWith('/pixel.gif') || 
            imgUrl.endsWith('/spacer.gif') ||
            imgUrl.endsWith('/trans.gif') ||
            imgUrl.endsWith('/cleardot.gif');
            
        if (isSpacerOrTracker) return;

        if (window.location.hostname.includes('google.com')) {
            if (isThumbnailUrl(imgUrl)) return;
        }

        // If this image URL was already added, try to update it with better metadata
        const existing = results.find(r => r.highResUrl === imgUrl);
        if (existing) {
            // Update source site if the new one is more specific/non-google
            if (customSourceUrl && (existing.sourceSiteUrl.includes('google.com') || !existing.sourceSiteUrl)) {
                existing.sourceSiteUrl = customSourceUrl;
            }
            // Update dimensions if they were 0 and we now have an element with dimensions
            if (element && (existing.width === 0 || existing.height === 0)) {
                const rect = element.getBoundingClientRect();
                existing.width = element.naturalWidth || element.width || rect.width || 0;
                existing.height = element.naturalHeight || element.height || rect.height || 0;
            }
            return;
        }

        seenUrls.add(imgUrl);
        
        let width = 0;
        let height = 0;
        
        if (element) {
            const rect = element.getBoundingClientRect();
            width = element.naturalWidth || element.width || rect.width || 0;
            height = element.naturalHeight || element.height || rect.height || 0;
        }
        
        if (width === 0 || height === 0) {
            const dimMatch = imgUrl.match(/[-_](\d+)\s*[xX]\s*(\d+)\b/) || imgUrl.match(/[?&](?:w|width|h|height|resize|size)=(\d+)(?:[xX,]+(\d+))?/i);
            if (dimMatch) {
                width = parseInt(dimMatch[1]) || 0;
                height = parseInt(dimMatch[2]) || 0;
            }
        }
        
        const needsAsync = (width === 0 || height === 0 || (width < 30 && height < 30));
        
        results.push({
            src: (element && element.tagName && element.tagName.toLowerCase() === 'img') ? (element.src || imgUrl) : imgUrl,
            highResUrl: imgUrl,
            width: width,
            height: height,
            filename: getFilename(imgUrl, results.length + 1),
            sourceSiteUrl: customSourceUrl || window.location.href,
            needsAsync: needsAsync
        });
    };

    const isThumbnailUrl = (url) => {
        return url.includes('gstatic.com') || url.includes('encrypted-tbn') || url.includes('tbn:ANd9Gc');
    };

    if (window.location.hostname.includes('google.com')) {
        logToPopup("Đang trích xuất liên kết từ các thẻ liên kết kết quả tìm kiếm...");
        
        const anchors = Array.from(document.querySelectorAll('a[href*="imgurl="]'));
        anchors.forEach((a) => {
            let imgUrl = null;
            let imgRefUrl = null;
            try {
                const urlObj = new URL(a.href, window.location.origin);
                imgUrl = urlObj.searchParams.get('imgurl');
                imgRefUrl = urlObj.searchParams.get('imgrefurl');
            } catch (e) {
                const matchUrl = a.href.match(/[?&]imgurl=([^&]+)/);
                if (matchUrl) imgUrl = decodeURIComponent(matchUrl[1]);
                const matchRef = a.href.match(/[?&]imgrefurl=([^&]+)/);
                if (matchRef) imgRefUrl = decodeURIComponent(matchRef[1]);
            }
            
            const resolvedImgUrl = resolveUrl(imgUrl);
            if (resolvedImgUrl && (!alreadyScannedUrls || !alreadyScannedUrls.includes(resolvedImgUrl))) {
                addCandidate(resolvedImgUrl, null, imgRefUrl);
            }
        });

        if (results.length < maxCount) {
            logToPopup("Quét sâu giả lập click chuột trên Google Images để lấy thêm ảnh...");
            const allImgs = Array.from(document.querySelectorAll('img'));
            const candidates = [];
            allImgs.forEach(img => {
                const rect = img.getBoundingClientRect();
                const parentLink = img.closest('a');
                if (rect.width > 50 && rect.height > 50) {
                    const isGoogleLogo = img.src && (img.src.includes('/images/branding/') || img.src.includes('googlelogo_'));
                    const isAvatar = img.src && img.src.includes('lh3.googleusercontent.com');
                    if (!isGoogleLogo && !isAvatar) {
                        const hasImageSource = img.src && !img.src.startsWith('data:');
                        if (hasImageSource && !seenThumbSources.has(img.src) && !seenUrls.has(img.src) && (!alreadyScannedUrls || !alreadyScannedUrls.includes(img.src))) {
                            candidates.push({ img, parentLink, rect });
                        }
                    }
                }
            });

            const clickInterceptor = (e) => {
                const anchor = e.target.closest('a');
                if (anchor) e.preventDefault();
            };
            document.addEventListener('click', clickInterceptor, { capture: true });
            
            let lastResolvedUrl = null;
            try {
                for (let i = 0; i < candidates.length; i++) {
                    if (results.length >= maxCount) break;
                    
                    const { img, parentLink } = candidates[i];
                    logToPopup(`[Quét sâu ${results.length + 1}/${maxCount}] Click ảnh: ${img.src.substring(0, 30)}...`);
                    
                    const origOutline = img.style.outline;
                    img.style.outline = "2px dashed #7c3aed";
                    img.scrollIntoView({ block: "center", behavior: "smooth" });
                    
                    ['mousedown', 'click', 'mouseup'].forEach(evtType => {
                        img.dispatchEvent(new MouseEvent(evtType, { bubbles: true, cancelable: true, view: window }));
                    });
                    
                    const pollStartTime = Date.now();
                    const maxWaitTime = 800;
                    let bestPreview = null;
                    
                    while ((Date.now() - pollStartTime) < maxWaitTime) {
                        const detailPaneImages = Array.from(document.querySelectorAll('img')).filter(pi => {
                            const r = pi.getBoundingClientRect();
                            const isVisible = r.width > 0 && r.height > 0 && r.top >= 0 && r.left >= 0;
                            return pi.src && pi.src.startsWith('http') && pi !== img && pi.src !== img.src &&
                                   pi.src !== lastResolvedUrl &&
                                   isVisible &&
                                   (r.width > 200 || pi.naturalWidth > 200);
                        });
                        
                        if (detailPaneImages.length > 0) {
                            detailPaneImages.sort((a, b) => (b.naturalWidth * b.naturalHeight) - (a.naturalWidth * a.naturalHeight));
                            const currentBest = detailPaneImages[0];
                            if (currentBest.naturalWidth > img.naturalWidth) {
                                bestPreview = currentBest;
                                break;
                            }
                            bestPreview = currentBest;
                        }
                        await delay(80);
                    }
                    
                    img.style.outline = origOutline;
                    
                    if (bestPreview) {
                        lastResolvedUrl = bestPreview.src;
                        let candidateImgRefUrl = null;
                        if (parentLink && parentLink.href) {
                            try {
                                const urlObj = new URL(parentLink.href, window.location.origin);
                                candidateImgRefUrl = urlObj.searchParams.get('imgrefurl');
                            } catch (e) {
                                const matchRef = parentLink.href.match(/[?&]imgrefurl=([^&]+)/);
                                if (matchRef) candidateImgRefUrl = decodeURIComponent(matchRef[1]);
                            }
                        }
                        
                        // Extract original website link from the "Visit" button or other external links in the detail panel
                        let extractedUrl = null;
                        let currentParent = bestPreview;
                        for (let depth = 0; depth < 8; depth++) {
                            if (!currentParent) break;
                            const anchors = currentParent.querySelectorAll('a[href]');
                            for (const anchor of anchors) {
                                const href = anchor.getAttribute('href');
                                if (href && href.startsWith('http')) {
                                    try {
                                        const urlObj = new URL(href);
                                        const host = urlObj.hostname.toLowerCase();
                                        if (!host.includes('google.') && !host.includes('gstatic.com') && !host.includes('doubleclick.')) {
                                            extractedUrl = href;
                                            break;
                                        }
                                    } catch (err) {}
                                }
                            }
                            if (extractedUrl) break;
                            currentParent = currentParent.parentElement;
                        }
                        
                        if (extractedUrl) {
                            candidateImgRefUrl = extractedUrl;
                        }
                        
                        addCandidate(lastResolvedUrl, bestPreview, candidateImgRefUrl);
                    }
                    
                    if (i < candidates.length - 1) {
                        await delay(scanDelayMs);
                    }
                }
            } finally {
                document.removeEventListener('click', clickInterceptor, { capture: true });
            }
        }

        if (results.length < maxCount) {
            logToPopup("Quét dữ liệu thô dự phòng từ cấu trúc scripts của Google...");
            
            const scripts = document.querySelectorAll('script');
            scripts.forEach(script => {
                const content = script.textContent;
                if (!content) return;
                
                const matches = content.match(/"(https?:\/\/[^"]+)"/g) || content.match(/'(https?:\/\/[^']+)'/g);
                if (matches) {
                    matches.forEach(m => {
                        let u = m.slice(1, -1);
                        u = u.replace(/\\u002f/g, '/').replace(/\\/g, '');
                        
                        if (u.includes('.jpg') || u.includes('.jpeg') || u.includes('.png') || u.includes('.webp') || u.includes('.gif') || u.includes('.avif')) {
                            if (!isThumbnailUrl(u)) {
                                addCandidate(u, null);
                            }
                        }
                    });
                }
            });
        }
    }

    if (!window.location.hostname.includes('google.com')) {
        logToPopup("Đang trích xuất toàn diện liên kết và thuộc tính hình ảnh trên trang...");
        const allElements = Array.from(document.querySelectorAll('*'));
        allElements.forEach(el => {
            const tagName = el.tagName.toLowerCase();
            
            if (tagName === 'img' || tagName === 'source') {
                Array.from(el.attributes).forEach(attr => {
                    const urls = extractUrlsFromString(attr.value);
                    urls.forEach(u => addCandidate(u, el));
                });
            } 
            else if (tagName === 'a') {
                const href = el.getAttribute('href');
                if (href && /\.(jpeg|jpg|png|webp|gif|svg|avif|bmp|tiff)(?:\?.*)?$/i.test(href.trim())) {
                    const urls = extractUrlsFromString(href);
                    urls.forEach(u => addCandidate(u, el));
                }
            }
            else {
                Array.from(el.attributes).forEach(attr => {
                    const name = attr.name.toLowerCase();
                    if (name.startsWith('data-') || name === 'src' || name === 'href' || name.includes('bg') || name.includes('image') || name.includes('url')) {
                        const urls = extractUrlsFromString(attr.value);
                        urls.forEach(u => addCandidate(u, el));
                    }
                });
                
                const bgImg = el.style.backgroundImage;
                if (bgImg && bgImg.startsWith('url(')) {
                    const match = bgImg.match(/url\s*\(\s*["']?([^"']+)["']?\s*\)/);
                    if (match && match[1]) {
                        const urls = extractUrlsFromString(match[1]);
                        urls.forEach(u => addCandidate(u, el));
                    }
                }

                if (el.className && el.offsetHeight > 20 && el.offsetWidth > 20) {
                    try {
                        const compBgImg = window.getComputedStyle(el).backgroundImage;
                        if (compBgImg && compBgImg.startsWith('url(') && compBgImg !== 'none') {
                            const match = compBgImg.match(/url\s*\(\s*["']?([^"']+)["']?\s*\)/);
                            if (match && match[1]) {
                                const urls = extractUrlsFromString(match[1]);
                                urls.forEach(u => addCandidate(u, el));
                            }
                        }
                    } catch (e) {}
                }
            }
        });
    }

    const asyncCandidates = results.filter(r => r.needsAsync);
    if (asyncCandidates.length > 0) {
        logToPopup(`Đang đo kích thước thực ngầm của ${asyncCandidates.length} ảnh chưa tải xong...`);
        const promises = asyncCandidates.map(async (item) => {
            try {
                const dims = await getImageDimensions(item.highResUrl);
                if (dims.width > 0 && dims.height > 0) {
                    item.width = dims.width;
                    item.height = dims.height;
                }
            } catch (e) {}
            delete item.needsAsync;
        });
        await Promise.all(promises);
    }

    results.forEach(r => {
        if (r.hasOwnProperty('needsAsync')) {
            delete r.needsAsync;
        }
    });

    logToPopup(`Hoàn thành! Đã thu hoạch được ${results.length} hình ảnh.`);
    return results.slice(0, maxCount);
}

// -------------------------------------------------------------
// Scan Logic Implementation
// -------------------------------------------------------------
async function handlePageScan() {
    isScanningNow = true;
    const scanBtn = document.getElementById('scanBtn');
    const scanMoreBtn = document.getElementById('scanMoreBtn');
    if (scanBtn) {
        scanBtn.disabled = true;
    }
    if (scanMoreBtn) {
        scanMoreBtn.disabled = true;
    }

    const settingsLang = document.getElementById('settingsLang');
    const lang = settingsLang ? settingsLang.value : 'vi';
    applyLocalization(lang);

    // Clear and show scan logbox
    const scanLog = document.getElementById('scanLog');
    if (scanLog) {
        scanLog.style.display = 'block';
        scanLog.textContent = (locales[lang] || locales.vi).scanLogInitializing;
    }

    // Retrieve maximum scanned limit parameter (default to 50)
    const scanMaxCountInput = document.getElementById('scanMaxCount');
    const maxCount = parseInt(scanMaxCountInput.value, 10) || 50;

    // Hardcoded delay between image scans (50ms optimal)
    const scanDelayMs = 50;

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab) {
            alert((locales[lang] || locales.vi).scanLogActiveTabNotFound);
            isScanningNow = false;
            if (scanBtn) scanBtn.disabled = false;
            if (scanMoreBtn) scanMoreBtn.disabled = (allScannedImages.length === 0);
            applyLocalization(lang);
            return;
        }

        // Store active tab domain
        try {
            scanActiveTabHost = new URL(tab.url).hostname;
        } catch (e) {
            scanActiveTabHost = "";
        }

        // Run asynchronous click simulation scraper script
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: scanPageImages,
            args: [maxCount, scanDelayMs, 0, []] // Pass maximum scanned items count, delay, startIndex=0, empty alreadyScannedUrls
        }, (results) => {
            isScanningNow = false;
            if (scanBtn) scanBtn.disabled = false;

            if (chrome.runtime.lastError) {
                const errMsg = chrome.runtime.lastError.message;
                if (scanLog) {
                    scanLog.textContent += (locales[lang] || locales.vi).scanLogSecurityError.replace('{msg}', errMsg);
                    scanLog.scrollTop = scanLog.scrollHeight;
                }
                alert((locales[lang] || locales.vi).scanLogSecurityError.replace('{msg}', errMsg));
                if (scanMoreBtn) scanMoreBtn.disabled = (allScannedImages.length === 0);
                applyLocalization(lang);
                saveCurrentScanData();
                return;
            }

            if (results && results[0] && results[0].result) {
                allScannedImages = results[0].result;
                filterAndDisplayImages();
                if (scanLog) {
                    scanLog.textContent += (locales[lang] || locales.vi).scanLogAllScanned.replace('{count}', allScannedImages.length);
                    scanLog.scrollTop = scanLog.scrollHeight;
                }
                if (scanMoreBtn) scanMoreBtn.disabled = (allScannedImages.length === 0);
                applyLocalization(lang);
                saveCurrentScanData();
            } else {
                if (scanLog) {
                    scanLog.textContent += (locales[lang] || locales.vi).scanLogNoImages;
                }
                alert((locales[lang] || locales.vi).scanLogNoImages);
                if (scanMoreBtn) scanMoreBtn.disabled = (allScannedImages.length === 0);
                applyLocalization(lang);
                saveCurrentScanData();
            }
        });
    } catch (e) {
        isScanningNow = false;
        if (scanBtn) scanBtn.disabled = false;
        if (scanMoreBtn) scanMoreBtn.disabled = (allScannedImages.length === 0);
        applyLocalization(lang);
        if (scanLog) {
            scanLog.textContent += (locales[lang] || locales.vi).scanLogException.replace('{msg}', e.message);
        }
        alert("Lỗi: " + e.message);
        saveCurrentScanData();
    }
}

async function handlePageScanMore() {
    isScanningMoreNow = true;
    const scanBtn = document.getElementById('scanBtn');
    const scanMoreBtn = document.getElementById('scanMoreBtn');
    if (scanBtn) scanBtn.disabled = true;
    if (scanMoreBtn) scanMoreBtn.disabled = true;

    const settingsLang = document.getElementById('settingsLang');
    const lang = settingsLang ? settingsLang.value : 'vi';
    applyLocalization(lang);

    const scanLog = document.getElementById('scanLog');
    if (scanLog) {
        scanLog.style.display = 'block';
        scanLog.textContent += "\n" + (locales[lang] || locales.vi).scanLogScanMoreInitializing;
        scanLog.scrollTop = scanLog.scrollHeight;
    }

    const scanMaxCountInput = document.getElementById('scanMaxCount');
    const maxCount = parseInt(scanMaxCountInput.value, 10) || 50;

    // Hardcoded delay between image scans (50ms optimal)
    const scanDelayMs = 50;

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab) {
            alert((locales[lang] || locales.vi).scanLogActiveTabNotFound);
            isScanningMoreNow = false;
            if (scanBtn) scanBtn.disabled = false;
            if (scanMoreBtn) scanMoreBtn.disabled = (allScannedImages.length === 0);
            applyLocalization(lang);
            return;
        }

        // Keep active tab host if not already captured
        if (!scanActiveTabHost) {
            try {
                scanActiveTabHost = new URL(tab.url).hostname;
            } catch (e) {
                scanActiveTabHost = "";
            }
        }

        const startIndex = allScannedImages.length;
        const alreadyScannedUrls = allScannedImages.map(img => img.highResUrl);

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: scanPageImages,
            args: [maxCount, scanDelayMs, startIndex, alreadyScannedUrls]
        }, (results) => {
            isScanningMoreNow = false;
            if (scanBtn) scanBtn.disabled = false;
            if (scanMoreBtn) scanMoreBtn.disabled = (allScannedImages.length === 0);
            applyLocalization(lang);

            if (chrome.runtime.lastError) {
                const errMsg = chrome.runtime.lastError.message;
                if (scanLog) {
                    scanLog.textContent += (locales[lang] || locales.vi).scanLogSecurityError.replace('{msg}', errMsg);
                    scanLog.scrollTop = scanLog.scrollHeight;
                }
                alert((locales[lang] || locales.vi).scanLogSecurityError.replace('{msg}', errMsg));
                saveCurrentScanData();
                return;
            }

            if (results && results[0] && results[0].result) {
                const newImages = results[0].result;
                let addedCount = 0;
                newImages.forEach(newImg => {
                    if (!allScannedImages.some(existingImg => existingImg.highResUrl === newImg.highResUrl)) {
                        allScannedImages.push(newImg);
                        addedCount++;
                    }
                });
                
                filterAndDisplayImages();
                
                if (scanLog) {
                    scanLog.textContent += (locales[lang] || locales.vi).scanLogAllScannedMore;
                    scanLog.scrollTop = scanLog.scrollHeight;
                }
                saveCurrentScanData();
            } else {
                if (scanLog) {
                    scanLog.textContent += (locales[lang] || locales.vi).scanLogNoImages;
                    scanLog.scrollTop = scanLog.scrollHeight;
                }
                alert((locales[lang] || locales.vi).scanLogNoImages);
                saveCurrentScanData();
            }
        });
    } catch (e) {
        isScanningMoreNow = false;
        if (scanBtn) scanBtn.disabled = false;
        if (scanMoreBtn) scanMoreBtn.disabled = (allScannedImages.length === 0);
        applyLocalization(lang);
        
        if (scanLog) {
            scanLog.textContent += (locales[lang] || locales.vi).scanLogException.replace('{msg}', e.message);
            scanLog.scrollTop = scanLog.scrollHeight;
        }
        alert("Lỗi: " + e.message);
        saveCurrentScanData();
    }
}

async function handleClearScan() {
    allScannedImages = [];
    filteredImages = [];
    scanActiveTabHost = "";
    
    const settingsLang = document.getElementById('settingsLang');
    const lang = settingsLang ? settingsLang.value : 'vi';
    const translation = locales[lang] || locales.vi;

    const scanLog = document.getElementById('scanLog');
    if (scanLog) {
        scanLog.textContent = translation.scanLogReady;
    }

    const imageDetailCard = document.getElementById('imageDetailCard');
    if (imageDetailCard) {
        imageDetailCard.innerHTML = `<div class="detail-placeholder">${translation.detailPlaceholder}</div>`;
    }

    filterAndDisplayImages();
    saveCurrentScanData();
}

// Filter and render statistics dynamically
function filterAndDisplayImages() {
    const scanMinHeight = document.getElementById('scanMinHeight');
    const H = parseInt(scanMinHeight.value, 10) || 0;

    // Filter in-memory scanned elements instantly based on original/resolved height
    filteredImages = allScannedImages.filter(img => img.height >= H);

    // Update statistics badges
    document.getElementById('statScannedCount').textContent = allScannedImages.length;
    document.getElementById('statFilteredCount').textContent = filteredImages.length;

    // Enable/disable download button based on filtered count
    const scanDownloadBtn = document.getElementById('scanDownloadBtn');
    if (scanDownloadBtn) {
        if (filteredImages.length > 0) {
            scanDownloadBtn.disabled = false;
            scanDownloadBtn.textContent = `TẢI HÌNH VỀ MÁY (${filteredImages.length} ảnh)`;
        } else {
            scanDownloadBtn.disabled = true;
            scanDownloadBtn.textContent = `TẢI HÌNH VỀ MÁY (0 ảnh)`;
        }
    }

    // Synchronize Quét tiếp and Xoá buttons based on scanned count and scanning active flags
    const scanMoreBtn = document.getElementById('scanMoreBtn');
    if (scanMoreBtn) {
        scanMoreBtn.disabled = (allScannedImages.length === 0 || isScanningNow || isScanningMoreNow);
    }

    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.disabled = (allScannedImages.length === 0 || isScanningNow || isScanningMoreNow);
    }

    // Populate Thumbnail grid and handle item clicks for split details
    const thumbGrid = document.getElementById('thumbGrid');
    const scanResultsArea = document.getElementById('scanResultsArea');
    const imageDetailCard = document.getElementById('imageDetailCard');

    if (thumbGrid && scanResultsArea && imageDetailCard) {
        // Clear grid and detail pane
        thumbGrid.innerHTML = '';
        imageDetailCard.innerHTML = '<div class="detail-placeholder">Bấm vào một hình ảnh bên trái để xem chi tiết.</div>';

        if (filteredImages.length > 0) {
            scanResultsArea.style.display = 'block';

            filteredImages.forEach((img, index) => {
                const thumbImg = document.createElement('img');
                thumbImg.src = img.src || img.highResUrl;
                thumbImg.className = 'thumb-item';
                thumbImg.title = img.filename;

                thumbImg.addEventListener('click', () => {
                    // Highlight selected thumbnail
                    const allThumbs = thumbGrid.querySelectorAll('.thumb-item');
                    allThumbs.forEach(t => t.classList.remove('selected'));
                    thumbImg.classList.add('selected');

                    // Compute destination folder name based on toggles
                    let folderName = "Thư mục gốc";
                    const autoFolder = document.getElementById('scanAutoFolder').checked;
                    if (autoFolder) {
                        let targetHost = "";
                        if (scanActiveTabHost && !scanActiveTabHost.includes("google.com")) {
                            targetHost = scanActiveTabHost;
                        } else {
                            try {
                                const urlObj = new URL(img.sourceSiteUrl);
                                targetHost = urlObj.hostname;
                            } catch (e) {}
                        }

                        if (targetHost) {
                            folderName = getMainDomain(targetHost);
                        } else {
                            folderName = "scanned_images";
                        }
                    }

                    // Display details
                    let sourceDomainName = "Không xác định";
                    try {
                        sourceDomainName = getMainDomain(new URL(img.sourceSiteUrl).hostname);
                    } catch (e) {}

                    imageDetailCard.innerHTML = `
                        <div class="detail-info">
                            <div class="detail-preview-container" style="text-align: center; margin-bottom: 4px;">
                                <img src="${img.src || img.highResUrl}" style="max-height: 50px; max-width: 100%; object-fit: contain; border-radius: 4px; border: 1px solid var(--card-border);" />
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Tên tệp:</span>
                                <span class="detail-value" title="${img.filename}">${img.filename}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Kích thước:</span>
                                <span class="detail-value">${img.width} × ${img.height} px</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Thư mục tải:</span>
                                <span class="detail-value" title="${folderName}">${folderName}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Tên miền nguồn:</span>
                                <span class="detail-value" title="${img.sourceSiteUrl}">${sourceDomainName}</span>
                            </div>
                            <div class="detail-actions">
                                <a href="${img.highResUrl}" target="_blank" class="detail-link-btn">Xem ảnh HD</a>
                                <a href="${img.sourceSiteUrl}" target="_blank" class="detail-link-btn">Trang nguồn</a>
                            </div>
                        </div>
                    `;
                });

                thumbGrid.appendChild(thumbImg);
            });

            // Automatically select the first thumbnail
            const firstThumb = thumbGrid.querySelector('.thumb-item');
            if (firstThumb) {
                firstThumb.click();
            }
        } else {
            scanResultsArea.style.display = 'none';
        }
    }
}

function generateAPACitation(img, finalFilename, now, lang) {
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    
    let domain = "Không xác định";
    try {
        domain = getMainDomain(new URL(img.sourceSiteUrl).hostname);
    } catch (e) {
        if (lang === 'en') domain = "Unknown";
    }

    const title = finalFilename || img.filename;
    
    if (lang === 'en') {
        return `${title}. (${yyyy}, ${mm}/${dd}). [Image]. ${domain}. Retrieved from ${img.sourceSiteUrl}`;
    } else {
        return `${title}. (${yyyy}, ${dd}/${mm}). [Hình ảnh]. ${domain}. Lấy từ ${img.sourceSiteUrl}`;
    }
}

function generateChicagoCitation(img, finalFilename, now, lang) {
    let domain = "Không xác định";
    try {
        domain = getMainDomain(new URL(img.sourceSiteUrl).hostname);
    } catch (e) {
        if (lang === 'en') domain = "Unknown";
    }

    const title = finalFilename || img.filename;

    if (lang === 'en') {
        const months = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
        const monthName = months[now.getMonth()];
        return `"${title}." Digital image. ${domain}. Accessed ${monthName} ${now.getDate()}, ${now.getFullYear()}. ${img.sourceSiteUrl}`;
    } else {
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        return `"${title}." Hình ảnh kỹ thuật số. ${domain}. Truy cập ngày ${dd}/${mm}/${now.getFullYear()}. Lấy từ ${img.sourceSiteUrl}`;
    }
}

// Execute downloads of filtered images
async function handlePageDownload() {
    if (filteredImages.length === 0) return;

    const autoFolder = document.getElementById('scanAutoFolder').checked;
    const autoRename = document.getElementById('scanAutoRename').checked;

    // Create timestamp string formatted as YYYYMMDDSS
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${yyyy}${mm}${dd}${ss}`;

    const settingsLang = document.getElementById('settingsLang');
    const lang = settingsLang ? settingsLang.value : 'vi';

    // Group images by target folder name
    const groups = {};
    filteredImages.forEach((img, index) => {
        let folderName = "";

        if (autoFolder) {
            let targetHost = "";
            if (scanActiveTabHost && !scanActiveTabHost.includes("google.com")) {
                targetHost = scanActiveTabHost;
            } else {
                try {
                    const urlObj = new URL(img.sourceSiteUrl);
                    targetHost = urlObj.hostname;
                } catch (e) {
                    targetHost = scanActiveTabHost;
                }
            }
            
            if (targetHost) {
                folderName = getMainDomain(targetHost);
                folderName = folderName.replace(/[^a-zA-Z0-9.-]/g, '_');
            } else {
                folderName = "scanned_images";
            }
        }

        if (!groups[folderName]) {
            groups[folderName] = [];
        }
        groups[folderName].push({ img, originalIndex: index });
    });

    // Iterate over each group to download images and generate corresponding citation.txt
    for (const [folderName, items] of Object.entries(groups)) {
        const citationLines = [];
        
        items.forEach((item, idx) => {
            const { img, originalIndex } = item;
            let finalFilename = img.filename;

            if (autoRename) {
                let ext = "jpg";
                const match = img.filename.match(/\.([a-zA-Z0-9]+)(?:[\?#].*)?$/);
                if (match) {
                    const checkExt = match[1].toLowerCase();
                    if (checkExt.length <= 5 && /^[a-z0-9]+$/.test(checkExt)) {
                        ext = checkExt;
                    }
                }
                finalFilename = `${timestamp}_${originalIndex + 1}.${ext}`;
            }

            const basePath = "Download Images";
            const downloadPath = folderName ? `${basePath}/${folderName}/${finalFilename}` : `${basePath}/${finalFilename}`;

            // Download Image
            chrome.downloads.download({
                url: img.highResUrl,
                filename: downloadPath,
                conflictAction: 'uniquify'
            }, (downloadId) => {
                if (chrome.runtime.lastError) {
                    console.warn(`Download failed: ${chrome.runtime.lastError.message}`);
                }
            });

            // Generate APA and Chicago citation entries
            const apaCitation = generateAPACitation(img, finalFilename, now, lang);
            const chicagoCitation = generateChicagoCitation(img, finalFilename, now, lang);

            if (lang === 'en') {
                citationLines.push(
                    `${idx + 1}. File: ${finalFilename}\n` +
                    `   APA     : ${apaCitation}\n` +
                    `   Chicago : ${chicagoCitation}\n` +
                    `   URL     : ${img.highResUrl}\n`
                );
            } else {
                citationLines.push(
                    `${idx + 1}. Tệp: ${finalFilename}\n` +
                    `   APA     : ${apaCitation}\n` +
                    `   Chicago : ${chicagoCitation}\n` +
                    `   URL     : ${img.highResUrl}\n`
                );
            }
        });

        // Compile citation file content
        const timeString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        
        let citationHeader = "";
        if (lang === 'en') {
            citationHeader =
`===========================================================
IMAGE CITATIONS — APA & CHICAGO STYLE
Generated by: Smart Image Downloader v4.2 Pro
===========================================================
Download Date : ${timeString}
Target Folder : ${folderName ? `Download Images/${folderName}` : "Download Images (Root)"}
Total Images  : ${items.length}
-----------------------------------------------------------

`;
        } else {
            citationHeader =
`===========================================================
TRÍCH DẪN HÌNH ẢNH — CHUẨN APA & CHICAGO
Tạo bởi: Tiện Ích Tải Hình Thông Minh v4.2 Pro
===========================================================
Thời gian tải : ${timeString}
Thư mục lưu   : ${folderName ? `Download Images/${folderName}` : "Download Images (Thư mục gốc)"}
Tổng số ảnh   : ${items.length}
-----------------------------------------------------------

`;
        }

        const citationContent = citationHeader + citationLines.join('\n');
        const blob = new Blob([citationContent], { type: 'text/plain;charset=utf-8' });
        const blobUrl = URL.createObjectURL(blob);
        const citationFilename = folderName ? `Download Images/${folderName}/citation.txt` : `Download Images/citation.txt`;

        chrome.downloads.download({
            url: blobUrl,
            filename: citationFilename,
            conflictAction: 'overwrite'
        }, (downloadId) => {
            URL.revokeObjectURL(blobUrl);
            if (chrome.runtime.lastError) {
                console.warn(`Citation download failed: ${chrome.runtime.lastError.message}`);
            }
        });
    }
}


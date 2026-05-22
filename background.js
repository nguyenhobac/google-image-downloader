// Smart Image Downloader v4.2 Pro - Background Service Worker
// Smart Search tab has been removed; no background processing is needed.
// This minimal service worker is retained to satisfy Manifest V3 requirements.

chrome.runtime.onInstalled.addListener(() => {
    // Extension installed/updated - no background state initialization required.
});

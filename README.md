🎞️ vframeshot
Automatically extract video frames and generate WebVTT files for thumbnail previews. Perfect for video players with timeline hover, dynamic thumbnails, and video indexing systems.

🚀 Installation

npm install vframeshot

📦 Description
vframeshot is a lightweight Node.js utility that uses FFmpeg to extract video frames at smart intervals based on the total video duration. It also generates a .vtt (WebVTT) file compatible with modern video players that support visual previews.

🧠 Smart Interval Logic
Frame intervals are dynamically calculated based on the video length:

Video Duration	Frame Interval
< 2 minutes	every 2 seconds
2–10 minutes	every 5 seconds
10–30 minutes	every 10 seconds
30–60 minutes	every 20 seconds
> 60 minutes	every 30 seconds

🛠️ Usage

const { generateFrames } = require('vframeshot');

const videoPath = 'videos/my-video.mp4';
const outputFolder = 'frames';
const vttFilePath = 'videos/my-video.vtt';

generateFrames(videoPath, outputFolder, vttFilePath);
This will generate:

A sequence of images: frame-0001.png, frame-0002.png, ...

A .vtt file synchronized with the images for use in preview-enabled video players (e.g. video.js).

📂 Output Example

frames/
├── frame-0001.png
├── frame-0002.png
├── ...
my-video.vtt
🔧 Requirements
This package depends on:

fluent-ffmpeg

FFmpeg (must be installed and available in your system PATH)

To install FFmpeg:

# Debian/Ubuntu
sudo apt install ffmpeg

# macOS (via Homebrew)
brew install ffmpeg

https://ffmpeg.org/download.html

📄 License
MIT © Carlos Eduardo

🌟 Inspiration
Built for developers and video creators who need lightweight, timeline-aware visual previews for videos — ideal for enhancing UX on content platforms, learning apps, and media dashboards.

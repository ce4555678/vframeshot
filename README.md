# 🎞️ vframeshot

Automatically extract video frames and generate WebVTT files for preview. Perfect for video players with timeline preview, dynamic thumbnails, and indexing systems.

## 📦 Installation

```bash
npm install vframeshot
```

## 🚀 Basic Usage

```javascript
const { generateFrames } = require('vframeshot');

// Basic configuration
const videoPath = 'videos/my-video.mp4';
const outputFolder = 'frames';
const vttFilePath = 'videos/my-video.vtt';

// Generate frames and VTT file
generateFrames(videoPath, outputFolder, vttFilePath);
```

## 🔍 Features

- **Smart Extraction**: Frames extracted at optimized intervals based on video duration
- **WebVTT Format**: Automatic VTT file generation for preview
- **Optimized Thumbnails**: Images generated at 160x90px for better performance
- **Compatibility**: Works with popular players like video.js

## ⚙️ Smart Interval Configuration

| Video Duration | Frame Interval |
|----------------|----------------|
| < 2 minutes    | 2 seconds     |
| 2-10 minutes   | 5 seconds     |
| 10-30 minutes  | 10 seconds    |
| 30-60 minutes  | 20 seconds    |
| > 60 minutes   | 30 seconds    |

## 📂 Output Structure

```
project/
├── frames/
│   ├── frame-0001.png
│   ├── frame-0002.png
│   └── ...
└── video.vtt
```

## 📄 WebVTT Format

```
WEBVTT

00:00:00.000 --> 00:00:02.000
frames/frame-0001.png

00:00:02.000 --> 00:00:04.000
frames/frame-0002.png
```

## 🔧 Prerequisites

- Node.js 12+
- FFmpeg installed on the system

### FFmpeg Installation

```bash
# Debian/Ubuntu
sudo apt install ffmpeg

# macOS
brew install ffmpeg

# Windows
choco install ffmpeg
```

## 🎮 Video.js Integration Example

```javascript
const player = videojs('my-player', {
  plugins: {
    thumbnails: {
      width: 160,
      height: 90,
      vtt: 'path/to/video.vtt'
    }
  }
});
```

```

## 📄 License

MIT © Carlos Eduardo
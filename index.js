const ffmpeg = require("fluent-ffmpeg");
const fs = require("node:fs");
const path = require("node:path");
const ffmpegPath = require("ffmpeg-static");

ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * Calculates the interval based on the video duration.
 * @param {number} duration - The video duration in seconds.
 * @returns {number} The time interval between frames.
 */
function calculateInterval(duration) {
  if (duration < 2 * 60) return 2; // Less than 2 minutes
  if (duration <= 10 * 60) return 5; // 2 to 10 minutes
  if (duration <= 30 * 60) return 10; // 10 to 30 minutes
  if (duration <= 60 * 60) return 20; // 30 to 60 minutes
  return 30; // More than 60 minutes
}

/**
 * Generates video frames at regular intervals and creates a WebVTT file.
 * @param {string} videoPath - The path to the video file.
 * @param {string} outputFolder - The folder where the frames will be saved.
 * @param {string} vttFilePath - The path of the .vtt file to be generated.
 */
exports.generateFrames = (videoPath, outputFolder, vttFilePath) => {
  // Verifica se a pasta de saída existe, se não, cria
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
    console.log(`folder created: ${outputFolder}`);
  }

  ffmpeg.ffprobe(videoPath, (err, metadata) => {
    if (err) {
      console.error("Error obtaining video metadata:", err);
      return;
    }

    const duration = metadata.format.duration;
    const interval = calculateInterval(duration);

    console.log(`Video duration: ${duration} seconds`);
    console.log(`Interval between frames: ${interval} seconds`);

    const outputPattern = path.join(outputFolder, "frame-%04d.png");

    ffmpeg(videoPath)
      .output(outputPattern)
      .outputOptions(["-vf", `scale=160:90,fps=1/${interval}`, "-vsync", "0"])
      .on("end", function () {
        console.log("Frames generated successfully!");
        generateWebVTT(outputFolder, vttFilePath, interval);
      })
      .on("error", function (err) {
        console.error("Error generating frames: ", err);
      })
      .run();
  });
};

/**
 * Generates a WebVTT file based on the generated frames.
 * @param {string} outputFolder - The folder where the frames are saved.
 * @param {string} vttFilePath - The path to save the WebVTT file.
 * @param {number} interval - The interval between frames.
 */
function generateWebVTT(outputFolder, vttFilePath, interval) {
  /** @type {string[]} */
  const files = fs
    .readdirSync(outputFolder)
    .filter((file) => file.endsWith(".png"));

  const vttContent = files
    .map((file, index) => {
      const start = (index * interval).toFixed(3); // Start time (in seconds)
      const end = ((index + 1) * interval).toFixed(3); // End time (in seconds)

      const imageUrl = path.join(
        outputFolder,
        `frame-${(index + 1).toString().padStart(4, "0")}.png`
      );

      return `${formatTime(start)} --> ${formatTime(end)}\n${imageUrl}\n`;
    })
    .join("\n");

  fs.writeFileSync(vttFilePath, `WEBVTT\n\n${vttContent}`);
  console.log(`WebVTT file successfully generated: ${vttFilePath}`);
}

/**
 * Formats the time in seconds to HH:MM:SS.MMM format.
 * @param {string|number} seconds
 * @returns {string}
 */
function formatTime(seconds) {
  const secs = parseFloat(seconds);
  const hrs = Math.floor(secs / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  const s = (secs % 60).toFixed(3);
  return `${padZero(hrs)}:${padZero(mins)}:${padZero(s)}`;
}

/**
 * Adds a leading zero to numbers less than 10.
 * @param {string|number} num
 * @returns {string}
 */
function padZero(num) {
  const n = parseInt(num);
  return n < 10 ? "0" + n : String(n);
}

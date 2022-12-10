import { readFileSync, writeFileSync } from "fs";
import { createCanvas } from "canvas";
const ropes = JSON.parse(readFileSync("./output.json", "utf-8"));

const dimensions = { width: 226, height: 250 };
const offsetX = 213;
const offsetY = 115;
const dark = "#0f0f23";
const light = "#ffff66";

for (const i in ropes) {
  const buffer = createImageOfRope(ropes[i], i);
  writeFileSync(`./images/image-${String(i).padStart(5, "0")}.png`, buffer);
}

function createImageOfRope(rope, i) {
  const canvas = createCanvas(dimensions.width, dimensions.height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = dark;
  ctx.fillRect(0, 0, dimensions.width, dimensions.height);
  ctx.fillStyle = light;

  for (let i = rope.length - 1; i > 0; i--) {
    const { x, y } = rope[i];
    ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
  }
  // Write the image to file
  return canvas.toBuffer("image/png");
}

/*

ffmpeg -framerate 30 -pattern_type glob -i '*.png' \
  -c:v libx264 -pix_fmt yuv420p out.mp4

  */

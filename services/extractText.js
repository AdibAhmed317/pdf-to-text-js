import Tesseract from 'tesseract.js';
import fs from 'fs';

// Function to generate an array of image file paths
function generateImagePaths(prefix, start, end, extension) {
  const paths = [];
  for (let i = start; i <= end; i++) {
    paths.push(`../assets/images/${prefix}${i}.${extension}`);
  }
  return paths;
}
//hello

// Define the range of image files
const imagePrefix = 'page';
const imageStart = 1;
const imageEnd = 146; // Change this to the number of images you have
const imageExtension = 'png';

// Generate the array of image file paths
const images = generateImagePaths(
  imagePrefix,
  imageStart,
  imageEnd,
  imageExtension
);

// Function to extract text from an image
async function extractTextFromImage(imagePath) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(
      imagePath,
      'ben', // Use the Bengali language
      {
        logger: (m) => console.log(m),
      }
    )
      .then(({ data: { text } }) => {
        resolve(text);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// Function to process multiple images and save text to a file
async function processImages(images) {
  let combinedText = '';

  for (const image of images) {
    try {
      const text = await extractTextFromImage(image);
      combinedText += text + '\n\n'; // Append text with spacing between sections
    } catch (error) {
      console.error(`Error processing image ${image}:`, error);
    }
  }

  // Save the combined text to a file
  fs.writeFileSync('output.txt', combinedText, 'utf8');
  console.log('Text extraction complete. Check output.txt for the result.');
}

// Run the process
processImages(images);

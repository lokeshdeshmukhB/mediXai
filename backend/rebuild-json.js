import fs from 'fs';

// Read the malformed file
const rawData = fs.readFileSync('pharmacy_quiz_data.json', 'utf8');

// Strategy: Extract each category section separately
const categories = ['Pharmacology', 'Medicinal Chemistry', 'Clinical Pharmacy', 'Pharmaceutics', 'Pharmacotherapy', 'Toxicology'];
const difficulties = ['easy', 'medium', 'hard'];

const quizData = {};

for (const category of categories) {
  quizData[category] = {};
  
  for (const difficulty of difficulties) {
    // Find the pattern: "CategoryName": { "difficulty": [
    const pattern = new RegExp(`"${category}"\\s*:\\s*\\{[\\s\\S]*?"${difficulty}"\\s*:\\s*\\[([\\s\\S]*?)\\]`, 'i');
    const match = rawData.match(pattern);
    
    if (match && match[1]) {
      try {
        // Try to parse the questions array
        const questionsStr = '[' + match[1] + ']';
        const questions = JSON.parse(questionsStr);
        quizData[category][difficulty] = questions;
        console.log(`✓ Extracted ${category} - ${difficulty}: ${questions.length} questions`);
      } catch (error) {
        console.log(`✗ Failed to parse ${category} - ${difficulty}:`, error.message);
        quizData[category][difficulty] = [];
      }
    } else {
      console.log(`✗ Could not find ${category} - ${difficulty}`);
      quizData[category][difficulty] = [];
    }
  }
}

// Create the final structure
const finalData = { quizData };

// Save it
fs.writeFileSync('pharmacy_quiz_data_fixed.json', JSON.stringify(finalData, null, 2));
console.log('\n✓ Created pharmacy_quiz_data_fixed.json');

// Backup and replace
if (!fs.existsSync('pharmacy_quiz_data_backup.json')) {
  fs.copyFileSync('pharmacy_quiz_data.json', 'pharmacy_quiz_data_backup.json');
  console.log('✓ Created backup');
}

fs.copyFileSync('pharmacy_quiz_data_fixed.json', 'pharmacy_quiz_data.json');
console.log('✓ Replaced original file');

// Verify
const verified = JSON.parse(fs.readFileSync('pharmacy_quiz_data.json', 'utf8'));
console.log('\n✓ Verification successful!');
console.log('Categories:', Object.keys(verified.quizData));

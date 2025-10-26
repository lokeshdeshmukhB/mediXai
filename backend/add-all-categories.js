import fs from 'fs';

// Read existing Pharmacology data
const existing = JSON.parse(fs.readFileSync('pharmacy_quiz_data.json', 'utf8'));
const quizData = existing.quizData || {};

// Ensure Pharmacology exists
if (!quizData.Pharmacology) {
  quizData.Pharmacology = { easy: [], medium: [], hard: [] };
}

// Add placeholder empty arrays for other categories
const categories = ['Medicinal Chemistry', 'Clinical Pharmacy', 'Pharmaceutics', 'Pharmacotherapy', 'Toxicology'];

for (const cat of categories) {
  if (!quizData[cat]) {
    quizData[cat] = {
      easy: [],
      medium: [],
      hard: []
    };
  }
}

// Save updated structure
const finalData = { quizData };
fs.writeFileSync('pharmacy_quiz_data.json', JSON.stringify(finalData, null, 2));

console.log('✓ Added all 6 categories to pharmacy_quiz_data.json');
console.log('Categories:', Object.keys(quizData));
console.log('\nNote: Empty categories will use fallback questions from controller');

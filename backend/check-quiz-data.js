import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, 'pharmacy_quiz_data.json');
const rawData = fs.readFileSync(jsonPath, 'utf8');
const parsed = JSON.parse(rawData);

console.log('=== Quiz Data Analysis ===\n');
console.log('Top-level keys:', Object.keys(parsed));

if (parsed.quizData) {
  const quizData = parsed.quizData;
  console.log('\nCategories:', Object.keys(quizData));
  
  console.log('\n=== Question Counts ===');
  for (const [category, difficulties] of Object.entries(quizData)) {
    console.log(`\n${category}:`);
    for (const [difficulty, questions] of Object.entries(difficulties)) {
      console.log(`  ${difficulty}: ${questions.length} questions`);
      if (questions.length > 0) {
        console.log(`    Sample: "${questions[0].question.substring(0, 50)}..."`);
      }
    }
  }
  
  // Check total questions
  let total = 0;
  for (const category of Object.values(quizData)) {
    for (const questions of Object.values(category)) {
      total += questions.length;
    }
  }
  console.log(`\n=== Total Questions: ${total} ===`);
}

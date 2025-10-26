import fs from 'fs';

try {
  const data = fs.readFileSync('pharmacy_quiz_data.json', 'utf8');
  const parsed = JSON.parse(data);
  console.log('✓ JSON is valid');
  console.log('Top-level keys:', Object.keys(parsed));
  
  if (parsed.quizData) {
    console.log('Quiz categories:', Object.keys(parsed.quizData));
  } else {
    console.log('Quiz categories:', Object.keys(parsed));
  }
} catch (error) {
  console.log('✗ JSON is invalid');
  console.log('Error:', error.message);
}

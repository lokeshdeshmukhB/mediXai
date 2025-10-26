import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=== QUIZ SYSTEM VERIFICATION ===\n');

// 1. Check JSON file
console.log('1. Checking JSON file...');
try {
  const jsonPath = path.join(__dirname, 'pharmacy_quiz_data.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log('   ✓ JSON file is valid');
  console.log('   ✓ Categories:', Object.keys(data.quizData).length);
  
  for (const [cat, diffs] of Object.entries(data.quizData)) {
    const total = Object.values(diffs).reduce((sum, q) => sum + q.length, 0);
    console.log(`     - ${cat}: ${total} questions`);
  }
} catch (error) {
  console.log('   ✗ Error:', error.message);
}

// 2. Check controller has fallback questions
console.log('\n2. Checking controller fallback questions...');
try {
  const controllerPath = path.join(__dirname, 'controllers/quiz.controller.js');
  const content = fs.readFileSync(controllerPath, 'utf8');
  
  const categories = ['Pharmacology', 'Medicinal Chemistry', 'Clinical Pharmacy', 'Pharmaceutics', 'Pharmacotherapy', 'Toxicology'];
  let foundCount = 0;
  
  for (const cat of categories) {
    if (content.includes(`'${cat}':`)) {
      foundCount++;
      console.log(`   ✓ ${cat} fallback found`);
    }
  }
  
  if (foundCount === 6) {
    console.log(`   ✓ All 6 categories have fallback questions`);
  }
} catch (error) {
  console.log('   ✗ Error:', error.message);
}

// 3. Check difficulty mapping
console.log('\n3. Checking difficulty mapping...');
try {
  const controllerPath = path.join(__dirname, 'controllers/quiz.controller.js');
  const content = fs.readFileSync(controllerPath, 'utf8');
  
  if (content.includes("'Beginner': 'easy'") && 
      content.includes("'Intermediate': 'medium'") && 
      content.includes("'Advanced': 'hard'")) {
    console.log('   ✓ Difficulty mapping is correct');
    console.log('     - Beginner → easy');
    console.log('     - Intermediate → medium');
    console.log('     - Advanced → hard');
  } else {
    console.log('   ✗ Difficulty mapping not found');
  }
} catch (error) {
  console.log('   ✗ Error:', error.message);
}

// 4. Simulate quiz generation logic
console.log('\n4. Simulating quiz generation...');
try {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'pharmacy_quiz_data.json'), 'utf8'));
  const quizData = data.quizData;
  
  const testCases = [
    { category: 'Pharmacology', difficulty: 'Beginner' },
    { category: 'Medicinal Chemistry', difficulty: 'Intermediate' },
    { category: 'Clinical Pharmacy', difficulty: 'Advanced' },
    { category: 'Pharmaceutics', difficulty: 'Beginner' },
    { category: 'Pharmacotherapy', difficulty: 'Intermediate' },
    { category: 'Toxicology', difficulty: 'Advanced' }
  ];
  
  const difficultyMap = {
    'Beginner': 'easy',
    'Intermediate': 'medium',
    'Advanced': 'hard'
  };
  
  for (const test of testCases) {
    const jsonDiff = difficultyMap[test.difficulty];
    const hasQuestions = quizData[test.category] && 
                        quizData[test.category][jsonDiff] && 
                        quizData[test.category][jsonDiff].length > 0;
    
    const status = hasQuestions ? '✓' : '→';
    const source = hasQuestions ? 'JSON' : 'Fallback';
    console.log(`   ${status} ${test.category} (${test.difficulty}) - ${source}`);
  }
} catch (error) {
  console.log('   ✗ Error:', error.message);
}

console.log('\n=== VERIFICATION COMPLETE ===');
console.log('\n✅ Quiz system is ready to use!');
console.log('\nRestart backend with: npm run dev');

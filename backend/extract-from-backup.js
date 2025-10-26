import fs from 'fs';

// Read the backup file
const backup = fs.readFileSync('pharmacy_quiz_data_backup.json', 'utf8');

// Find where the valid quizData structure starts (around line 569)
const startMarker = '{\n  "quizData": {';
const startIndex = backup.indexOf(startMarker);

if (startIndex === -1) {
  console.log('Could not find quizData structure');
  process.exit(1);
}

// Extract from that point to end
let extracted = backup.substring(startIndex);

// Try to find the proper ending by counting braces
let depth = 0;
let inString = false;
let escape = false;
let endIndex = -1;

for (let i = 0; i < extracted.length; i++) {
  const char = extracted[i];
  
  if (escape) {
    escape = false;
    continue;
  }
  
  if (char === '\\') {
    escape = true;
    continue;
  }
  
  if (char === '"') {
    inString = !inString;
    continue;
  }
  
  if (inString) continue;
  
  if (char === '{') depth++;
  if (char === '}') {
    depth--;
    if (depth === 0) {
      endIndex = i + 1;
      break;
    }
  }
}

if (endIndex === -1) {
  console.log('Could not find proper ending');
  process.exit(1);
}

const validJSON = extracted.substring(0, endIndex);

try {
  const parsed = JSON.parse(validJSON);
  console.log('✓ Successfully extracted valid JSON');
  console.log('Categories:', Object.keys(parsed.quizData));
  
  // Count questions
  let totalQuestions = 0;
  for (const [category, difficulties] of Object.entries(parsed.quizData)) {
    console.log(`\n${category}:`);
    for (const [difficulty, questions] of Object.entries(difficulties)) {
      console.log(`  ${difficulty}: ${questions.length} questions`);
      totalQuestions += questions.length;
    }
  }
  
  console.log(`\n✓ Total: ${totalQuestions} questions`);
  
  // Save the properly formatted JSON
  fs.writeFileSync('pharmacy_quiz_data.json', JSON.stringify(parsed, null, 2));
  console.log('\n✓ Saved to pharmacy_quiz_data.json');
  
} catch (error) {
  console.log('✗ Parse error:', error.message);
  console.log('Extracted length:', validJSON.length);
  
  // Save what we extracted for debugging
  fs.writeFileSync('extracted_debug.json', validJSON);
  console.log('Saved extracted content to extracted_debug.json for debugging');
}

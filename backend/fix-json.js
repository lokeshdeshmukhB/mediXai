import fs from 'fs';

// Read the malformed JSON
const rawData = fs.readFileSync('pharmacy_quiz_data.json', 'utf8');

// Try to extract the valid JSON structure starting from "quizData"
const match = rawData.match(/"quizData"\s*:\s*\{[\s\S]*\}\s*\}/);

if (match) {
  // Wrap it properly
  const fixed = `{\n${match[0]}\n}`;
  
  try {
    // Validate it
    const parsed = JSON.parse(fixed);
    console.log('✓ Fixed JSON is valid');
    console.log('Categories:', Object.keys(parsed.quizData));
    
    // Save the fixed version
    fs.writeFileSync('pharmacy_quiz_data_fixed.json', JSON.stringify(parsed, null, 2));
    console.log('✓ Saved to pharmacy_quiz_data_fixed.json');
    
    // Backup original and replace
    fs.copyFileSync('pharmacy_quiz_data.json', 'pharmacy_quiz_data_backup.json');
    fs.copyFileSync('pharmacy_quiz_data_fixed.json', 'pharmacy_quiz_data.json');
    console.log('✓ Replaced original file (backup saved)');
    
  } catch (error) {
    console.log('✗ Still invalid:', error.message);
  }
} else {
  console.log('✗ Could not find quizData structure');
}

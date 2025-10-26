import fs from 'fs';

// Read the file
const rawData = fs.readFileSync('pharmacy_quiz_data.json', 'utf8');

// Find where the valid JSON starts (line 569 area)
const startIndex = rawData.indexOf('{\n  "quizData": {');

if (startIndex !== -1) {
  // Extract from that point to the end
  const extracted = rawData.substring(startIndex);
  
  // Find the last closing brace
  let braceCount = 0;
  let endIndex = -1;
  
  for (let i = 0; i < extracted.length; i++) {
    if (extracted[i] === '{') braceCount++;
    if (extracted[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        endIndex = i + 1;
        break;
      }
    }
  }
  
  if (endIndex !== -1) {
    const validJSON = extracted.substring(0, endIndex);
    
    try {
      const parsed = JSON.parse(validJSON);
      console.log('✓ Successfully extracted valid JSON');
      console.log('Categories:', Object.keys(parsed.quizData));
      
      // Count questions per category
      for (const [category, difficulties] of Object.entries(parsed.quizData)) {
        console.log(`\n${category}:`);
        for (const [diff, questions] of Object.entries(difficulties)) {
          console.log(`  ${diff}: ${questions.length} questions`);
        }
      }
      
      // Save the fixed version
      fs.writeFileSync('pharmacy_quiz_data_fixed.json', JSON.stringify(parsed, null, 2));
      console.log('\n✓ Saved to pharmacy_quiz_data_fixed.json');
      
      // Backup and replace
      if (fs.existsSync('pharmacy_quiz_data_backup.json')) {
        console.log('Backup already exists, skipping backup');
      } else {
        fs.copyFileSync('pharmacy_quiz_data.json', 'pharmacy_quiz_data_backup.json');
        console.log('✓ Created backup');
      }
      
      fs.copyFileSync('pharmacy_quiz_data_fixed.json', 'pharmacy_quiz_data.json');
      console.log('✓ Replaced original file');
      
    } catch (error) {
      console.log('✗ Parse error:', error.message);
    }
  } else {
    console.log('✗ Could not find matching closing brace');
  }
} else {
  console.log('✗ Could not find start of quizData');
}

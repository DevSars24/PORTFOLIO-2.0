const fs = require('fs-extra');
const path = require('path');

const filePath = path.join(__dirname, '../data/training.jsonl');

async function validate() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const lines = data.trim().split('\n');
    if (lines.length < 1) throw new Error('Empty file');
    
    lines.forEach((line, i) => {
      const parsed = JSON.parse(line);
      if (!parsed.messages || parsed.messages.length !== 2 || parsed.messages[0].role !== 'user' || parsed.messages[1].role !== 'model') {
        throw new Error(`Invalid format at line ${i + 1}`);
      }
    });
    console.log(`✅ Validated ${lines.length} examples! Ready for tuning.`);
  } catch (err) {
    console.error('❌ Validation failed:', err.message);
  }
}

validate();
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const jsonlPath = path.join(__dirname, '../data/training.jsonl');
const projectId = 'saurabh-portfolio-68d47'; // Your project ID
const displayName = 'sarvis-tuned-model';
const region = 'us-central1';

async function train() {
  try {
    // 1. Validate first
    require('./validateJsonl');

    // 2. Create GCS bucket if needed (one-time)
    execSync(`gsutil mb -l ${region} gs://sarvis-tuning-bucket/`);

    // 3. Upload dataset
    execSync(`gsutil cp ${jsonlPath} gs://sarvis-tuning-bucket/training.jsonl`);

    // 4. Create tuning job (via gcloud)
    execSync(`gcloud ai custom-jobs create \\
      --region=${region} \\
      --display-name=${displayName} \\
      --config=gs://sarvis-tuning-bucket/tuning-config.yaml`, { stdio: 'inherit' });

    console.log(`✅ Tuning job started! Check console: https://console.cloud.google.com/ai/studio/tuning?project=${projectId}`);
    console.log('Model ID ready in 10-60 mins—update Contact.jsx with it.');
  } catch (err) {
    console.error('❌ Training failed:', err.message);
  }
}

train();
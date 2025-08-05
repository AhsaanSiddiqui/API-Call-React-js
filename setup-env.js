import fs from 'fs';
import path from 'path';

// Environment variables for development
const envContent = `# API Configuration
VITE_API_BASE_URL=https://fakestoreapi.com

# Server Configuration (for backend)
PORT=3001
NODE_ENV=development

# External API Configuration
EXTERNAL_API_URL=https://fakestoreapi.com

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
`;

// Create .env file
const envPath = path.join(process.cwd(), '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('📁 Location:', envPath);
  console.log('\n🔧 Next steps:');
  console.log('1. Review the .env file content');
  console.log('2. Run: npm install');
  console.log('3. Run: npm start');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('\n📝 Manual setup:');
  console.log('1. Create a .env file in the root directory');
  console.log('2. Copy the content from environment.env');
  console.log('3. Save the file');
}

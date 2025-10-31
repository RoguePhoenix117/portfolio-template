#!/usr/bin/env node

/**
 * Template Setup Script
 * 
 * This script helps users customize the template after forking.
 * Run with: node scripts/setup-template.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setupTemplate() {
  console.log('🎉 Welcome to the Portfolio Template Setup!');
  console.log('This script will help you customize the template for your portfolio.\n');

  try {
    // Get user information
    const name = await question('What is your name? ');
    const email = await question('What is your email? ');
    const github = await question('What is your GitHub username? ');
    const linkedin = await question('What is your LinkedIn username? (optional) ');
    const twitter = await question('What is your X username? (optional) ');

    console.log('\n📝 Updating files...');

    // Update package.json
    updatePackageJson(name, github);
    
    // Update layout.tsx
    updateLayout(name, email);
    
    // Update components
    updateComponents(name, email, github, linkedin, twitter);

    console.log('\n✅ Setup complete! Your portfolio has been customized.');
    console.log('\nNext steps:');
    console.log('1. Run "pnpm dev" to start the development server');
    console.log('2. Visit http://localhost:3000 to see your portfolio');
    console.log('3. Customize the content in the components folder');
    console.log('4. Add your projects and blog posts');
    console.log('5. Deploy to Vercel or Netlify');
    
  } catch (error) {
    console.error('❌ Error during setup:', error.message);
  } finally {
    rl.close();
  }
}

function updatePackageJson(name, github) {
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  packageJson.name = `${name.toLowerCase().replace(/\s+/g, '-')}-portfolio`;
  packageJson.repository.url = `https://github.com/${github}/${packageJson.name}.git`;
  packageJson.homepage = `https://github.com/${github}/${packageJson.name}#readme`;
  packageJson.bugs.url = `https://github.com/${github}/${packageJson.name}/issues`;
  
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Updated package.json');
}

function updateLayout(name, email) {
  const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
  let layout = fs.readFileSync(layoutPath, 'utf8');
  
  layout = layout.replace(/Your Name/g, name);
  layout = layout.replace(/your\.email@example\.com/g, email);
  
  fs.writeFileSync(layoutPath, layout);
  console.log('✅ Updated layout.tsx');
}

function updateComponents(name, email, github, linkedin, twitter) {
  const componentsDir = path.join(process.cwd(), 'src/components');
  
  // Update Navigation
  updateFile(path.join(componentsDir, 'Navigation.tsx'), {
    'Your Name': name,
    'yourusername': github,
    'your.email@example.com': email
  });
  
  // Update Footer
  updateFile(path.join(componentsDir, 'Footer.tsx'), {
    'Your Name': name,
    'yourusername': github,
    'your.email@example.com': email
  });
  
  // Update Hero
  updateFile(path.join(componentsDir, 'Hero.tsx'), {
    'Your Name': name,
    'yourusername': github,
    'your.email@example.com': email
  });
  
  // Update About
  updateFile(path.join(componentsDir, 'About.tsx'), {
    'Your Name': name
  });
  
  // Update Contact
  updateFile(path.join(componentsDir, 'Contact.tsx'), {
    'Your Name': name,
    'yourusername': github,
    'your.email@example.com': email
  });
  
  console.log('✅ Updated all components');
}

function updateFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  Object.entries(replacements).forEach(([search, replace]) => {
    content = content.replace(new RegExp(search, 'g'), replace);
  });
  
  fs.writeFileSync(filePath, content);
}

// Run the setup
setupTemplate();

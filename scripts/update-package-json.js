const fs = require('fs');
const path = require('path');

async function updatePackageJson() {
  try {
    // Read user configuration
    const userConfigPath = path.join(__dirname, '..', 'public', 'user.json');
    const userConfig = JSON.parse(fs.readFileSync(userConfigPath, 'utf8'));
    
    // Read package.json
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Update package.json with user configuration
    packageJson.repository.url = userConfig.repository.url;
    packageJson.homepage = userConfig.repository.homepage;
    packageJson.bugs.url = userConfig.repository.issues;
    
    // Write updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    
    console.log('✅ Package.json updated successfully with user configuration');
  } catch (error) {
    console.error('❌ Error updating package.json:', error.message);
    process.exit(1);
  }
}

updatePackageJson();

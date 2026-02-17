import { copyFile, mkdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync } from 'fs';

const execAsync = promisify(exec);

const releaseDir = 'release';

async function main() {
	try {
		// Read version from package.json
		const packageJson = JSON.parse(await readFile('package.json', 'utf8'));
		const version = packageJson.version;
		
		console.log(`🚀 Building release for version ${version}...`);
		
		// Step 1: Run build
		console.log('\n📦 Building plugin...');
		await execAsync('npm run build');
		console.log('✓ Build completed successfully');
		
		// Step 2: Create release directory structure
		const versionDir = join(releaseDir, version);
		if (existsSync(versionDir)) {
			console.log(`⚠️  Release directory already exists: ${versionDir}`);
			console.log('   Files will be overwritten.');
		}
		await mkdir(versionDir, { recursive: true });
		console.log(`✓ Created release directory: ${versionDir}/`);
		
		// Step 3: Copy files to release directory
		console.log('\n📋 Copying files to release directory...');
		
		const filesToCopy = [
			{ src: './manifest.json', dest: join(versionDir, 'manifest.json') },
			{ src: './main.js', dest: join(versionDir, 'main.js') },
			{ src: './styles.css', dest: join(versionDir, 'styles.css') }
		];
		
		for (const { src, dest } of filesToCopy) {
			try {
				await copyFile(src, dest);
				console.log(`✓ Copied ${src}`);
			} catch (error) {
				console.error(`✗ Failed to copy ${src}:`, error.message);
				process.exit(1);
			}
		}
		
		// Step 4: Create zip archive
		console.log('\n📦 Creating zip file...');
		const zipName = `obsidian-plugin-template-${version}.zip`;
		const zipPath = join(releaseDir, zipName);
		
		// Create zip using system zip command (cross-platform)
		await execAsync(`cd ${versionDir} && zip -r ../${zipName} ./*`);
		console.log(`✓ Created ${zipPath}`);
		
		// Final success message
		console.log('\n✅ Release ${version} is ready!');
		console.log('\n📦 Release structure:');
		console.log(`   ${releaseDir}/`);
		console.log(`   ├── ${version}/`);
		console.log(`   │   ├── manifest.json`);
		console.log(`   │   ├── main.js`);
		console.log(`   │   └── styles.css`);
		console.log(`   └── ${zipName}`);
		console.log('\n🚀 Next steps:');
		console.log(`   1. Go to https://github.com/yourusername/yourrepo/releases/new`);
		console.log(`   2. Choose tag: v${version}`);
		console.log(`   3. Upload ${zipPath}`);
		console.log(`   4. Or upload individual files from ${versionDir}/`);
		
	} catch (error) {
		console.error('❌ Release build failed:', error);
		process.exit(1);
	}
}

main();

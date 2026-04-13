#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('codehava-agent-kit')
  .description('CLI to scaffold the Codehava Agent Kit environment')
  .version('3.0.0');

program
  .command('init')
  .description('Initialize the agent kit in the current directory')
  .action(async () => {
    const targetDir = process.cwd();
    const sourceDir = path.join(__dirname, '..', 'templates');

    console.log(chalk.blue('🚀 Initializing Codehava Agent Kit...'));

    try {
      if (!fs.existsSync(sourceDir)) {
        console.error(chalk.red('❌ Error: Templates not found. Corrupted package?'));
        process.exit(1);
      }

      // Check if user already has AGENTS.md
      if (fs.existsSync(path.join(targetDir, 'AGENTS.md'))) {
        console.log(chalk.yellow('⚠️ AGENTS.md already exists in this project and will be overwritten/merged.'));
      }

      // Copy template to user's directory
      await fs.copy(sourceDir, targetDir, {
        overwrite: true,
        filter: (src) => !src.includes('.DS_Store') && !src.includes('skills-archive')
      });
      
      console.log(chalk.green('\n✅ Selamat! Codehava Agent Kit berhasil di-install.\n'));
      console.log(chalk.cyan('Langkah berikutnya: buka START-HERE.md lalu mulai dari /vibe-plan.\n'));
      
    } catch (err) {
      console.error(chalk.red('❌ Failed to initialize Agent Kit:'), err);
      process.exit(1);
    }
  });

program.parse();

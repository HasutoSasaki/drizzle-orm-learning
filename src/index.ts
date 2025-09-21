/**
 * Drizzle ORM Learning - Main Entry Point
 * 
 * このファイルは学習プログラムのメインエントリーポイントです。
 * 各週の演習を順番に実行できます。
 */

import { work1Exercise } from './exercises/work1-setup';
import { work2Exercise } from './exercises/work2-crud';
import { work3Exercise } from './exercises/work3-relations';
import { work4Exercise } from './exercises/work4-advanced';

async function main() {
  console.log('🚀 Drizzle ORM Learning Program\n');

  const args = process.argv.slice(2);
  const work = args[0];

  try {
    switch (work) {
      case 'work1':
      case '1':
        await work1Exercise();
        break;

      case 'work2':
      case '2':
        await work2Exercise();
        break;

      case 'work3':
      case '3':
        await work3Exercise();
        break;

      case 'work4':
      case '4':
        await work4Exercise();
        break;

      case 'all':
        console.log('Running all exercises...\n');
        await work1Exercise();
        console.log('\n' + '='.repeat(50) + '\n');
        await work2Exercise();
        console.log('\n' + '='.repeat(50) + '\n');
        await work3Exercise();
        console.log('\n' + '='.repeat(50) + '\n');
        await work4Exercise();
        break;

      default:
        console.log('📚 Usage: npm run dev [work1|work2|work3|work4|all]');
        console.log('\nAvailable exercises:');
        console.log('  work1 (1) - Basic Setup and Schema Definition');
        console.log('  work2 (2) - CRUD Operations');
        console.log('  work3 (3) - Relations and Advanced Queries');
        console.log('  work4 (4) - Transactions and Advanced Features');
        console.log('  all       - Run all exercises in sequence');
        console.log('\nExample: npm run dev work1');
        break;
    }
  } catch (error) {
    console.error('❌ Error running exercise:', error);
    process.exit(1);
  }
}

main();
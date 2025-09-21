/**
 * work 1 Exercise: Basic Setup and Schema Definition
 * 
 * このファイルでは、Drizzle ORMの基本的なセットアップと
 * スキーマ定義について学習します。
 */

import { db } from '../db/connection';
import { users, posts, categories, postCategories } from '../db/schema';

export async function work1Exercise() {
  console.log('=== work 1: Basic Setup and Schema ===\n');

  // Exercise 1: データベース接続の確認
  console.log('1. Testing database connection...');
  try {
    // 簡単なクエリでデータベース接続を確認
    const result = await db.execute('SELECT NOW() as current_time');
    console.log('✅ Database connected successfully');
    console.log('Current time:', result.rows[0].current_time);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return;
  }
}
/**
 * work 2 Exercise: Basic CRUD Operations
 * 
 * このファイルでは、Drizzle ORMを使った基本的な
 * CRUD操作について学習します。
 */

import { db } from '../db/connection';
import { users, posts, categories } from '../db/schema';
import { eq, and, or, desc, asc, ne } from 'drizzle-orm';

export async function work2Exercise() {
  console.log('=== work 2: CRUD Operations ===\n');

  try {
    // データベースをクリア（テスト用）
    await db.delete(posts);
    await db.delete(users);
    console.log('🧹 Cleared existing data\n');
    // Exercise 1: Create (データの挿入)
    console.log('1. Creating users...');
    const newUsers = await db.insert(users).values([
      { name: '田中太郎', email: 'tanaka@example.com' },
      { name: '佐藤花子', email: 'sato@example.com' },
      { name: '鈴木一郎', email: 'suzuki@example.com' }
    ]).returning();

    console.log('✅ Users created:', newUsers.length);

    // Exercise 2: Read (データの読み取り)
    console.log('\n2. Reading all users...');
    const allUsers = await db.select().from(users);
    console.log('📖 Total users:', allUsers.length);
    allUsers.forEach(user => {
      console.log(`  - ${user.name} (${user.email})`);
    });

    // Exercise 3: Conditional queries (条件付きクエリ)
    console.log('\n3. Finding specific user...');
    const specificUser = await db.select()
      .from(users)
      .where(eq(users.email, 'tanaka@example.com'));

    if (specificUser.length > 0) {
      console.log('🔍 Found user:', specificUser[0].name);
    }

    // Exercise 4: Insert posts (投稿の作成)
    console.log('\n4. Creating posts...');
    if (allUsers.length > 0) {
      const newPosts = await db.insert(posts).values([
        {
          title: 'Drizzle ORMの基本',
          content: 'Drizzle ORMは素晴らしいツールです...',
          authorId: allUsers[0].id,
          published: true
        },
        {
          title: 'TypeScriptとデータベース',
          content: 'TypeScriptでタイプセーフなDBアクセスを...',
          authorId: allUsers[1].id,
          published: false
        }
      ]).returning();

      console.log('✅ Posts created:', newPosts.length);
    }

    // Exercise 5: Update operations (更新操作)
    console.log('\n5. Updating a post...');
    const updatedPosts = await db.update(posts)
      .set({ published: true })
      .where(eq(posts.published, false))
      .returning();

    console.log('📝 Posts updated:', updatedPosts.length);

    // Exercise 6: Complex queries (複雑なクエリ)
    console.log('\n6. Complex query - published posts ordered by date...');
    const publishedPosts = await db.select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.createdAt));

    publishedPosts.forEach(post => {
      console.log(`  - "${post.title}" by author ID: ${post.authorId}`);
    });

    // Exercise 7: Delete operations (削除操作)
    console.log('\n7. Delete operation (commented out to preserve data)');
    console.log('// const deleted = await db.delete(posts).where(eq(posts.published, false));');

    console.log('\n🎯 練習課題:');
    console.log('1. 新しいユーザーを2人追加してみてください');
    await db.insert(users).values([
      { name: 'サム', email: 'sum@example.com' },
      { name: 'ボブ', email: 'bob@example.com' }
    ])

    console.log('2. 各ユーザーに投稿を作成してみてください');
    const allUsers2 = await db.select().from(users)
    await db.insert(posts).values([
      {
        title: 'Drizzle ORMの基本',
        content: 'Drizzle ORMは素晴らしいツールです...',
        authorId: allUsers2[0].id,
        published: true
      },
      {
        title: 'TypeScriptとデータベース',
        content: 'TypeScriptでタイプセーフなDBアクセスを...',
        authorId: allUsers2[1].id,
        published: false
      }
    ]).returning();

    console.log('3. 特定の条件で投稿を検索してみてください');
    const nonPublishedPosts = await db.select()
      .from(posts)
      .where(ne(posts.published, true)) // 公開されていないもの(ne)
      .orderBy(desc(posts.createdAt));

    nonPublishedPosts.forEach(post => [
      console.log(`  - "${post.title}" by author ID: ${post.authorId}`)
    ])

    console.log('4. 投稿のタイトルを更新してみてください');
    // 特定のユーザーの投稿を更新する場合は、まずユーザーIDを取得
    const targetUser = await db.select().from(users).where(eq(users.email, 'sum@example.com'));
    if (targetUser.length > 0) {
      await db.update(posts)
        .set({ title: "updated title!" })
        .where(eq(posts.authorId, targetUser[0].id));
    }


  } catch (error) {
    console.error('❌ Error during CRUD operations:', error);
  }
}
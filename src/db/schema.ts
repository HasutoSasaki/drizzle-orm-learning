import { pgTable, serial, varchar, text, integer, boolean, bigint } from 'drizzle-orm/pg-core';

// work 1: Basic table definitions
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: bigint('created_at', { mode: 'number' }).notNull().$defaultFn(() => Date.now()),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content'),
  authorId: integer('author_id').references(() => users.id),
  published: boolean('published').default(false),
  createdAt: bigint('created_at', { mode: 'number' }).notNull().$defaultFn(() => Date.now()),
  updatedAt: bigint('updated_at', { mode: 'number' }).notNull().$defaultFn(() => Date.now()),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
});

export const postCategories = pgTable('post_categories', {
  postId: integer('post_id').references(() => posts.id),
  categoryId: integer('category_id').references(() => categories.id),
});
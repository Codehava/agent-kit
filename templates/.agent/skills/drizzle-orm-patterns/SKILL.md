---
name: drizzle-orm-patterns
description: |
  Use when writing Drizzle ORM database code, migrations, or schema design. Very useful for Edge and Serverless database environments like Turso, Neon, or Cloudflare D1. Triggers on drizzle, schema, migration, orm, query, insert, select, postgres, sqlite.
---

# Drizzle ORM Patterns (2025)

## Mental Model
Drizzle is lightweight, TypeScript-first, and heavily Edge-compatible. Unlike Prisma which runs a Rust query engine, Drizzle translates TS directly into SQL, making it extremely fast for serverless (Hono, Vercel Edge).

## 1. Schema Definition (PostgreSQL example)

```typescript
import { pgTable, serial, text, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: text('name'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  authorId: serial('author_id').references(() => users.id),
  title: text('title').notNull(),
  content: text('content'),
});

// Relations for Relational Queries (drizzle.query.findMany)
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
```

## 2. Advanced Queries

### Selection (Relational API vs SQL-Like)
Always prefer SQL-like API (`db.select()`) for complex joins/aggregations. Use Relational API (`db.query.xyz`) for rapid nested fetching.

```typescript
// SQL-Like (Better for performance and aggregations)
import { eq, desc } from 'drizzle-orm';
const result = await db
  .select({
    id: users.id,
    name: users.name,
    postTitle: posts.title
  })
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId))
  .where(eq(users.isActive, true))
  .orderBy(desc(users.createdAt))
  .limit(10);

// Relational API (Better for nested data ease)
const userWithPosts = await db.query.users.findFirst({
  where: eq(users.id, 1),
  with: {
    posts: {
       limit: 5
    }
  }
});
```

## 3. Transactions 
Always use `.transaction()` when mutating multiple tables to ensure ACID compliance.

```typescript
await db.transaction(async (tx) => {
  const [newUser] = await tx.insert(users).values({ email: 'x@x.com' }).returning();
  await tx.insert(posts).values({ authorId: newUser.id, title: 'Welcome' });
});
```

## Anti-Patterns
1. ❌ Don't use `SELECT *` in production code. Always specify columns (`.select({ id: users.id })`).
2. ❌ Never string-concatenate SQL inside Drizzle. Always use `eq()`, `lt()`, `sql\`\`` tagged templates.
3. ❌ Don't forget to push migrations: `npx drizzle-kit push` for dev, or `npx drizzle-kit generate` for prod.

import { sql } from '@vercel/postgres';

export type Story = {
  id: string;
  slug: string | null;
  title: string;
  description: string;
  genre: string;
  status: 'draft' | 'active' | 'completed';
  created_at: Date;
  updated_at: Date;
};

export type Vote = {
  id: string;
  story_id: string;
  user_id: string;
  option_id: string;
  created_at: Date;
};

export type VoteOption = {
  id: string;
  story_id: string;
  title: string;
  description: string;
  vote_count: number;
};

export type User = {
  id: string;
  username: string;
  email: string;
  created_at: Date;
};

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS stories (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug VARCHAR(255),
      title VARCHAR(255) NOT NULL,
      description TEXT,
      genre VARCHAR(100) NOT NULL,
      status VARCHAR(50) DEFAULT 'draft',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  await sql`
    ALTER TABLE stories ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS stories_slug_unique_idx
    ON stories(slug)
    WHERE slug IS NOT NULL;
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS vote_options (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      vote_count INTEGER DEFAULT 0
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS votes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      option_id UUID REFERENCES vote_options(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(story_id, user_id)
    );
  `;

  console.log('Database tables initialized');
}

export async function getStories(genre?: string, status?: string) {
  if (genre && status) {
    const { rows } = await sql<Story[]>`
      SELECT * FROM stories 
      WHERE genre = ${genre} AND status = ${status}
      ORDER BY updated_at DESC
    `;
    return rows;
  }
  const { rows } = await sql<Story[]>`
    SELECT * FROM stories ORDER BY updated_at DESC
  `;
  return rows;
}

export async function getStoryById(id: string) {
  const { rows } = await sql<Story[]>`
    SELECT * FROM stories WHERE id = ${id}
  `;
  return rows[0];
}

export async function getStoryBySlug(slug: string) {
  const { rows } = await sql<Story[]>`
    SELECT * FROM stories
    WHERE slug = ${slug}
       OR LOWER(REPLACE(title, ' ', '-')) = LOWER(${slug})
    ORDER BY updated_at DESC
    LIMIT 1
  `;
  return rows[0];
}

export async function getVoteOptions(storyId: string) {
  const { rows } = await sql<VoteOption[]>`
    SELECT * FROM vote_options WHERE story_id = ${storyId} ORDER BY vote_count DESC
  `;
  return rows;
}

export async function castVote(storyId: string, userId: string, optionId: string) {
  await sql.begin(async (sql) => {
    await sql`
      INSERT INTO users (id, username, email)
      VALUES (
        ${userId}::uuid,
        ${`guest_${userId.slice(0, 8)}`},
        ${`guest_${userId}@ticu.local`}
      )
      ON CONFLICT (id) DO NOTHING
    `;

    const { rows: existingRows } = await sql<{ option_id: string }[]>`
      SELECT option_id
      FROM votes
      WHERE story_id = ${storyId}
        AND user_id = ${userId}
      LIMIT 1
    `;

    const previousOptionId = existingRows[0]?.option_id;

    if (!previousOptionId) {
      await sql`
        INSERT INTO votes (story_id, user_id, option_id)
        VALUES (${storyId}, ${userId}, ${optionId})
      `;

      await sql`
        UPDATE vote_options
        SET vote_count = vote_count + 1
        WHERE id = ${optionId}
      `;
      return;
    }

    if (previousOptionId === optionId) {
      return;
    }

    await sql`
      UPDATE votes
      SET option_id = ${optionId}
      WHERE story_id = ${storyId}
        AND user_id = ${userId}
    `;

    await sql`
      UPDATE vote_options
      SET vote_count = GREATEST(vote_count - 1, 0)
      WHERE id = ${previousOptionId}
    `;

    await sql`
      UPDATE vote_options
      SET vote_count = vote_count + 1
      WHERE id = ${optionId}
    `;
  });
}

export async function getVoteResults(storyId: string) {
  const { rows } = await sql`
    SELECT vo.id, vo.title, vo.description, vo.vote_count,
           COUNT(v.id) as total_votes
    FROM vote_options vo
    LEFT JOIN votes v ON v.option_id = vo.id
    WHERE vo.story_id = ${storyId}
    GROUP BY vo.id
    ORDER BY vo.vote_count DESC
  `;
  return rows;
}

export async function createStory(title: string, description: string, genre: string, slug?: string, status: Story['status'] = 'draft') {
  const { rows } = await sql<Story[]>`
    INSERT INTO stories (title, description, genre, slug, status)
    VALUES (${title}, ${description}, ${genre}, ${slug ?? null}, ${status})
    RETURNING *
  `;
  return rows[0];
}

export async function createVoteOption(storyId: string, title: string, description: string) {
  const { rows } = await sql<VoteOption[]>`
    INSERT INTO vote_options (story_id, title, description)
    VALUES (${storyId}, ${title}, ${description})
    RETURNING *
  `;
  return rows[0];
}
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const updates = [
    {
      story_id: 'dragons-last-breath',
      chapter_slug: 'chapter-2-gathering-shadows',
      section_id: 'act-1',
      image_src: '/images/stories/dragons-last-breath/chapter-2/act-1.png'
    },
    {
      story_id: 'dragons-last-breath',
      chapter_slug: 'chapter-2-gathering-shadows',
      section_id: 'act-2',
      image_src: '/images/stories/dragons-last-breath/chapter-2/act-2.png'
    },
    {
      story_id: 'dragons-last-breath',
      chapter_slug: 'chapter-2-gathering-shadows',
      section_id: 'act-3',
      image_src: '/images/stories/dragons-last-breath/chapter-2/act-3.png'
    }
  ];

  for (const update of updates) {
    const { data, error } = await supabase
      .from('content_chapter_sections')
      .update({ image_src: update.image_src })
      .match({ 
        story_id: update.story_id, 
        chapter_slug: update.chapter_slug, 
        section_id: update.section_id 
      });

    if (error) {
      console.error(`Error updating ${update.section_id}:`, error.message);
    } else {
      console.log(`Successfully updated ${update.section_id} with ${update.image_src}`);
    }
  }
}

main().catch(console.error);

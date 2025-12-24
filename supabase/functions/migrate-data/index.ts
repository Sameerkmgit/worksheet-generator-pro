import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Source Supabase (where data exists)
    const sourceUrl = "https://dhhbqbqtnucpyrxvyevx.supabase.co";
    const sourceServiceKey = Deno.env.get('SOURCE_SUPABASE_SERVICE_ROLE_KEY');
    
    if (!sourceServiceKey) {
      throw new Error('SOURCE_SUPABASE_SERVICE_ROLE_KEY not configured');
    }

    // Target Supabase (this Lovable Cloud project)
    const targetUrl = Deno.env.get('SUPABASE_URL');
    const targetServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!targetUrl || !targetServiceKey) {
      throw new Error('Target Supabase credentials not configured');
    }

    const sourceClient = createClient(sourceUrl, sourceServiceKey);
    const targetClient = createClient(targetUrl, targetServiceKey);

    const results = {
      worksheet_categories: { migrated: 0, errors: [] as string[] },
      worksheets: { migrated: 0, errors: [] as string[] },
    };

    // Step 1: Migrate worksheet_categories first (FK dependency)
    console.log('Fetching worksheet_categories from source...');
    const { data: categories, error: catFetchError } = await sourceClient
      .from('worksheet_categories')
      .select('*');

    if (catFetchError) {
      throw new Error(`Failed to fetch categories: ${catFetchError.message}`);
    }

    console.log(`Found ${categories?.length || 0} categories to migrate`);

    if (categories && categories.length > 0) {
      for (const category of categories) {
        // Map source schema to target schema
        // Source has: id, name, grade, subject, description, is_archived, created_at, updated_at
        // Target has: id, title, grade, subject, description, created_at, updated_at
        const mappedCategory = {
          id: category.id,
          title: category.name || category.title, // Map 'name' to 'title'
          grade: category.grade,
          subject: category.subject,
          description: category.description,
          created_at: category.created_at,
          updated_at: category.updated_at,
        };
        
        const { error: catInsertError } = await targetClient
          .from('worksheet_categories')
          .upsert(mappedCategory, { onConflict: 'id' });

        if (catInsertError) {
          results.worksheet_categories.errors.push(`Category ${category.id}: ${catInsertError.message}`);
        } else {
          results.worksheet_categories.migrated++;
        }
      }
    }

    // Step 2: Migrate worksheets
    console.log('Fetching worksheets from source...');
    const { data: worksheets, error: wsFetchError } = await sourceClient
      .from('worksheets')
      .select('*');

    if (wsFetchError) {
      throw new Error(`Failed to fetch worksheets: ${wsFetchError.message}`);
    }

    console.log(`Found ${worksheets?.length || 0} worksheets to migrate`);

    if (worksheets && worksheets.length > 0) {
      for (const worksheet of worksheets) {
        const { error: wsInsertError } = await targetClient
          .from('worksheets')
          .upsert(worksheet, { onConflict: 'id' });

        if (wsInsertError) {
          results.worksheets.errors.push(`Worksheet ${worksheet.id}: ${wsInsertError.message}`);
        } else {
          results.worksheets.migrated++;
        }
      }
    }

    console.log('Migration complete:', results);

    return new Response(JSON.stringify({
      success: true,
      message: 'Migration completed',
      results: {
        worksheet_categories: {
          migrated: results.worksheet_categories.migrated,
          failed: results.worksheet_categories.errors.length,
          errors: results.worksheet_categories.errors
        },
        worksheets: {
          migrated: results.worksheets.migrated,
          failed: results.worksheets.errors.length,
          errors: results.worksheets.errors
        }
      }
    }, null, 2), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Migration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get grade from query params or body
    let grade: string | null = null
    
    const url = new URL(req.url)
    grade = url.searchParams.get('grade')
    
    if (!grade && req.method === 'POST') {
      const body = await req.json()
      grade = body.grade?.toString()
    }

    // Validate grade
    const gradeNum = parseInt(grade || '', 10)
    if (!grade || isNaN(gradeNum) || gradeNum < 1 || gradeNum > 5) {
      return new Response(
        JSON.stringify({ error: 'Invalid grade. Must be 1-5.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log(`Fetching pack for grade ${gradeNum}`)

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch the PDF from storage
    const filePath = `grade-${gradeNum}-pack.pdf`
    const { data, error } = await supabase.storage
      .from('worksheet-packs')
      .download(filePath)

    if (error || !data) {
      console.error('Storage error:', error)
      return new Response(
        JSON.stringify({ error: 'Pack not found', details: error?.message }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log(`Successfully fetched grade ${gradeNum} pack, size: ${data.size} bytes`)

    // Return the PDF with proper headers for download
    return new Response(data, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="grade-${gradeNum}-pack.pdf"`,
        'Content-Length': data.size.toString(),
      },
    })

  } catch (err) {
    console.error('Unexpected error:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

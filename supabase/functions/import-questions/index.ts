// One-off importer: reads extracted sample questions from storage and writes
// them into worksheets.questions. Safe to delete after the import runs.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SOURCE =
  "https://sitalsldfenvtdjdgafg.supabase.co/storage/v1/object/public/worksheet-pdfs/_import/questions.json";

Deno.serve(async () => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const res = await fetch(SOURCE);
    if (!res.ok) {
      return new Response(JSON.stringify({ error: `source ${res.status}` }), { status: 500 });
    }
    const map = (await res.json()) as Record<string, string[]>;

    let updated = 0;
    const errors: string[] = [];
    for (const [id, questions] of Object.entries(map)) {
      const { error } = await supabase.from("worksheets").update({ questions }).eq("id", id);
      if (error) errors.push(`${id}: ${error.message}`);
      else updated++;
    }

    return new Response(JSON.stringify({ updated, failed: errors.length, errors: errors.slice(0, 5) }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});

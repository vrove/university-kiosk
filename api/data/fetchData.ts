import { createClient } from "../supabase/server";

async function fetchLecturers() {
    const supabase = createClient();
    const { data: lecturers} = await supabase.from('lecturers').select()
    return JSON.stringify(lecturers, null, 2);
}

async function fetchBuldings() {
    const supabase = createClient();
    const { data: buildings} = await supabase.from('buildings').select()
    return JSON.stringify(buildings, null, 2);
}

export { fetchLecturers, fetchBuldings };
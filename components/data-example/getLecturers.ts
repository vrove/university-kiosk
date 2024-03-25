import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cedhtinrtjfsqsqyzqsv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZGh0aW5ydGpmc3FzcXl6cXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzNTQyODgsImV4cCI6MjAyNjkzMDI4OH0.2JcfYI7WUpp1A6mGpUndpIf8tJoqLGZPGek_zAijNok'
const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchData() {
    const { data, error } = await supabase
        .from('lecturers')
        .select('*')
    
    if (error) {
        console.error('Error fetching data:', error)
        return
    }

    // data is already in JSON format
    console.log(data)
}

fetchData()
import { createClient } from "@supabase/supabase-js";


export const supabase= createClient(
    "https://rfkcktbuuzkfuahylseb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJma2NrdGJ1dXprZnVhaHlsc2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5MTU2NDcsImV4cCI6MjAyNjQ5MTY0N30.TOcA2QUrbwaG6jZkL6fOojA49Km2zhScGQl9iLgfENQ"
    )
import { apiRequest } from "@/lib/api/client";
import { Note } from "@/types/note";

export function getNotes() {
  return apiRequest<Note[]>("/api/notes");
}

export function saveNotes(notes: Note[]) {
  return apiRequest<Note[]>("/api/notes", {
    method: "PUT",
    body: { notes },
  });
}

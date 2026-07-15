"use client";

import NoteEditor from "@/components/notes/NoteEditor";
import NoteCard from "@/components/notes/NoteCard";
import useUserLocalStorage from "@/hooks/useUserLocalStorage";
import { Note } from "@/types/note";

export default function NotesPage() {
  const [notes, setNotes] = useUserLocalStorage<Note[]>(
    "notes", []
  );

  function addNote(note: Note) {
    setNotes((previousNotes) => [
      ...previousNotes,
      note,
    ]);
  }

  function deleteNote(id: number) {
    setNotes((previousNotes) =>
      previousNotes.filter(
        (note) => note.id !== id
      )
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Study Notes
        </h1>
        <p className="mt-2 text-slate-500">
          Save important notes for quick revision.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div>
          <NoteEditor onAddNote={addNote}/>
        </div>
        <div className="space-y-6 lg:col-span-2">
          {notes.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow">
              <h2 className="text-xl font-semibold">
                No Notes Yet
              </h2>
              <p className="mt-2 text-slate-500">
                Create your first study note.
              </p>
            </div>
          ) : (
            notes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={deleteNote}/>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

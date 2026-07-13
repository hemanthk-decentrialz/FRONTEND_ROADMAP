"use client";

import { useState } from "react";
import NoteEditor from "@/components/notes/NoteEditor";
import NoteCard from "@/components/notes/NoteCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Note } from "@/types/note";

export default function NotesPage() {
  const [notes, setNotes] = useLocalStorage<Note[]>(
    "notes", []
  );
  const [search, setSearch] = useState("");

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

  const filteredNotes = notes.filter((note) => {
    const keyword = search.toLowerCase();

    return (
      note.title.toLowerCase().includes(keyword) || note.subject.toLowerCase().includes(keyword) || note.content.toLowerCase().includes(keyword)
    );
  });

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
      <div className="mb-8">
        <input type="text" placeholder="Search notes..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border p-4 outline-none focus:border-blue-500"/>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div>
          <NoteEditor onAddNote={addNote}/>
        </div>
        <div className="space-y-6 lg:col-span-2">
          {filteredNotes.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow">
              <h2 className="text-xl font-semibold">
                No Notes Found
              </h2>
              <p className="mt-2 text-slate-500">
                Create your first study note.
              </p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={deleteNote}/>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
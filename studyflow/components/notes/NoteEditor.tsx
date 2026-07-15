"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Note } from "@/types/note";
import { subjects } from "@/data/subjects";

interface NoteEditorProps {
  onAddNote: (note: Note) => void;
}

export default function NoteEditor({
  onAddNote,
}: NoteEditorProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    onAddNote({
      id: Date.now(),
      title,
      subject,
      content,
    });

    setTitle("");
    setSubject("");
    setContent("");
  }

  return (
    <Card>
      <h2
        className="mb-6 text-2xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        Create Note
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          className="input-theme w-full rounded-lg p-3"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <select
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
          className="input-theme w-full rounded-lg p-3"
        >
          <option value="">
            Select Subject
          </option>

          {subjects.map((subject) => (
            <option
              key={subject}
              value={subject}
            >
              {subject}
            </option>
          ))}
        </select>

        <textarea
          rows={5}
          placeholder="Write your note..."
          className="input-theme w-full rounded-lg p-3"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <Button>
          Create Note
        </Button>
      </form>
    </Card>
  );
}
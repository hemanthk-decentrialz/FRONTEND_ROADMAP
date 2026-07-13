import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Note } from "@/types/note";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

export default function NoteCard({
  note,
  onDelete,
}: NoteCardProps) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1">
      <h2
        className="text-xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        {note.title}
      </h2>

      <p className="text-muted mt-1 text-sm">
        {note.subject}
      </p>

      <p
        className="my-4 whitespace-pre-line leading-relaxed"
        style={{ color: "var(--foreground)" }}
      >
        {note.content}
      </p>

      <Button
        variant="danger"
        onClick={() => onDelete(note.id)}
      >
        <FontAwesomeIcon
          icon={faTrash}
          className="mr-2"
        />
        Delete
      </Button>
    </Card>
  );
}
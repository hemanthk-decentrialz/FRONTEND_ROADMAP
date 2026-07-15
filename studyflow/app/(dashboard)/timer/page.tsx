import StudyTimer from "@/components/timer/StudyTimer";

export default function TimerPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Study Timer
        </h1>
        <p className="mt-2 text-slate-500">
          Stay focused using the Pomodoro Technique.
        </p>
      </div>
      <StudyTimer />
    </div>
  );
}
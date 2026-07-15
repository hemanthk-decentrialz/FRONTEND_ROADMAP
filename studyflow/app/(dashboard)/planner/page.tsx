"use client";

import PlannerCard from "@/components/planner/PlannerCard";
import PlannerForm from "@/components/planner/PlannerForm";
import { StudySession } from "@/types/planner";
import useUserLocalStorage from "@/hooks/useUserLocalStorage";

export default function PlannerPage(){

  const [sessions, setSessions] = useUserLocalStorage<StudySession[]>("planner",[]);

  function addSession(session:StudySession){
    setSessions((prev)=> [...prev,session]
  );
}

  function deleteSession(id: number) {
    setSessions((previousSessions) =>
      previousSessions.filter(
        (session) => session.id !== id
      )
    );
  }

  function toggleSession(id: number) {
    setSessions((previousSessions) =>
      previousSessions.map((session) =>
        session.id === id
          ? {
              ...session,
              completed: !session.completed,
            }
          : session
      )
    );
  }

  return(
    <div>
      <h1 className="mb-8 text-4xl font-bold">
        Daily Planner
      </h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <PlannerForm onAddSession={addSession}/>

        <div className="space-y-5 lg:col-span-2">
          { sessions.length===0 ? ( 
          <div className="dashboard-card p-8 text-center">
            No study sessions yet.
          </div>
          ) : (
          sessions.map((session)=>(
            <PlannerCard key={session.id} session={session} onDelete={deleteSession} onToggle={toggleSession}/>
          ))
          )}
        </div>
      </div>
    </div>
  );
}

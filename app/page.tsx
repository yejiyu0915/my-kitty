import TaskList from '@/app/_components/tasks/TaskList';
import Chat from '@/app/_components/chat/Chat';
import Report from '@/app/_components/report/Report';

export default function Home() {
  return (
    <>
      <div className="grid h-full w-full grid-cols-[1fr_350px] items-start justify-between gap-4">
        <Chat />
        <Report />
      </div>
      <TaskList />
    </>
  );
}

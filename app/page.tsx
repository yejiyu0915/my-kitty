import TaskList from '@/app/_components/tasks/TaskList';
import ChatAI from '@/app/_components/chatAI/ChatAI';
import Report from '@/app/_components/report/Report';

export default function Home() {
  return (
    <>
      <div className="grid h-full w-full grid-cols-[3fr_1.2fr] items-start justify-between gap-4">
        {/* <Chat /> */}
        <ChatAI />
        <Report />
      </div>
      <TaskList />
    </>
  );
}

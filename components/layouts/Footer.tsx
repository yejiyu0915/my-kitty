export default function Footer() {
  return (
    <footer className="flex w-full max-w-6xl flex-wrap items-center justify-center gap-[24px]">
      <p className="text-xs text-gray-500 md:text-sm dark:text-gray-400">
        © Yeji Yu. {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}

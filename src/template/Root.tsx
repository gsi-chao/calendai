import Aside from "./Aside";

export function Root({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Aside />
      <div className="flex flex-col sm:gap-4 sm:py-6 sm:pl-20 h-screen px-6">
        <main className="flex flex-1 items-start gap-4 p-4 sm:p-6  md:gap-8 w-full bg-muted dark:bg-gray-800 rounded-md">
          {children}
        </main>
      </div>
    </div>
  );
}

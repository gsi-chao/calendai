import { CalendarCheck, Home, Share2 } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import AsideUser from "./AsideUser";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Aside = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <CalendarCheck className="h-4 w-4" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <div className="h-1 w-full border-b border-gray-200" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Project List</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Project List</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/connections"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Connectionst</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Connectionst</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <ThemeSwitcher />
        <AsideUser />
      </nav>
    </aside>
  );
};

export default Aside;

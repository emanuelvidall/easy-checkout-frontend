import { TopMenu } from "./app-topmenu";
import { ModeToggle } from "./mode-toggle";

export const TopBar = () => {
  return (
    <div className="w-full h-16 flex flex-row items-center justify-between px-6 gap-10">
      <TopMenu />
      <ModeToggle />
    </div>
  );
};

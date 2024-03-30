import { HamburgerMenuIcon, BellIcon } from "@radix-ui/react-icons";
import AvatarComponent from "./Avatar";
import Language from "./Language";
import Drawer from "../Drawer";
import useSidebarStore from "@/store/sidebar";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore((state) => state);
  return (
    <header className="flex justify-between py-2 px-8 shadow-sm bg-white">
      <div className="block md:hidden">
        <Drawer />
      </div>

      <div>
        <Button
          size={"icon"}
          className="hidden  md:block p-2.5"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <HamburgerMenuIcon />
        </Button>
      </div>
      <div className="flex gap-x-2 items-center">
        <Language />
        <Button size={"icon"} variant={"ghost"}>
          <BellIcon />
        </Button>
        <AvatarComponent />
      </div>
    </header>
  );
};

export default Header;

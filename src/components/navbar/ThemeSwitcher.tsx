"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { TThemes } from "@/utils/types";

export function ThemeSwitcher({ fullWidth = false }: { fullWidth?: boolean }) {
  const { setTheme } = useTheme();
  const [toggle, setToggle] = useState<TThemes>("system");
  useEffect(() => {
    setTheme("system");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("p-2", fullWidth && "w-full")}
      onClick={() => {
        if (toggle === "system") {
          setToggle("light");
          setTheme("light");
        } else if (toggle === "light") {
          setToggle("dark");
          setTheme("dark");
        } else {
          setToggle("system");
          setTheme("system");
        }
      }}
    >
      {toggle === "system" ? (
        <Monitor className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      ) : (
        <>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

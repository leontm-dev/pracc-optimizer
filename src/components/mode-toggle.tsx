// Components

import { Button } from "@/components/ui/button"

// Project-Imports

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

// Code

export function ModeToggle() {
    const { setTheme, theme } = useTheme();
    return (
        <Button variant={"outline"} className={cn("fill-foreground")} onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark")
        }}>
            {theme === "dark" ? <Moon className={cn("fill-foreground")} /> : <Sun className={cn("text-foreground")} />}
        </Button>
    )
}
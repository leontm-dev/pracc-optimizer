// Components

import { Button } from "@/components/ui/button"

// Project-Imports

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

// Code

export function ModeToggle() {
    const { setTheme, theme } = useTheme();
    return (
        <Button variant={"outline"} className={cn("text-foreground")} onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark")
        }}>
            Switch theme
        </Button>
    )
}
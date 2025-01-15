// Imports

import { CircleUser } from "lucide-react";

// Components

import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Code

export function Navbar() {
    return <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between p-2">
            <h1 className={cn("text-foreground text-xl")}>Enhance your pracc experience</h1>
            <div className="flex flex-row gap-2">
                <ModeToggle />
                <Avatar>
                    <AvatarFallback><CircleUser /></AvatarFallback>
                    <AvatarImage src=""></AvatarImage>
                </Avatar>
            </div>
        </div>
        <Separator orientation="horizontal" />
    </div>
}
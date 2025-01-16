// Imports

import { CircleUser, Heart } from "lucide-react";

// Components

import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

// Code

type Props = {
    userIcon?: string;
}
export function Navbar(props: Props) {
    return <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between p-2">
            <h1 className={cn("text-foreground text-xl")}>Enhance your pracc experience</h1>
            <div className="flex flex-row gap-2">
                <Button variant={"outline"} onClick={() => {
                    window.open("https://buymeacoffee.com/leontm")
                }}>
                    <Heart className="fill-pink-500" />
                </Button>
                <ModeToggle />
                <Avatar>
                    <AvatarFallback><CircleUser /></AvatarFallback>
                    <AvatarImage src={props.userIcon}></AvatarImage>
                </Avatar>
            </div>
        </div>
        <Separator orientation="horizontal" />
    </div>
}
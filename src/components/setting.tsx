// Imports

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

// Components

import { AccordionContent, AccordionTrigger, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// Project-Imports

import { cn } from "@/lib/utils";

// Code

type Props = {
    title: string;
    value: string;
    description: string;
    permissions: string[];
    updatePermissions: (permissions: string[]) => void;
}
export function Setting(props: Props) {
    const [isOn, setIsOn] = useState(false);
    useEffect(() => {
        if (props.permissions.includes(props.value)) {
            setIsOn(true);
        } else {
            setIsOn(false);
        }
    }, [props.permissions, props.value]);
    return (
        <AccordionItem value={props.value}>
            <AccordionTrigger className={"text-xl text-wrap text-foreground"}>{props.title}</AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-row items-center justify-between gap-1">
                    <p className={cn("text-wrap text-foreground")}>{props.description}</p>
                    <Button variant={isOn ? "destructive" : "secondary"} onClick={() => {
                        if (props.permissions.includes(props.value)) {
                            props.updatePermissions(props.permissions.filter(permission => permission !== props.value));
                            setIsOn(false);
                        } else {
                            props.updatePermissions([...props.permissions, props.value]);
                            setIsOn(true);
                        }
                    }}>{isOn ? <Pause /> : <Play />}</Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
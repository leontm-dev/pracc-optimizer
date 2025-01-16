// Imports

import { useEffect, useState } from "react";
import { LucideProps } from "lucide-react";

// Components

import { Switch } from "./ui/switch";

// Project-Imports

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Code

type Props = {
    title: string;
    value: string;
    description: string;
    permissions: string[];
    updatePermissions: (permissions: string[]) => void;
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
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
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex flex-row items-center gap-2">
                    <props.Icon className={cn("text-primary")} />
                    {props.title}
                </CardTitle>
                <Switch checked={isOn} onCheckedChange={() => {
                    setIsOn(!isOn);
                    if (isOn) {
                        props.updatePermissions(props.permissions.filter((permission) => permission !== props.value));
                    } else {
                        props.updatePermissions([...props.permissions, props.value]);
                    }
                }} />
            </CardHeader>
            <CardContent>
                {props.description}
            </CardContent>
        </Card>
    )
}
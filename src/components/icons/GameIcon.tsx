// Imports

import { HTMLAttributes } from "react";

// Code

type Props = {
    className?: HTMLAttributes<HTMLImageElement>["className"];
    src: string;
    alt: string;
};
export function GameIcon(props: Props) {
    return <img className={props.className} src={props.src} alt={props.alt} />;
}
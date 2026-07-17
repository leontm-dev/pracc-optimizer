import { Pin, Trash } from "lucide-react";
import { TeamComment } from "./detailed-view";
import "./styles.css";
import { Button } from "@/components/ui/button";

type Props = {
  comment: TeamComment;
  togglePinnedState: (id: string) => void;
  removeComment: (id: string) => void;
};

export function TeamCommentComponent(props: Props) {
  return (
    <div className="group flex flex-row items-center justify-center gap-2 p-2 shadow-sm">
      {props.comment.pinned && (
        <Button
          variant={"ghost"}
          size={"icon-sm"}
          onClick={() => props.togglePinnedState(props.comment.createdAt)}
        >
          <Pin className="fill-primary" />
        </Button>
      )}
      {!props.comment.pinned && (
        <Button
          variant={"ghost"}
          size={"icon-sm"}
          className="hidden group-hover:flex"
          onClick={() => props.togglePinnedState(props.comment.createdAt)}
        >
          <Pin />
        </Button>
      )}
      <p className="text-sm">{props.comment.content}</p>
      <Button
        variant={"ghost"}
        className="hidden group-hover:flex"
        size={"icon-sm"}
        onClick={() => props.removeComment(props.comment.createdAt)}
      >
        <Trash className="text-destructive" />
      </Button>
    </div>
  );
}

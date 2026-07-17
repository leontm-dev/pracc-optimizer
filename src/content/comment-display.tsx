import React from "react";
import { TeamComment } from "./detailed-view";
import { Spinner } from "@/components/ui/spinner";
import "./styles.css";
import { Badge } from "@/components/ui/badge";

type Props = {
  teamId: number;
};
export function CommentDisplaySearchPage(props: Props) {
  const [comments, setComments] = React.useState<TeamComment[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);
    async function load() {
      const localStorage = (
        await browser.storage.local.get(
          `pracc-optimizer-comments-${props.teamId}`,
        )
      )[`pracc-optimizer-comments-${props.teamId}`];
      if (!Array.isArray(localStorage)) {
        setLoading(false);
        return setComments([]);
      }

      setComments(localStorage as TeamComment[]);
      setLoading(false);
      return;
    }

    load();
  }, []);

  React.useEffect(() => {
    const isContextValid = () => {
      return typeof browser !== "undefined" && !!browser.runtime?.id;
    };
    async function loadData() {
      if (!isContextValid()) {
        console.warn("Context got wiped");
        clearInterval(intervalId);
        return;
      }

      try {
        const storageKey = `pracc-optimizer-comments-${props.teamId}`;
        const result = await browser.storage.local.get(storageKey);
        const localStorage = result[storageKey];

        if (Array.isArray(localStorage)) {
          setComments(localStorage as TeamComment[]);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadData();

    const intervalId = setInterval(() => {
      loadData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div>
      <div className="flex flex-row items-center gap-1">
        {loading && (
          <Badge variant={"ghost"}>
            <Spinner className="size-4" />
            <p className="text-muted-foreground text-xs">Loading comments...</p>
          </Badge>
        )}
        {!loading && comments.length === 0 && (
          <p className="text-muted-foreground text-xs">No comments found</p>
        )}
        {comments.sort((a, b) => {
          if (b.pinned !== a.pinned) {
            return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
          }

          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })[0] && (
          <Badge variant={"secondary"}>
            {
              comments.sort((a, b) => {
                if (b.pinned !== a.pinned) {
                  return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
                }
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              })[0].content
            }
          </Badge>
        )}
        {comments.length > 1 && <Badge>+{comments.length - 1}</Badge>}
      </div>
    </div>
  );
}

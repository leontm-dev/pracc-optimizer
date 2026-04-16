import { CircleQuestionMark } from "lucide-react";
import { TeamLinks } from "./detailed-view";

type Props = {
  link: TeamLinks;
};

export function DescriptionLinkComponent({ link }: Props) {
  return (
    <a
      href={link.content}
      title={link.content}
      target="_blank"
      className="flex flex-row items-center gap-2 border border-dashed p-2"
    >
      {link.title === "x.com" && (
        <img
          className="size-8"
          src={
            "https://cdn.brandfetch.io/idS5WhqBbM/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1692089092800"
          }
        />
      )}
      {link.title === "gamersclub.gg" && (
        <img
          className="size-8"
          src={
            "https://cdn.brandfetch.io/idsx3aTIY3/w/200/h/200/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1677163740497"
          }
        />
      )}
      {link.title === "vlr.gg" && (
        <img
          className="size-8"
          src={
            "https://cdn.brandfetch.io/idAcuOJla_/w/800/h/800/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1774455826712"
          }
        />
      )}
      {link.title === "tracker.gg" && (
        <img
          className="size-8"
          src={
            "https://cdn.brandfetch.io/id1IgSpVrO/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1773155737896"
          }
        />
      )}
      {link.title === "liquipedia.net" && (
        <img
          className="h-8"
          src={
            "https://cdn.brandfetch.io/idM7e_ApHq/w/686/h/145/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1772646064799"
          }
        />
      )}
      {link.title === "unknown" && <CircleQuestionMark className="size-8" />}
      <div className="flex flex-col gap-0">
        <h1 className="text-sm">{link.display}</h1>
        <p className="text-muted-foreground text-xs">Context: {link.type}</p>
      </div>
    </a>
  );
}

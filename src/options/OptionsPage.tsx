import "./styles.css";
import React from "react";
import { SettingsComponent } from "./settings";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, Info, Star } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function OptionsPage() {
  const [region, setRegion] = React.useState<string | null>(null);
  const [platform, setPlatform] = React.useState<string | null>(null);
  const [key, setKey] = React.useState<string | null>(null);
  React.useEffect(() => {
    browser.storage.local.get("pracc-optimizer-platform").then((response) => {
      const platformResponse = response["pracc-optimizer-platform"];
      if (!platformResponse || typeof platformResponse !== "string")
        return setPlatform(null);

      return setPlatform(platformResponse);
    });
    browser.storage.local.get("pracc-optimizer-region").then((response) => {
      const regionResponse = response["pracc-optimizer-region"];
      if (!regionResponse || typeof regionResponse !== "string")
        return setRegion(null);

      return setRegion(regionResponse);
    });
    browser.storage.local.get("pracc-optimizer-key").then((response) => {
      const regionResponse = response["pracc-optimizer-key"];
      if (!regionResponse || typeof regionResponse !== "string")
        return setRegion(null);

      return setRegion(regionResponse);
    });
  }, []);
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex flex-col gap-0">
        <h1 className="decoration-primary text-2xl underline">
          pracc-optimizer Settings
        </h1>
        <p>brought to you by leontm-dev</p>
      </div>
      <SettingsComponent
        type="select"
        items={[
          { label: "Brasil (BR)", value: "br" },
          { label: "Europe (EMEA)", value: "eu" },
          { label: "Latein America (LATAM)", value: "latam" },
          { label: "Asia & Pacific (APAC)", value: "ap" },
          { label: "Korea (KR)", value: "kr" },
        ]}
        title="Region you play scrims in"
        description="Select the region you play scrims in to load the real ranks of your enemies. Also some other data on your enemies loaded in. The data you select will be sent to the Hendrik3 unofficial-valorant-api but not to any other source. It is stored inside of your extension localStorage so you can always remove it. Features using this setting also use the platform setting."
        updateFunction={(value) => {
          browser.storage.local.set({ "pracc-optimizer-region": value });
          setRegion(value);
        }}
        defaultValue={region || undefined}
      />
      <SettingsComponent
        type="select"
        items={[
          { label: "PC", value: "pc" },
          { label: "Console", value: "console" },
        ]}
        title="Platform you play scrims on"
        description="Select the platform you are playing your scrims on so that we can use your input to get in-game data like ranks, peaks and more about your enemies. The data is stored in the extension localStorage, not leaving this device other than being anonymously send to unofficial-valorant-api. Features using this setting also need the region setting."
        updateFunction={(value) => {
          browser.storage.local.set({ "pracc-optimizer-platform": value });
          setPlatform(value);
        }}
        defaultValue={platform || undefined}
      />
      <Alert>
        <Info />
        <AlertTitle>Usage of Hendrik3's unofficial-valorant-api</AlertTitle>
        <AlertDescription>
          Create an api key at{" "}
          <a href="https://api.henrikdev.xyz/dashboard/">
            Hendrik3's dashboard
          </a>{" "}
          to use his api. Keys that are passed to this extension will not be
          used for anything else than this extension and they will not get sent
          to any other person of interest. If you want to check the usage of
          your keys, the dashboard (link) provides a great visual representation
          of the usage data. Guidelines & rate-limits for the
          <a href="https://github.com/Henrik-3/unofficial-valorant-api?tab=readme-ov-file">
            unofficial-valorant-api (github)
          </a>{" "}
          apply. You are responsible to not overuse resources.
        </AlertDescription>
      </Alert>
      <SettingsComponent
        type="secret-input"
        title="Key for API-usage"
        description="If you want to get data about ranks and peaks of your enemies get a API from Hendrik."
        updateFunction={(value) => {
          browser.storage.local.set({ "pracc-optimizer-key": value });
          setKey(value);
        }}
        defaultValue={key || undefined}
      />
      <div className="mt-8 flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          This is a package built for practical non-commercial purposes. It uses
          free-to-use software and products that are capped by rate-limits. So
          please not use these for bad purposes.
        </p>
        <p>
          I am solo maintaining this project and am open for new ideas all the
          time. Just open an issue or a discussion on GitHub so that we can chat
          about it. Feedback is also appreciated. (Leave a star ;D)
        </p>
        <div className="flex flex-row flex-wrap items-center gap-2">
          <a
            href="https://github.com/leontm-dev/pracc-optimizer"
            target="_blank"
          >
            <Button variant={"outline"}>
              <Star /> on GitHub
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

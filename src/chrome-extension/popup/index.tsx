// Imports

import "../global.css";
import { useState, useEffect, useRef } from "react";
import { Globe } from "lucide-react";

// Components

import { Navbar } from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Setting } from "@/components/setting";
import { HashLoader } from "react-spinners";
import { GameIcon } from "@/components/icons/GameIcon";

// Project-Imports

import { cn } from "@/lib/utils";
import { settings } from "@/settings";
import { Button } from "@/components/ui/button";


// Code

export const Popup = () => {
  const [loading, isLoading] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const image = useRef<string>();
  useEffect(() => {
    chrome.storage.sync.get(["permissions"], (result) => {
      setPermissions(result.permissions || []);
      console.log(result.permissions);
      chrome.storage.sync.get("userIcon", (result) => {
        image.current = result.userIcon;
        isLoading(false);
      })
    });
    /* isLoading(false); */
  }, []);
  const updatePermissions = async (permissions: string[]) => {
    setPermissions(permissions);
    chrome.storage.sync.set({ permissions });
  }
  return (
    <div className={cn("bg-background flex flex-col items-center overflow-hidden")}>
      {loading
        ? <HashLoader color={"red"} />
        : (
          <div className="relative flex flex-wrap overflow-hidden">
            <Navbar userIcon={image.current} />
            <Tabs className="p-2 w-full" defaultValue="global">
              <TabsList className="w-full">
                <TabsTrigger className="w-max" value="global">
                  <Globe className={cn("text-foreground w-6 h-6")} />
                </TabsTrigger>
                <TabsTrigger className="w-max" value="cs2">
                  <GameIcon src="https://fe-app.pracc.com/5e629a49ab1e0b4568563403f8f7acc0556a0322/static/media/cs2.27566af7651ab9cc4a7e.png" alt="cs2" className="rounded w-6 h-6" />
                </TabsTrigger>
                <TabsTrigger className="w-max" value="lol">
                  <GameIcon src="https://lp-assets.pracc.com/home/2b99d4a3a65cee1a19a2d455f500b55c6e218665/images/logo-lol.svg" alt="leagueOfLegends" className="rounded w-6 h-6" />
                </TabsTrigger>
                <TabsTrigger className="w-max" value="dota">
                  <GameIcon src="https://lp-assets.pracc.com/home/2b99d4a3a65cee1a19a2d455f500b55c6e218665/images/logo-dota.svg" alt="dota" className="rounded w-6 h-6" />
                </TabsTrigger>
                <TabsTrigger className="w-max" value="r6">
                  <GameIcon src="https://lp-assets.pracc.com/home/2b99d4a3a65cee1a19a2d455f500b55c6e218665/images/logo-rainbow-six.svg" alt="r6" className="rounded w-6 h-6" />
                </TabsTrigger>
                <TabsTrigger className="w-max" value="valorant">
                  <GameIcon src="https://lp-assets.pracc.com/home/2b99d4a3a65cee1a19a2d455f500b55c6e218665/images/logo-valorant.svg" alt="leagueOfLegends" className="rounded w-6 h-6" />
                </TabsTrigger>
                <TabsTrigger className="w-max" value="wild-rift">
                  <GameIcon src="https://upload.wikimedia.org/wikipedia/commons/4/42/League_of_Legends_Wild_Rift_logo.png" alt="wild-rift" className="rounded w-6 h-6" />
                </TabsTrigger>
                <TabsTrigger className="w-max" value="halo">
                  <GameIcon src="https://fe-app.pracc.com/5e629a49ab1e0b4568563403f8f7acc0556a0322/static/media/ludwig-gaias-halo-infinite-v2-par-playbox.2fd8367e86ee0d3c2c9f.jpg" alt="halo" className="rounded w-6 h-6" />
                </TabsTrigger>
                <TabsTrigger className="w-max" value="rocket-league">
                  <GameIcon src="https://lp-assets.pracc.com/home/2b99d4a3a65cee1a19a2d455f500b55c6e218665/images/logo-rocket-league.svg" alt="rocket league" className="rounded w-6 h-6" />
                </TabsTrigger>
                <TabsTrigger className="w-max" value="deadlock">
                  <GameIcon src="https://fe-app.pracc.com/5e629a49ab1e0b4568563403f8f7acc0556a0322/static/media/deadlock.57db9528a4053d0632c8.png" alt="deadlock" className="rounded w-6 h-6" />
                </TabsTrigger>
                <TabsTrigger className="w-max" value="spectre-divide">
                  <GameIcon src="https://fe-app.pracc.com/5e629a49ab1e0b4568563403f8f7acc0556a0322/static/media/spectre.396c7e1ef0b5b0569d32.png" alt="spectre-divide" className="rounded w-6 h-6" />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="valorant" className="flex flex-col items-center justify-center gap-1">
                <h2 className={cn("text-foreground text-lg")}>Configure the Valorant optimizations</h2>
                <div className="flex flex-col gap-2 w-full items-center overflow-y-scroll relative h-[21.5rem] no-scrollbar">
                  {settings.valorant.map((setting) => {
                    return (
                      <Setting title={setting.name} Icon={setting.icon} value={setting.value} description={setting.description} permissions={permissions} updatePermissions={updatePermissions} />
                    )
                  })}
                </div>
              </TabsContent>
              <TabsContent value="global" className="flex flex-col items-center justify-center gap-1">
                <h2 className={cn("text-foreground text-lg")}>Configure the Global optimizations</h2>
                <div className="flex flex-col gap-2 w-full items-center overflow-y-scroll relative h-[21.5rem] no-scrollbar">
                  {settings.global.map((setting) => {
                    return (
                      <Setting title={setting.name} Icon={setting.icon} value={setting.value} description={setting.description} permissions={permissions} updatePermissions={updatePermissions} />
                    )
                  })}
                  <Button className={cn("text-foreground")} onClick={() => window.open("https://github.com/leontm-dev/pracc-optimizer/issues")} variant={"outline"}>Missing something? Send us your ideas</Button>
                </div>
              </TabsContent>
              <TabsContent value="spectre-divide" className="flex flex-col items-center justify-center gap-1">
                <h2 className={cn("text-foreground text-lg")}>Configure the Spectre Divide optimizations</h2>
                <div className="flex flex-col gap-2 w-full items-center overflow-y-scroll relative h-[21.5rem] no-scrollbar">
                  {settings["spectre-divide"].map((setting) => {
                    return (
                      <Setting title={setting.name} Icon={setting.icon} value={setting.value} description={setting.description} permissions={permissions} updatePermissions={updatePermissions} />
                    )
                  })}
                  <Button className={cn("text-foreground")} onClick={() => window.open("https://github.com/leontm-dev/pracc-optimizer/issues")} variant={"outline"}>Missing something? Send us your ideas</Button>
                </div>
              </TabsContent>
              <TabsContent value="lol" className="flex flex-col items-center justify-center gap-1">
                <h2 className={cn("text-foreground text-lg")}>Configure the League Of Legends optimizations</h2>
                <div className="flex flex-col gap-2 w-full items-center overflow-y-scroll relative h-[21.5rem] no-scrollbar">
                  {settings.lol.map((setting) => {
                    return (
                      <Setting title={setting.name} Icon={setting.icon} value={setting.value} description={setting.description} permissions={permissions} updatePermissions={updatePermissions} />
                    )
                  })}
                  <Button className={cn("text-foreground")} onClick={() => window.open("https://github.com/leontm-dev/pracc-optimizer/issues")} variant={"outline"}>Missing something? Send us your ideas</Button>
                </div>
              </TabsContent>
              <TabsContent value="cs2" className="flex flex-col items-center justify-center gap-1">
                <h2 className={cn("text-foreground text-lg")}>Configure the Counter Strike 2 optimizations</h2>
                <div className="flex flex-col gap-2 w-full items-center overflow-y-scroll relative h-[21.5rem] no-scrollbar">
                  {settings.cs2.map((setting) => {
                    return (
                      <Setting title={setting.name} Icon={setting.icon} value={setting.value} description={setting.description} permissions={permissions} updatePermissions={updatePermissions} />
                    )
                  })}
                  <Button className={cn("text-foreground")} onClick={() => window.open("https://github.com/leontm-dev/pracc-optimizer/issues")} variant={"outline"}>Missing something? Send us your ideas</Button>
                </div>
              </TabsContent>
              <TabsContent value="rocket-league" className="flex flex-col items-center justify-center gap-1">
                <h2 className={cn("text-foreground text-lg")}>Configure the Rocket League optimizations</h2>
                <div className="flex flex-col gap-2 w-full items-center overflow-y-scroll relative h-[21.5rem] no-scrollbar">
                  {settings["rocket-league"].map((setting) => {
                    return (
                      <Setting title={setting.name} Icon={setting.icon} value={setting.value} description={setting.description} permissions={permissions} updatePermissions={updatePermissions} />
                    )
                  })}
                  <Button className={cn("text-foreground")} onClick={() => window.open("https://github.com/leontm-dev/pracc-optimizer/issues")} variant={"outline"}>Missing something? Send us your ideas</Button>
                </div>
              </TabsContent>
              <TabsContent value="r6" className="flex flex-col items-center justify-center gap-1">
                <h2 className={cn("text-foreground text-lg")}>Configure the Rainbow Six Siege optimizations</h2>
                <div className="flex flex-col gap-2 w-full items-center overflow-y-scroll relative h-[21.5rem] no-scrollbar">
                  {settings.r6.map((setting) => {
                    return (
                      <Setting title={setting.name} Icon={setting.icon} value={setting.value} description={setting.description} permissions={permissions} updatePermissions={updatePermissions} />
                    )
                  })}
                  <Button className={cn("text-foreground")} onClick={() => window.open("https://github.com/leontm-dev/pracc-optimizer/issues")} variant={"outline"}>Missing something? Send us your ideas</Button>
                </div>
              </TabsContent>
              <TabsContent value="deadlock" className="flex flex-col items-center justify-center gap-1">
                <h2 className={cn("text-foreground text-lg")}>Configure the deadlock optimizations</h2>
                <div className="flex flex-col gap-2 w-full items-center overflow-y-scroll relative h-[21.5rem] no-scrollbar">
                  {settings.deadlock.map((setting) => {
                    return (
                      <Setting title={setting.name} Icon={setting.icon} value={setting.value} description={setting.description} permissions={permissions} updatePermissions={updatePermissions} />
                    )
                  })}
                  <Button className={cn("text-foreground")} onClick={() => window.open("https://github.com/leontm-dev/pracc-optimizer/issues")} variant={"outline"}>Missing something? Send us your ideas</Button>
                </div>
              </TabsContent>
              <TabsContent value="wild-rift" className="flex flex-col items-center justify-center gap-1">
                <h2 className={cn("text-foreground text-lg")}>Configure the Wild Rift optimizations</h2>
                <div className="flex flex-col gap-2 w-full items-center overflow-y-scroll relative h-[21.5rem] no-scrollbar">
                  {settings["wild-rift"].map((setting) => {
                    return (
                      <Setting title={setting.name} Icon={setting.icon} value={setting.value} description={setting.description} permissions={permissions} updatePermissions={updatePermissions} />
                    )
                  })}
                  <Button className={cn("text-foreground")} onClick={() => window.open("https://github.com/leontm-dev/pracc-optimizer/issues")} variant={"outline"}>Missing something? Send us your ideas</Button>
                </div>
              </TabsContent>
              <TabsContent value="halo" className="flex flex-col items-center justify-center gap-1">
                <h2 className={cn("text-foreground text-lg")}>Configure the Halo Infinite optimizations</h2>
                <div className="flex flex-col gap-2 w-full items-center overflow-y-scroll relative h-[21.5rem] no-scrollbar">
                  {settings.halo.map((setting) => {
                    return (
                      <Setting title={setting.name} Icon={setting.icon} value={setting.value} description={setting.description} permissions={permissions} updatePermissions={updatePermissions} />
                    )
                  })}
                  <Button className={cn("text-foreground")} onClick={() => window.open("https://github.com/leontm-dev/pracc-optimizer/issues")} variant={"outline"}>Missing something? Send us your ideas</Button>
                </div>
              </TabsContent>
              <TabsContent value="dota" className="flex flex-col items-center justify-center gap-1">
                <h2 className={cn("text-foreground text-lg")}>Configure the Dota optimizations</h2>
                <div className="flex flex-col gap-2 w-full items-center overflow-y-scroll relative h-[21.5rem] no-scrollbar">
                  {settings.dota.map((setting) => {
                    return (
                      <Setting title={setting.name} Icon={setting.icon} value={setting.value} description={setting.description} permissions={permissions} updatePermissions={updatePermissions} />
                    )
                  })}
                  <Button className={cn("text-foreground")} onClick={() => window.open("https://github.com/leontm-dev/pracc-optimizer/issues")} variant={"outline"}>Missing something? Send us your ideas</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
    </div>
  );
};

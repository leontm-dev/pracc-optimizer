// Imports

import "../global.css";
import { useState, useEffect, useRef } from "react";

// Components

import { Navbar } from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Setting } from "@/components/setting";
import { Accordion } from "@/components/ui/accordion";
import Loader from 'react-loaders'

// Code

const settings: {
  name: string;
  description: string;
  value: string;
}[] = [
    {
      name: "Tracker Buttons",
      description: "Add buttons next to player names to quickly get to their VALORANT tracker profile.",
      value: "tracker-buttons"
    },
    {
      name: "Description Links",
      description: "Filter links from the team description and display them in a separate container to easily go to the references the team gave you.",
      value: "description-links"
    },
    {
      name: "Block list",
      description: "Block teams for free. Adds a button to every team page and a checkbox to the search page to only see not blocked teams.",
      value: "block-list"
    },
    {
      name: "Favourite list",
      description: "Favourite teams for free. Adds a button to every team page and a checkbox to the search page to only see favourited teams.",
      value: "favourites"
    }
    /* {
      name: "Auto Match Dates",
      description: "Automatically turn on match dates in the pracc search page",
      value: "auto-match-dates"
    } */
  ]

export const Popup = () => {
  const [loading, isLoading] = useState(true);
  const [permissions, setPermissions] = useState<string[]>([]);
  const image = useRef<string>();
  useEffect(() => {
    chrome.storage.sync.get(["permissions"], (result) => {
      setPermissions(result.permissions || []);
      chrome.storage.sync.get("userIcon", (result) => {
        image.current = result.userIcon;
        isLoading(false);
      })
    });
  }, []);
  const updatePersmission = async (permissions: string[]) => {
    setPermissions(permissions);
    chrome.storage.sync.set({ permissions });
  }
  return (
    <div className={cn("bg-background w-full h-full")}>
      {loading ? <Loader active={loading} type="pacman" /> : (
        <>
          <Navbar userIcon={image.current} />
          <Tabs className="p-2" defaultValue="valorant">
            <TabsList className="w-full">
              <TabsTrigger className="w-max" value="valorant">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#ff5252" d="M5,10.885v11.761c0,0.878,0.289,1.732,0.823,2.43L17.4,40.215C17.778,40.71,18.365,41,18.988,41	h9.951c0.835,0,1.302-0.963,0.785-1.619L6.785,10.266C6.198,9.521,5,9.936,5,10.885z"></path><path fill="#ff5252" d="M27.245,28.389l13.964-18.07C41.792,9.563,43,9.976,43,10.93v12.465c0,0.395-0.117,0.781-0.336,1.109	l-3.07,4.606C39.223,29.666,38.598,30,37.93,30h-9.893C27.206,30,26.737,29.046,27.245,28.389z"></path>
                </svg>
              </TabsTrigger>
              <TabsTrigger className="w-max" value="cs2" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-black dark:fill-white" viewBox="0 0 50 50">
                  <path d="M 27.634766 4.0410156 C 27.350717 3.9946246 27.034338 4.0716452 26.726562 4.1132812 A 1.0001 1.0001 0 0 0 26.353516 4.1152344 C 26.326956 4.1200144 26.311436 4.1430815 26.285156 4.1484375 C 26.256726 4.1572675 26.231655 4.1444369 26.203125 4.1542969 A 1.0001 1.0001 0 0 0 25.851562 4.3574219 C 24.821496 4.727967 23.998195 5.4610858 23.582031 6.3925781 C 23.297129 7.0302702 23.214181 7.7352769 23.257812 8.4414062 C 22.946807 8.4628653 22.635948 8.4988252 22.435547 8.546875 A 1.0001 1.0001 0 0 0 22.349609 8.5722656 C 20.866744 9.0724765 20.014064 10.365149 19.583984 11.587891 C 19.167094 12.719815 19.152634 13.852498 19.226562 14.935547 C 18.985398 14.945967 18.714598 14.942548 18.347656 15.070312 A 1.0001 1.0001 0 0 0 17.677734 15.978516 C 17.641424 16.976543 17.576442 17.946758 17.412109 18.878906 A 1.0001 1.0001 0 0 0 17.40625 18.916016 C 17.37077 19.17299 17.232727 19.678345 17.46875 20.302734 A 1.0001 1.0001 0 0 0 17.783203 20.730469 C 17.670222 22.035755 17.920125 23.070703 17.996094 24.005859 C 17.806801 24.190631 17.628566 24.390457 17.564453 24.558594 C 17.394006 25.005591 17.396545 25.339261 17.382812 25.40625 A 1.0001 1.0001 0 0 0 17.449219 26.013672 A 1.0001 1.0001 0 0 0 17.451172 26.546875 C 17.452672 26.552175 17.462569 26.713612 17.505859 27.009766 C 17.522059 27.120623 17.678226 27.287841 17.732422 27.4375 C 17.564608 28.47348 17.372982 29.533717 17.257812 30.636719 C 17.201933 31.072115 17.298855 31.367156 17.328125 31.515625 C 17.339815 31.57492 17.338901 31.586115 17.339844 31.59375 C 17.304931 31.691842 17.068017 32.092091 16.890625 32.597656 C 16.39186 33.190485 16.058351 33.827631 15.810547 34.298828 C 15.400724 35.034365 15.456933 35.609939 15.417969 35.964844 C 15.160148 36.368198 14.629918 36.990363 14.644531 38.001953 C 14.640831 38.113502 14.616618 38.309934 14.648438 38.607422 C 14.659297 38.708924 14.785432 38.839805 14.824219 38.962891 C 14.611362 40.019973 14.286087 41.101236 14.013672 42.263672 A 1.0001 1.0001 0 0 0 13.992188 42.392578 C 13.945597 42.86795 13.860844 43.564666 14.230469 44.296875 A 1.0001 1.0001 0 0 0 14.849609 44.808594 C 16.002806 45.137158 17.067675 44.972473 17.943359 44.904297 A 1.0001 1.0001 0 0 0 18.855469 44.058594 C 18.921095 43.628258 18.947214 43.050201 18.701172 42.466797 C 18.47615 41.664634 18.698172 40.67218 19.167969 39.820312 C 19.33604 39.684385 19.590804 39.614883 19.6875 39.464844 C 19.911179 39.117772 19.997405 38.797179 20.064453 38.554688 A 1.0001 1.0001 0 0 0 20.066406 38.550781 C 20.26126 37.837306 20.910005 36.995048 21.171875 35.720703 A 1.0001 1.0001 0 0 0 21.181641 35.664062 C 21.240153 35.262291 21.156551 35.004389 21.136719 34.890625 C 21.286431 34.557672 21.354163 34.440135 21.265625 34.498047 C 21.791936 34.154223 21.99268 33.695066 22.130859 33.353516 C 22.228971 33.289738 22.520949 33.148659 22.753906 32.742188 C 23.013839 32.289713 23.049046 31.867481 23.080078 31.59375 C 23.111108 31.320019 23.14092 31.186855 23.15625 31.15625 A 1.0001 1.0001 0 0 0 23.183594 31.101562 C 23.522712 30.30565 23.693763 29.775885 23.953125 29.439453 A 1.0001 1.0001 0 0 0 24.029297 29.476562 C 24.304501 29.595537 24.388118 29.55132 24.572266 29.5625 C 25.113229 30.35733 25.649682 31.156315 26.189453 31.958984 L 26.166016 31.919922 C 26.525243 32.509 27.08615 32.704186 27.664062 32.744141 C 27.646052 32.908119 27.630134 33.072121 27.615234 33.25 C 27.35367 33.621954 27.14593 34.074062 27.251953 34.640625 L 27.240234 34.570312 C 27.319484 35.258116 27.384291 35.951791 27.4375 36.648438 A 1.0001 1.0001 0 0 0 27.449219 36.740234 C 27.571306 37.452165 27.734564 37.792444 27.722656 37.917969 A 1.0001 1.0001 0 0 0 28.003906 38.708984 C 28.02777 39.345575 28.093338 39.958583 28.052734 40.341797 C 27.682671 41.191118 27.656026 41.968746 27.519531 42.488281 A 1.0001 1.0001 0 0 0 27.728516 43.392578 C 28.183196 43.922029 28.883317 44.064413 29.328125 44.056641 C 29.755206 44.049141 30.046547 43.994127 30.173828 43.992188 C 30.494501 44.046188 31.086709 44.411456 32.068359 44.359375 C 32.799434 44.351275 33.657184 44.434795 34.619141 44.257812 A 1.0001 1.0001 0 0 0 35.421875 43.455078 C 35.488215 43.094588 35.546314 42.587434 35.326172 42.042969 A 1.0001 1.0001 0 0 0 34.941406 41.576172 C 34.493241 41.287191 34.008834 41.067894 33.505859 40.917969 A 1.0001 1.0001 0 0 0 33.464844 40.90625 C 33.505994 40.91658 33.343702 40.753962 33.009766 40.400391 C 32.668261 39.956825 32.522954 39.780516 32.527344 39.822266 A 1.0001 1.0001 0 0 0 32.527344 39.818359 C 32.473154 39.319674 32.495162 38.750827 32.513672 38.146484 C 32.599122 38.034603 32.761713 37.785923 32.779297 37.242188 C 32.839967 36.794353 32.806396 36.380768 32.759766 36.123047 C 32.705486 35.823044 32.697774 35.67313 32.708984 35.621094 A 1.0001 1.0001 0 0 0 32.71875 35.566406 C 32.931267 34.218091 33.107696 32.8165 33.0625 31.369141 A 1.0001 1.0001 0 0 0 32.880859 30.824219 C 32.859749 30.794189 32.842486 30.769014 32.822266 30.740234 C 32.808366 30.605661 32.79523 30.470345 32.78125 30.337891 A 1.0001 1.0001 0 0 0 32.236328 29.548828 C 32.236328 29.548828 32.234375 29.548828 32.234375 29.548828 C 31.849653 28.495226 31.423133 27.457305 30.9375 26.447266 A 1.0001 1.0001 0 0 0 30.919922 26.412109 C 30.434922 25.495889 29.80636 24.699826 29.152344 23.951172 C 29.417355 23.893902 29.717953 23.753234 29.910156 23.535156 A 1.0001 1.0001 0 0 0 29.996094 23.419922 C 30.346369 22.884484 30.711231 22.173004 30.664062 21.298828 L 30.664062 21.349609 C 30.661162 20.673265 30.848654 19.741983 30.773438 18.691406 C 31.320861 18.931462 31.893272 19.157712 32.5625 19.222656 C 33.232706 19.311426 33.840879 19.005223 34.169922 18.744141 C 34.502965 18.479884 34.698787 18.280515 34.771484 18.238281 A 1.0001 1.0001 0 0 0 34.849609 18.189453 C 35.476619 17.74303 35.700181 17.053938 35.794922 16.580078 C 35.850072 16.304234 35.875222 16.198218 35.908203 16.025391 C 35.929363 16.019291 35.94735 16.013952 35.96875 16.007812 A 1.0001 1.0001 0 0 0 36.679688 14.888672 C 36.573119 14.218679 36.468055 13.825119 36.419922 13.449219 C 36.622218 13.287319 36.780914 13.045089 36.960938 12.771484 C 36.970537 12.766684 36.980624 12.762682 36.990234 12.757812 C 37.953264 12.748012 38.93215 12.7633 39.9375 12.75 L 39.873047 12.748047 C 40.157444 12.762847 40.591914 12.619412 40.820312 12.357422 C 40.856893 12.315462 40.839738 12.296082 40.867188 12.255859 C 41.022635 12.244099 41.190499 12.358611 41.333984 12.318359 A 1.0001 1.0001 0 0 0 41.375 12.304688 C 41.56922 12.241088 42.002838 12.277889 42.613281 12.255859 L 42.642578 12.255859 C 42.866179 12.260459 43.019804 12.251106 43.080078 12.253906 A 1.0001 1.0001 0 0 0 43.818359 12.417969 C 44.131859 12.363699 44.515879 12.364044 44.964844 12.371094 A 1.0001 1.0001 0 0 0 45.978516 11.40625 C 45.984516 11.227375 45.991187 11.050429 45.998047 10.875 A 1.0001 1.0001 0 0 0 44.996094 9.8359375 C 44.71605 9.8367445 44.431481 9.8408831 44.146484 9.8457031 C 44.100514 9.8277561 44.051905 9.8082326 44.007812 9.7910156 A 1.0001 1.0001 0 0 0 43.083984 9.8964844 C 42.714664 9.9144254 42.293082 9.9102529 41.878906 9.9042969 C 41.809916 9.7475353 41.840596 9.5993573 41.708984 9.4765625 A 1.0001 1.0001 0 0 0 41.601562 9.3925781 C 41.600864 9.2420595 41.600409 9.0931077 41.599609 8.9414062 A 1.0001 1.0001 0 0 0 40.583984 7.9472656 C 40.496384 7.9485556 40.368617 7.9513381 40.28125 7.9550781 A 1.0001 1.0001 0 0 0 39.324219 8.9570312 C 39.324296 8.9954683 39.324186 9.0356661 39.324219 9.0742188 C 37.039988 9.0593727 34.764491 9.0704407 32.496094 9.0625 A 1.0001 1.0001 0 0 0 32.160156 8.8652344 C 32.120856 8.7073472 32.167359 8.6130014 32.068359 8.4394531 A 1.0001 1.0001 0 0 0 30.998047 7.9570312 C 30.995047 7.4263008 30.921157 6.9441699 30.757812 6.4960938 A 1.0001 1.0001 0 0 0 30.662109 5.8066406 C 30.61853 5.7258971 30.545932 5.5972594 30.525391 5.5585938 A 1.0001 1.0001 0 0 0 29.996094 5.0917969 C 29.683718 4.9741308 29.342396 4.7618292 28.941406 4.5039062 A 1.0001 1.0001 0 0 0 28.84375 4.4472656 C 28.493035 4.2743691 28.082509 4.1141413 27.634766 4.0410156 z M 27.072266 6.0097656 C 27.314116 6.001986 27.630058 6.0780788 27.958984 6.2402344 C 28.177558 6.3812717 28.4676 6.5166565 28.734375 6.6601562 A 1.0001 1.0001 0 0 0 28.796875 6.8554688 C 29.023175 7.3699815 29.040965 7.822407 28.96875 8.1914062 C 28.91821 8.2028572 28.99001 8.1534362 28.736328 8.2382812 A 1.0001 1.0001 0 0 0 28.054688 9.1835938 C 28.053387 9.6577481 28.118634 10.050418 28.146484 10.367188 A 1.0001 1.0001 0 0 0 28.984375 11.267578 C 29.56752 11.361548 30.03743 11.204088 30.34375 11.107422 C 30.65007 11.010752 30.808215 10.978237 30.869141 10.982422 A 1.0001 1.0001 0 0 0 31.308594 10.910156 A 1.0001 1.0001 0 0 0 31.830078 11.060547 C 33.192703 11.068447 34.542312 11.069959 35.898438 11.068359 C 35.893237 11.070859 35.887993 11.073672 35.882812 11.076172 A 1.0001 1.0001 0 0 0 35.371094 11.658203 C 35.358554 11.695503 35.14985 11.91819 34.755859 12.212891 A 1.0001 1.0001 0 0 0 34.677734 12.279297 C 34.639784 12.129243 34.629374 11.980802 34.566406 11.832031 A 1.0001 1.0001 0 0 0 33.626953 11.220703 C 33.463027 11.223703 33.30238 11.227616 33.146484 11.228516 A 1.0001 1.0001 0 0 0 32.628906 11.376953 C 32.500564 11.455843 32.274389 11.532619 32.03125 11.929688 C 31.9967 11.986118 32.011615 12.092028 31.984375 12.166016 C 32.063795 12.100886 31.963595 12.153397 31.742188 12.289062 C 31.622583 12.362353 31.459669 12.468062 31.302734 12.693359 C 31.145799 12.918657 31.046457 13.296321 31.097656 13.603516 A 1.0001 1.0001 0 0 0 31.234375 13.966797 C 31.40406 14.239657 31.549719 14.524884 31.669922 14.820312 A 1.0001 1.0001 0 0 0 33.230469 15.216797 C 33.722158 14.813273 34.075895 14.303871 34.355469 13.771484 C 34.387568 13.738883 34.426022 13.699567 34.466797 13.658203 C 34.504557 13.921537 34.520207 14.149938 34.576172 14.365234 A 1.0001 1.0001 0 0 0 34.146484 14.845703 C 33.906018 15.41275 33.893743 15.88861 33.833984 16.1875 C 33.774224 16.48639 33.746444 16.518017 33.689453 16.558594 L 33.767578 16.509766 C 33.315275 16.772532 33.074488 17.057788 32.925781 17.175781 C 32.777075 17.293774 32.861984 17.25411 32.833984 17.25 A 1.0001 1.0001 0 0 0 32.777344 17.242188 C 31.85062 17.160365 30.824722 16.495475 29.625 15.878906 A 1.0001 1.0001 0 0 0 28.179688 16.603516 C 28.137767 16.855861 28.066924 17.131539 27.984375 17.429688 A 1.0001 1.0001 0 0 0 28.763672 18.679688 C 28.813152 18.689087 28.805677 18.688853 28.804688 18.689453 C 28.893037 19.355687 28.659295 20.227537 28.664062 21.357422 A 1.0001 1.0001 0 0 0 28.666016 21.40625 C 28.672616 21.528539 28.548991 21.720198 28.488281 21.878906 C 28.408481 21.858246 28.430611 21.846188 28.316406 21.830078 A 1.0001 1.0001 0 0 0 27.287109 22.363281 C 27.212609 22.508074 27.140163 22.650305 27.070312 22.791016 A 1.0001 1.0001 0 0 0 26.994141 23.46875 C 27.061501 23.749538 27.097159 24.17077 27.271484 24.679688 A 1.0001 1.0001 0 0 0 27.476562 25.025391 C 28.131784 25.749235 28.709017 26.517994 29.144531 27.337891 C 29.625786 28.340975 30.056501 29.368512 30.431641 30.416016 L 30.390625 30.255859 C 30.446165 30.564241 30.652886 30.776455 30.833984 30.951172 C 30.842484 31.033802 30.851135 31.116429 30.859375 31.199219 A 1.0001 1.0001 0 0 0 31.027344 31.662109 C 31.032844 31.670309 31.037439 31.677467 31.042969 31.685547 C 31.055909 32.849839 30.935973 34.036829 30.744141 35.253906 L 30.753906 35.199219 C 30.636113 35.746182 30.738046 36.187722 30.791016 36.480469 C 30.843986 36.773215 30.848177 36.914923 30.835938 36.966797 A 1.0001 1.0001 0 0 0 30.810547 37.248047 C 30.801647 37.075566 30.770297 37.136035 30.576172 37.664062 A 1.0001 1.0001 0 0 0 30.513672 37.980469 C 30.495072 38.603989 30.459333 39.293564 30.539062 40.03125 C 30.641694 41.007301 31.302474 41.459127 31.449219 41.650391 A 1.0001 1.0001 0 0 0 31.515625 41.726562 C 31.61774 41.834972 31.822844 42.096674 32.119141 42.357422 C 32.074181 42.357751 32.047581 42.360628 32.001953 42.361328 A 1.0001 1.0001 0 0 0 31.962891 42.363281 C 31.728797 42.375701 31.24537 42.099907 30.349609 41.996094 A 1.0001 1.0001 0 0 0 30.259766 41.990234 C 29.982427 41.983134 29.863035 42.008207 29.6875 42.029297 C 29.75292 41.685092 29.823384 41.225935 29.931641 41.015625 A 1.0001 1.0001 0 0 0 30.03125 40.701172 C 30.183293 39.658594 29.952195 38.848955 29.984375 38.294922 A 1.0001 1.0001 0 0 0 29.626953 37.46875 C 29.620953 37.46375 29.608733 37.453266 29.601562 37.447266 C 29.522223 37.068959 29.458762 36.596804 29.425781 36.4375 C 29.371981 35.740882 29.306856 35.043068 29.226562 34.345703 C 29.229831 34.346434 29.236343 34.337529 29.273438 34.302734 A 1.0001 1.0001 0 0 0 29.587891 33.628906 C 29.606971 33.286265 29.656831 32.907389 29.697266 32.490234 A 1.0001 1.0001 0 0 0 29.675781 32.167969 C 29.527818 31.528465 29.194221 31.263734 29.166016 31.216797 A 1.0001 1.0001 0 0 0 27.921875 30.808594 C 27.883285 30.824804 27.816638 30.786406 27.873047 30.878906 A 1.0001 1.0001 0 0 0 27.849609 30.841797 C 27.232167 29.923626 26.614812 29.003079 25.986328 28.083984 A 1.0001 1.0001 0 0 0 25.226562 27.650391 C 25.044186 27.638481 25.088744 27.648231 25.023438 27.644531 C 24.950028 27.520564 24.888443 27.418585 24.746094 27.140625 A 1.0001 1.0001 0 0 0 23.109375 26.931641 C 22.812263 27.265738 22.731324 27.58177 22.677734 27.728516 C 22.652004 27.798972 22.639127 27.823224 22.638672 27.826172 C 21.759908 28.681664 21.598759 29.7179 21.34375 30.316406 L 21.369141 30.261719 C 21.142475 30.714114 21.120765 31.113621 21.091797 31.369141 C 21.067944 31.579528 21.047526 31.638457 21.033203 31.679688 C 21.021337 31.688422 21.028312 31.684238 21.011719 31.695312 C 20.86378 31.794042 20.496932 32.036821 20.335938 32.521484 L 20.355469 32.464844 C 20.2432 32.745066 20.161719 32.830118 20.173828 32.822266 A 1.0001 1.0001 0 0 0 20.169922 32.824219 C 19.432846 33.306331 19.337761 34.006708 19.255859 34.195312 A 1.0001 1.0001 0 0 0 19.255859 34.197266 C 19.068773 34.630442 19.132351 35.022245 19.166016 35.220703 C 19.195456 35.394271 19.191439 35.40661 19.199219 35.355469 C 19.046814 36.040737 18.463371 36.829321 18.136719 38.025391 L 18.136719 38.021484 C 18.089239 38.193189 18.043129 38.298134 18.019531 38.34375 A 1.0001 1.0001 0 0 0 17.431641 38.8125 C 16.780562 39.97514 16.400989 41.436332 16.771484 42.898438 C 16.504251 42.908698 16.227984 42.912325 15.994141 42.890625 C 15.993343 42.787785 15.972745 42.759924 15.984375 42.625 C 16.248195 41.519715 16.605335 40.377361 16.837891 39.136719 A 1.0001 1.0001 0 0 0 16.638672 38.332031 C 16.638765 38.280841 16.641631 38.192937 16.644531 38.001953 A 1.0001 1.0001 0 0 0 16.644531 37.972656 C 16.642231 37.810944 16.859674 37.480294 17.220703 36.851562 A 1.0001 1.0001 0 0 0 17.332031 36.560547 C 17.486088 35.831899 17.475745 35.415365 17.556641 35.271484 A 1.0001 1.0001 0 0 0 17.568359 35.25 C 17.91741 34.590196 18.163414 34.054186 18.46875 33.751953 A 1.0001 1.0001 0 0 0 18.742188 33.253906 C 18.757807 33.182446 19.023376 32.870761 19.240234 32.207031 C 19.404056 31.750099 19.334126 31.347526 19.291016 31.128906 C 19.247286 30.907125 19.248114 30.829229 19.240234 30.890625 A 1.0001 1.0001 0 0 0 19.244141 30.867188 C 19.355756 29.786327 19.55681 28.68053 19.738281 27.541016 A 1.0001 1.0001 0 0 0 19.484375 26.705078 C 19.479475 26.666068 19.448226 26.510073 19.441406 26.425781 C 19.455866 26.397121 19.463539 26.369264 19.480469 26.339844 A 1.0001 1.0001 0 0 0 19.544922 25.478516 A 1.0001 1.0001 0 0 0 20.033203 24.650391 C 20.072763 23.272003 19.795471 22.228725 19.792969 21.28125 C 19.850109 21.26363 19.911909 21.227157 19.966797 21.216797 A 1.0001 1.0001 0 0 0 19.912109 19.244141 C 19.755716 19.223671 19.559172 19.170801 19.388672 19.134766 C 19.517979 18.37371 19.555427 17.629558 19.597656 16.886719 C 19.883731 16.871419 20.265585 16.855949 20.697266 16.650391 A 1.0001 1.0001 0 0 0 21.259766 15.625 C 21.110665 14.416999 21.097393 13.255488 21.460938 12.273438 A 1.0001 1.0001 0 0 0 21.466797 12.255859 C 21.762436 11.411987 22.295148 10.718704 22.96875 10.480469 C 23.171426 10.435699 23.358417 10.40427 23.429688 10.40625 A 1.0001 1.0001 0 0 0 24.861328 10.496094 C 24.971874 10.395497 25.073775 10.299706 25.166016 10.214844 A 1.0001 1.0001 0 0 0 25.380859 9.0292969 C 25.128773 8.5275726 25.139217 7.8110617 25.408203 7.2089844 C 25.676762 6.6078724 26.143633 6.188068 26.705078 6.0859375 C 26.705078 6.0859375 26.707031 6.0839844 26.707031 6.0839844 A 1.0001 1.0001 0 0 0 26.791016 6.0664062 A 1.0001 1.0001 0 0 0 26.804688 6.0625 A 1.0001 1.0001 0 0 0 26.857422 6.0449219 C 26.919333 6.0235216 26.991649 6.0123588 27.072266 6.0097656 z M 34.457031 13.601562 C 34.457325 13.603862 34.458684 13.605122 34.458984 13.607422 L 34.414062 13.671875 C 34.426256 13.647558 34.445184 13.62597 34.457031 13.601562 z M 5 20 C 3.895 20 3 20.895 3 22 L 3 31 C 3 32.105 3.895 33 5 33 L 13 33 C 14.105 33 15 32.105 15 31 C 15 30.448 14.552 30 14 30 L 6 30 L 6 23 L 14 23 C 14.552 23 15 22.552 15 22 C 15 20.895 14.105 20 13 20 L 5 20 z M 37 20 C 35.895 20 35 20.895 35 22 L 35 26 C 35 27.105 35.895 28 37 28 L 44 28 L 44 30 L 36 30 C 35.448 30 35 30.448 35 31 C 35 32.105 35.895 33 37 33 L 45 33 C 46.105 33 47 32.105 47 31 L 47 26 C 47 25.448 46.552 25 46 25 L 37.769531 25 L 37.769531 23 L 46 23 C 46.552 23 47 22.552 47 22 C 47 20.895 46.105 20 45 20 L 37 20 z"></path>
                </svg>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="valorant">
              <h2 className={cn("text-foreground text-lg")}>Configure Valorant Settings</h2>
              <div className="flex flex-col gap-2 overflow-clip">
                <Accordion type="single" collapsible>
                  {settings.map((setting) => {
                    return (
                      <Setting title={setting.name} value={setting.value} description={setting.description} permissions={permissions} updatePermissions={updatePersmission} />
                    )
                  })}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </>

      )}
    </div>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Key } from "lucide-react";

type Props = {
  title: string;
  description?: string;
} & (SettingsSelectProps | SettingsSwitchProps | SettingsSecretInputProps);
type SettingsSwitchProps = {
  type: "switch";
  onLabel: string;
  offLabel: string;
  updateFunction: (value: boolean) => void;
  defaultValue?: boolean;
};
type SettingsSelectProps = {
  type: "select";
  items: { label: string; value: string }[];
  updateFunction: (value: string) => void;
  defaultValue?: string;
};
type SettingsSecretInputProps = {
  type: "secret-input";
  updateFunction: (value: string) => void;
  defaultValue?: string;
};
export function SettingsComponent(props: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        {props.description && (
          <CardDescription>{props.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {props.type === "select" && (
          <Select
            defaultValue={props.defaultValue}
            onValueChange={props.updateFunction}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select something..." />
            </SelectTrigger>
            <SelectContent>
              {props.items.map((item) => (
                <SelectItem value={item.value}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {props.type === "switch" && (
          <div className="flex flex-row items-center gap-2">
            <p>{props.offLabel}</p>
            <Switch
              defaultChecked={props.defaultValue}
              onCheckedChange={props.updateFunction}
            />
            <p>{props.onLabel}</p>
          </div>
        )}
        {props.type === "secret-input" && (
          <InputGroup>
            <InputGroupAddon>
              <Key />
            </InputGroupAddon>
            <InputGroupInput
              type="password"
              defaultValue={props.defaultValue}
              onChange={(ev) => props.updateFunction(ev.target.value)}
            />
          </InputGroup>
        )}
      </CardContent>
    </Card>
  );
}

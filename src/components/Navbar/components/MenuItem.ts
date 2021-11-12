import { AccessibilityNew, GridView, Groups, Info } from "@mui/icons-material";

export interface MenuItem {
  title: string;
  url: string;
  icon: any;
}

export const MenuItems: MenuItem[] = [
  {
    title: "Combat",
    url: "/combat-track/combat",
    icon: Groups,
  },
  {
    title: "Edit Actors",
    url: "/combat-track/actors",
    icon: AccessibilityNew,
  },
  {
    title: "Edit Scenarios",
    url: "/combat-track/scenarios",
    icon: GridView,
  },

  {
    title: "About",
    url: "/combat-track/about",
    icon: Info,
  },
];

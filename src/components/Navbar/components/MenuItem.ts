import { AccessibilityNew, GridView, Groups, Info, Home } from "@mui/icons-material";

export interface MenuItem {
  title: string;
  url: string;
  icon: any;
}

export const MenuItems: MenuItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Combat",
    url: "/combat",
    icon: Groups,
  },
  {
    title: "Edit Actors",
    url: "/actors",
    icon: AccessibilityNew,
  },
  {
    title: "Edit Scenarios",
    url: "/scenarios",
    icon: GridView,
  },

  {
    title: "About",
    url: "/about",
    icon: Info,
  },
];

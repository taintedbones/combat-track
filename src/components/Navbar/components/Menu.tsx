import { Link } from "react-router-dom";
import { Drawer, Box, Divider, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { MenuItems } from "./MenuItem";

export default function Menu({ isOpen, handleClose }) {
  return (
    <Drawer anchor="right" open={isOpen} onClose={handleClose}>
      <Box sx={{ width: 350 }} onClick={handleClose}>
        <List>
          {MenuItems.map((menuItem, index) => {
            return (
              <ListItem button key={index} component={Link} to={menuItem.url}>
                <ListItemIcon>
                  <menuItem.icon />
                </ListItemIcon>
                <ListItemText primary={menuItem.title} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}

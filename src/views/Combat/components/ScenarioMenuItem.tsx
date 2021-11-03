import { MenuItem } from "@mui/material";
import React from "react";

export default function ScenarioMenuItem(itemVal, text) {
    return(
        <React.Fragment>
            <MenuItem value={itemVal}>{text}</MenuItem>,
        </React.Fragment>
    );
}
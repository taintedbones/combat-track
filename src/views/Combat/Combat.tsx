import { useEffect, useState } from "react";
import { useActors } from "../../hooks/useDatabase";
import { Grid, Typography } from "@mui/material";
import Toolbar from "./components/Toolbar";
import DataTable from "../../components/DataTables/CombatDataTable";
import "../../styles/App.css";

export default function Combat() {
  const [roundNum, setRoundNum] = useState(1);
  const [turnNum, setTurnNum] = useState(0);
  const [actorName, setActorName] = useState("");
  const { loading, actors } = useActors();
  const size = actors.length;

  useEffect(() => {
    const setActor = () => {
      const actor = actors.filter((obj) => {
        return obj.id === turnNum;
      })[0];
      setActorName(actor.name);
    };
    if (!!actors.length && !loading) {
      setActor();
    }
  }, [loading, actors, turnNum]);

  const handleTurnEnd = () => {
    if (turnNum + 1 === size) {
      setTurnNum(0);
      setRoundNum(roundNum + 1);
      console.log("ended turn");
      console.log("new round");
    } else {
      setTurnNum(turnNum + 1);
      console.log("ended turn");
    }
  };

  return (
    <div className="container">
      <Grid container justifyContent="center" direction="row" spacing={2} sx={{ height: "80%" }}>
        <Typography variant="h4">Combat</Typography>
        <Grid item xs={12}>
          <DataTable actors={actors} turnNum={turnNum} />
        </Grid>
        <Toolbar roundNum={roundNum} actorTurn={actorName} endTurn={handleTurnEnd} />
      </Grid>
    </div>
  );
}

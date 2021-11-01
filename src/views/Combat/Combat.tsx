import { useEffect, useState } from "react";
import { useActors } from "../../hooks/useDatabase";
import { Grid, Typography } from "@mui/material";
import Toolbar from "./components/Toolbar";
import DataTable from "../../components/DataTables/CombatDataTable";
import "../../styles/App.css";

export default function Combat() {
  const { loading, actors } = useActors();
  const [currentActors, setCurrentActors] = useState<any>([]);
  const [size, setSize] = useState(actors.length);
  const [roundNum, setRoundNum] = useState(1);
  const [turnIndex, setTurnIndex] = useState(0);
  const [actorName, setActorName] = useState("Loading...");

  useEffect(() => {
    if (actors.length > 0 && !loading) {
      console.log(actors);
      setCurrentActors(actors);
      setSize(actors.length);
    }
  }, [loading, actors]);

  useEffect(() => {
    const setActor = () => {
      setActorName(currentActors[turnIndex].name);
    };
    if (currentActors.length > 0 && !loading) {
      setActor();
    }
  }, [turnIndex]);

  const handleTurnEnd = () => {
    if (turnIndex + 1 === size) {
      setTurnIndex(0);
      setRoundNum(roundNum + 1);
      console.log("ended turn");
      console.log("new round");
    } else {
      setTurnIndex(turnIndex + 1);
      console.log("ended turn");
    }
  };

  const handleCellEdit = (e) => {};

  const addActor = () => {
    let tempActor = {
      initiative: Math.floor(Math.random() * 20),
      // initiative: 8,
      hp: 96,
      ac: 17,
      dc: 14,
      name: "Temp",
      type: "companion",
      notes: "Testing",
      id: size,
    };

    setSize(size + 1);

    setCurrentActors(
      [...currentActors, tempActor]
        .sort((a, b) => {
          if (a.initiative === b.initiative) {
            return b.name - a.name;
          } else {
            return b.initiative - a.initiative;
          }
        })
        .map((actor, index) => {
          return { ...actor, index: index };
        })
    );

    if (tempActor.initiative >= currentActors[turnIndex].initiative) {
      setTurnIndex(turnIndex + 1);
    }
  };

  return (
    <div className="container">
      <Grid container justifyContent="center" direction="row" spacing={2} sx={{ height: "80%" }}>
        <Typography variant="h4">Combat</Typography>
        <Grid item xs={12}>
          <DataTable actors={currentActors} turnNum={turnIndex} onCellEdit={handleCellEdit} />
        </Grid>
        <Toolbar roundNum={roundNum} actorTurn={actorName} endTurn={handleTurnEnd} onAddActor={addActor} />
      </Grid>
    </div>
  );
}

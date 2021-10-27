import { Grid, Typography } from '@mui/material';
import Toolbar from './components/Toolbar';
import DataTable from '../../components/DataTable';
import '../../styles/App.css';

export default function Combat() {
  return (
    <div className='container'>
      <Grid container justifyContent='center' direction='row' spacing={2}>
        <Typography variant='h4'>Combat</Typography>
        <Grid item xs={12}>
          <DataTable />
        </Grid>
        <Toolbar />
      </Grid>
    </div>
  );
}

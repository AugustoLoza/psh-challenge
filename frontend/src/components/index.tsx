import React from 'react';
import PlayerTable from './gameStatsTable';
import ExportButton from './exportButtonCSV';
import { Box, Container, Paper } from '@mui/material';


const PlayerStatsPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4 }}>
          <PlayerTable />
          <Box mt={2}>
            <ExportButton />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PlayerStatsPage;


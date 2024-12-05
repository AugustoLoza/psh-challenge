import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayers, fetchLastUpdated, selectPlayers, selectLastUpdated } from '../store/gameStatsSlice';
import { AppDispatch } from '../store/store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const PlayerTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const lastUpdated = useSelector(selectLastUpdated);

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchLastUpdated());

    const interval = setInterval(() => {
      dispatch(fetchPlayers());
      dispatch(fetchLastUpdated());
    }, 10000); // Actualizar cada 10 segundos

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Top 10 Players
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Last updated: {lastUpdated}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nickname</TableCell>
              <TableCell>Profile Image</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.slice(0, 10).map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.nickname}</TableCell>
                <TableCell>
                  <img src={player.profileImage} alt={player.nickname} style={{ width: '50px', borderRadius: '50%' }} />
                </TableCell>
                <TableCell>{player.score}</TableCell>
                <TableCell>
                  <a href={`/player/${player.playerId}`}>View Details</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlayerTable;


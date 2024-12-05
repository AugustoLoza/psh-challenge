import React from 'react';
import { useSelector } from 'react-redux';
import { selectPlayers } from '../store/gameStatsSlice';
import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';

const ExportButton: React.FC = () => {
  const players = useSelector(selectPlayers);

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Player ID', key: 'playerId' },
    { label: 'Nickname', key: 'nickname' },
    { label: 'Profile Image', key: 'profileImage' },
    { label: 'Created At', key: 'createdAt' },
    { label: 'Score', key: 'score' },
  ];

  return (
    <CSVLink data={players} headers={headers} filename="players-stats.csv" style={{ textDecoration: 'none' }}>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Export to CSV
      </Button>
    </CSVLink>
  );
};

export default ExportButton;


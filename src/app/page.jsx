"use client"
import React from "react";
import { Box, Card, Container, Drawer, List, ListItem, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import Header from "./components/header/page";
import Listagem from "./listagemEquipamento/Listagem"; 

export default function choicePage() {


  return (
    <Box>
      <Header currentPage="home" />
      <Container>
        <Toolbar />
        <Stack direction="row" spacing={2}>
          <Box sx={{ flexGrow: 1 }}>
            <Listagem/>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

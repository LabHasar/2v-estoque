"use client"
import React, { useEffect } from "react";
import { Box, Card, Container, Drawer, List, ListItem, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import Header from "./components/header/page";
import Listagem from "./listagemEquipamento/Listagem"; 
import { UseHomeContext } from "./context/IsHomeContext";

export default function Home() {

  const {isHome, setIsHome} = UseHomeContext()

   useEffect(()=>{
    setIsHome(true)
  },[])

  return (
    <Box>
      <Header/>
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


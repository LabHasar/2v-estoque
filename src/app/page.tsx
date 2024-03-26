"use client"
import React, { useEffect } from "react";
import { Box, Card, Container, Drawer, List, ListItem, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import Header from "./components/header/page";
import Listagem from "./listagemEquipamento/Listagem"; 
import { UseHomeContext } from "./context/IsHomeContext";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./context/AuthContext";

export default function ChoicePage() {

  const {isHome, setIsHome} = UseHomeContext();
  const { user, setUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    setIsHome(true);

    if (typeof window !== 'undefined' && user === null) {
      router.push("/signIn");
    }
  }, [user]);

  return (
    <>
    {user?.email && (
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
    )}
    </>
  );
}



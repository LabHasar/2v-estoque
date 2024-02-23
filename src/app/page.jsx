"use client"
import React from "react";
import { Box, Card, Container, Drawer, List, ListItem, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import Link from 'next/link';
import Header from "./components/header/page";

export default function choicePage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key="RetirarEquipamento">
          <Link href="/retirarEquipamento" passHref>
            <ListItemText primary="Retirar Equipamento" />
          </Link>
        </ListItem>
        <ListItem button key="DevolverEquipamento">
          <Link href="/devolucaoEquipamento" passHref>
            <ListItemText primary="Devolver Equipamento" />
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <Header />
      <Container>
        <Toolbar />
        <Stack direction="row" spacing={2}>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Bem-vindo à sua página de escolha
            </Typography>
            <Stack spacing={15} direction="row" alignItems="center">
              <Card
                sx={{
                  width: "auto",
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
                onClick={toggleDrawer(true)}
              >
                Abrir Barra Lateral
              </Card>
              <Link href="/listagemEquipamento" passHref>
                <Card
                  sx={{
                    width: "auto",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  LISTAGEM DOS EQUIPAMENTOS
                </Card>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

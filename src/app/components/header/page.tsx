import React from "react";
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header({currentPage}) {
  
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <List>
          <ListItem button key="RetirarEquipamento">
            <Link href="/retirarEquipamento" passHref>
              <ListItemText primary="Aluguel de Equipamentos" />
            </Link>
          </ListItem>
          <ListItem button key="DevolverEquipamento">
            <Link href="/devolucaoEquipamento" passHref>
              <ListItemText primary="Devoluçao de Equipamentos" />
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Link href="/" passHref>
          {currentPage ==="home" ? (
            <GiHamburgerMenu 
            style={{
              fontSize: "30px",
              marginLeft: "10px",
              color: "inherit",
              cursor: "pointer",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
            onClick={toggleDrawer(true)}
          />

          ) : (<AiFillHome
            style={{
              fontSize: "30px",
              marginLeft: "10px",
              color: "inherit",
              cursor: "pointer",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          />
          ) }
        </Link>

        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            display: "flex",
            alignItems: "center",
            fontFamily: "monospace",
            fontWeight: 900,
            fontSize: "30px",
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          CONTROLE DE ESTOQUE
        </Typography>
      </Toolbar>
      {list()}
    </AppBar>
  );
}

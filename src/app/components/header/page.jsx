"use client"
import React, { useContext, useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { UseHomeContext } from '../../context/IsHomeContext'
import { useAuthContext } from "@/app/context/AuthContext";
import { RiAccountCircleFill } from "react-icons/ri";
import { useRouter } from 'next/navigation';

export default function Header() {

  const { isHome, setIsHome } = UseHomeContext();
  const { user } = useAuthContext();
  const router = useRouter();


  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      ((event.key === 'Tab') || (event.key === 'Shift'))
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuIcon = isHome ? (
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
  ) : (
    <AiFillHome
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
  );

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
              <ListItemText primary="Devolução de Equipamentos" />
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
          {menuIcon}
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

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '20px' }}>
            <Typography variant="body1" sx={{ marginRight: '10px' }}>{user?.email.split('@')[0]}</Typography>
            <RiAccountCircleFill style={{ marginRight: '10px' }} />
          </Box>

          <Box sx={{ marginTop: 'auto', marginRight: '20px' }}>
            <button
              type="button"
              onClick={() => router.push("/signIn")}
              style={{
                backgroundColor: 'white',
                color: 'blue',
                width: '100%',
                borderRadius: '5px', 
                fontSize: '14px'
              }}
            >
              Sair
            </button>
          </Box>
        </Box>

      </Toolbar>
      {list()}
    </AppBar>
  );
}

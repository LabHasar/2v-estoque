"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import Header from "../components/header/page";
import Baseboard from "../components/baseboard/page";
import sx from "./styles.module.css";
import EquipList from "./equipList";


export default function RetirarEquipamentoPage() {
  return (
    <Box>
      <Header />
      <Container maxWidth='lg' className={sx.container}>
        <div className={sx.center}>
          <EquipList />
        </div>
      </Container>
    </Box>
  );
}

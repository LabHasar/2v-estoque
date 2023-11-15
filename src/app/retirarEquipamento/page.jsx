"use client";
import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import Header from "../components/header/page";
import sx from "./styles.module.css";
import Button from '@mui/material/Button';
import EquipList from "./equipList";

export default function RetirarEquipamentoPage() {
  return (
    <Box>
      <Header />
      <Container maxWidth='lg' className={sx.container}>
        <div className={sx.center}>
          <EquipList />
          <Button variant="outlined"  className={sx.button}>
            Salvar
          </Button>
        </div>
      </Container>
    </Box>
  );
}

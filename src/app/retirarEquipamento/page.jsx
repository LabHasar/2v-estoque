"use client";
import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import Header from "../components/header/page";
import sx from "./styles.module.css";
import EquipList from "./equipList";
import { UseHomeContext } from "../context/IsHomeContext";


export default function RetirarEquipamentoPage() {

  const {isHome, setIsHome} = UseHomeContext()

  useEffect(()=>{
    setIsHome(false)
  },[])

  return (
    <Box>
      <Header/>
      <Container maxWidth='lg' className={sx.container}>
        <div className={sx.center}>
          <EquipList />
        </div>
      </Container>
    </Box>
  );
}

"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import Header from "../components/header/page";
import sx from "./styles.module.css"
import Listagem from "./Listagem";

export default function listagemEquipamento(){
    return (
        <Box>
        <Header />
        <Container className={sx.container}> 
            <Listagem/>
        </Container>
      </Box>
    );
}
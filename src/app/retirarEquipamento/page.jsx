"use client";

import EquipList from "./equipList";
import { Box, Container } from "@mui/material";
import Header from "../components/header/page";
import sx from "./styles.module.css";

export default function RetirarEquipamentoPage() {
  return (
    <Box>
      <Header />
      <Container maxWidth='lg'>
      <div className={sx.container}>
        <div className={sx.center}>
          <EquipList />
        </div>
      </div>
      </Container>
    </Box>
  );
}

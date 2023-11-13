import React from "react";
import {
  AppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
  Card,
} from "@mui/material";
import Link from 'next/link';
import Header from "./components/header/page";

export default function choicePage() {
  return (
    <Box>
      <Header/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   backgroundColor: "red",
          padding: "8%",
        }}
      >
        <Box sx={{ width: "auto" }}>
          <Stack
            spacing={{ xs: 2, sm: 10 }}
            direction="column"
            alignItems="center"
          >
            <Stack spacing={15} direction="row" useFlexGap>
            <Link href="/retirarEquipamento" passHref>
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
                RETIRADA DE EQUIPAMENTO
              </Card>
              </Link>
              <Link href="/devolucaoEquipamento" passHref>
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
                DEVOLUÇÃO EQUIPAMENTO
              </Card>
              </Link>
            </Stack>
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
      </Box>
    </Box>
  );
}

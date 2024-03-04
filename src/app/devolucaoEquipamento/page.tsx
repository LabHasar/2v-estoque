"use client"
import Header from "../components/header/page";
import React, { useState } from "react";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "../configdb/firebase";
import { Box, Container, Button, TextField, Typography  } from "@mui/material";
import sx from "./styles.module.css"

export default function DevolverEquipamentoPage() {
    const [codigo, setCodigo] = useState('');

    const handleConfirmarClick = async () => {
        if (!codigo) {
            alert("Por favor, insira um código de equipamento.");
            return;
        }

        const equipamentoDocRef = doc(db, 'Itens', codigo);

        try {
            const equipamentoDocSnapshot = await getDoc(equipamentoDocRef);

            if (equipamentoDocSnapshot.exists()) {
                await updateDoc(equipamentoDocRef, { alugadoPor: false });
                alert("Equipamento devolvido com sucesso!");
            } else {
                alert(`Equipamento com código ${codigo} não encontrado.`);
            }
        } catch (error) {
            console.error("Erro ao verificar ou atualizar documento:", error);
            alert("Ocorreu um erro ao tentar devolver o equipamento. Por favor, tente novamente mais tarde.");
        }

    };

    return (
        <Box>
            <Header currentPage="retirar" />
            <Container className={sx.container} maxWidth='lg' >
                <Typography className={sx.titulo} variant="h4" gutterBottom>
                    DEVOLUÇÃO DE EQUIPAMENTOS
                </Typography>
                <Box className={sx.center}>
                    <TextField
                        className={sx.text}
                        label="Código do Equipamento"
                        variant="outlined"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleConfirmarClick} className={sx.button}>
                        Confirmar
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

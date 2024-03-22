"use client"
import Header from "../components/header/page";
import React, { useState, useEffect } from "react";
import { doc, getDoc, getDocs, updateDoc, onSnapshot, query, where, collection, Timestamp } from 'firebase/firestore';
import { db } from "../configdb/firebase";
import { Box, Container, Button, TextField, Typography, Snackbar } from "@mui/material";
import sx from "./styles.module.css"
import { UseHomeContext } from "../context/IsHomeContext";

export default function DevolverEquipamentoPage() {

    const [codigo, setCodigo] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);

    const { isHome, setIsHome } = UseHomeContext()

    useEffect(() => {
        setIsHome(false)
    }, [])

    const handleConfirmarClick = async () => {
        if (!codigo) {
            showAlert("Por favor, insira um código de equipamento.");
            return;
        }

        try {
            const querySnapshot = await getDocs(query(collection(db, "Itens"), where("codigo", "==", codigo)));
            if (querySnapshot.empty) {
                showAlert(`Equipamento com código ${codigo} não encontrado.`);
                return;
            }
            const item = querySnapshot.docs[0].data();
            const equipamentoDocRef = doc(db, 'Itens', querySnapshot.docs[0].id);

            try {
                await updateDoc(equipamentoDocRef, { alugadoPor: true, dataDevolvido: Timestamp.now() });
                showAlert("Equipamento devolvido com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar documento:", error);
                showAlert("Ocorreu um erro ao tentar devolver o equipamento. Por favor, tente novamente mais tarde.");
            }
        } catch (error) {
            console.error("Erro ao verificar documento:", error);
            showAlert("Ocorreu um erro ao tentar devolver o equipamento. Por favor, tente novamente mais tarde.");
        }
    };

    const showAlert = (msg: any) => {
        setAlertMessage(msg)
    }

    return (
        <Box>
            <Header />
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
            <Snackbar open={alertMessage !== null} message={alertMessage} onClose={() => { setAlertMessage(null) }} autoHideDuration={5000} />
        </Box>
    );
}

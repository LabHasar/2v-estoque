"use client"
import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../configdb/firebase';
import { UseHomeContext } from "../context/IsHomeContext";
import { Box, Container } from "@mui/material";
import Header from "../components/header/page";
import sx from "./styles.module.css";

export default function CadastroEquipamento() {

    const [item, setItem] = useState('');
    const [codigo, setCodigo] = useState('');
    const [img, setImg] = useState('');

    const { isHome, setIsHome } = UseHomeContext()

    useEffect(() => {
        setIsHome(false)
    }, [])

    const getNextId = async () => {
        const equipamentosRef = collection(db, 'Itens');
        const equipamentosQuery = query(equipamentosRef, orderBy('id', 'desc'));
        const snapshot = await getDocs(equipamentosQuery);

        if (snapshot.empty) {
            return 1;
        } else {
            const lastEquipamento = snapshot.docs[0].data();
            return lastEquipamento.id + 1;
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {

            const nextId = await getNextId();

            const docRef = await addDoc(collection(db, 'Itens'), {
                alugadoPor: true,
                codigo: codigo,
                dataAlugado: null,
                dataDevolvido: null,
                id: nextId,
                img: img,
                item: item,
            });

            console.log('Equipamento cadastrado com ID: ', docRef.id);

            setItem('');
            setCodigo('');
            setImg('');

        } catch (error) {
            console.error('Erro ao cadastrar equipamento: ', error);
        }
    };

    return (
        <Box>
            <Header />
            <Box>
                <div className={sx.principal}>
                    <div className={sx.titulo}>
                        <h1>CADASTRO DE EQUIPAMENTO</h1>
                    </div>
                    <div className={sx.formulario}>
                        <form onSubmit={handleSubmit}>
                            <label className={sx.input}>
                                Item:
                                <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
                            </label>
                            <br />
                            <label className={sx.input}>
                                Código:
                                <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                            </label>
                            <br />
                            <label className={sx.input}>
                                URL da Imagem:
                                <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
                            </label>
                            <br />
                            <Box textAlign="center">
                                <button className={sx.botao} type="submit">Cadastrar</button>
                            </Box>
                        </form>
                    </div>
                </div>
            </Box>
        </Box>
    );
}
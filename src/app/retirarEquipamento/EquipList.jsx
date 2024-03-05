"use client"
import React, { useState, useEffect } from "react";
import { onSnapshot, collection, doc, updateDoc, query, Timestamp} from 'firebase/firestore';
import { db } from "../configdb/firebase";
import sx from "./styles.module.css";
import Checkbox from '@mui/material/Checkbox';
import { Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";

export default function EquipList() {
  const [itens, setItens] = useState([]);
  const [itensSelecionados, setItensSelecionados] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Itens"), (querySnapshot) => {
      const dados = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const itensDisponiveis = dados.filter(item => item.alugadoPor === true);
      setItens(itensDisponiveis);
    });

    return () => unsubscribe();
  }, []);

  // Função para alternar a seleção de um item
  const toggleItemSelection = (itemId) => {
    if (itensSelecionados.includes(itemId)) {
      setItensSelecionados(itensSelecionados.filter(id => id !== itemId));
    } else {
      setItensSelecionados([...itensSelecionados, itemId]);
    }
  };

  // Função para lidar com o clique no botão "Alugar"
  const handleAlugarClick = async () => {
    // Atualiza o campo alugadoPor para false nos itens selecionados no banco de dados
    await Promise.all(itensSelecionados.map(async (itemId) => {
      const itemRef = doc(db, "Itens", String('item-' + itemId));
      await updateDoc(itemRef, {
        alugadoPor: false,
        dataAlugado: Timestamp.now()
      });
    }));

    // Atualiza a lista de itens exibidos para remover os itens alugados
    setItens(itens.filter(item => !itensSelecionados.includes(item.id)));

    // Limpa a lista de itens selecionados após a atualização bem-sucedida no banco de dados
    setItensSelecionados([]);
  };

  return (
    <Box>
      <div className="py-5 ">
        <div className="flex flex-col items-center justify-center text-center">
          <h1
            className="text-white font-semibold mb-4"
            style={{ fontSize: 35 }}
          >
            EQUIPAMENTOS DISPONIVEIS
          </h1>
        </div>
        <div className="text-black font-semibold mb-4 flex flex-col" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {itens.map((item) => (
            <div key={item.id} className={sx.list}>
              <p>{item?.item}</p>
              <Checkbox
                checked={itensSelecionados.includes(item.id)}
                onChange={() => toggleItemSelection(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <Button variant="outlined" className={sx.button} onClick={handleAlugarClick} disabled={itensSelecionados.length === 0}>
        Alugar
      </Button>
    </Box>
  );
}

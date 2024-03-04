"use client";
import React, { useState, useEffect } from "react";
import { onSnapshot, collection, doc, updateDoc, query} from 'firebase/firestore';
import { db } from "../configdb/firebase";
import sx from "./styles.module.css";
import Checkbox from '@mui/material/Checkbox';
import { Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";

export default function EquipList() {

  const [itens, setItens] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

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

  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter(id => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const handleAlugarClick = async () => {
    await Promise.all(selectedItems.map(async (itemId) => {
      const itemDocRef = doc(db, 'Itens', itemId);
      
      try {
        const itemDocSnapshot = await getDoc(itemDocRef);
        
        if (itemDocSnapshot.exists()) {
          await updateDoc(itemDocRef, { alugadoPor: false });
        } else {
          console.error(`Documento com ID ${itemId} não encontrado.`);
        }
      } catch (error) {
        console.error("Erro ao verificar ou atualizar documento:", error);
      }
    }));
    
    setSelectedItems([]);
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
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <Button variant="outlined" className={sx.button} onClick={handleAlugarClick}>
        Alugar
      </Button>
    </Box>
  );
}

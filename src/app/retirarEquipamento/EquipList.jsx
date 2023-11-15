"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../configdb/firebase";
import sx from "./styles.module.css";
import Checkbox from '@mui/material/Checkbox';

import { Box, Divider } from "@mui/material";

export default function EquipList() {
  // const [itens, setItens] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection(db, "item"), (querySnapshot) => {
  //     const dados = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setItens(dados);
  //   });

  //   // Função de cleanup ao desmontar o componente
  //   return () => unsubscribe();
  // }, []); // O array vazio como segundo argumento garante que o useEffect só seja executado uma vez, ao montar o componente

  return (
    <Box>
      {/* Renderiza os itens, você pode criar um componente específico para isso se desejar */}
      <div className="py-5 ">
        <div className="flex flex-col items-center justify-center text-center">
          <h1
            className="text-white font-semibold mb-4"
            style={{ fontSize: 35 }}
          >
            Equipamentos:
          </h1>
        </div>

        <div className="text-black font-semibold mb-4 flex flex-col" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {/* {itens.map((item) => (
            <div key={item.id} className={sx.list}>
              <p>{item.nome}</p>
            </div>
          ))} */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={`fake-item-${index}`} className={sx.list}>
              <p>Item de Teste {index + 1}</p>
              <Checkbox/>
            </div>
          ))}
          
        </div>
        
      </div>
    </Box>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../configdb/firebase";

import { Box } from "@mui/material";

export default function EquipList() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    // Função assíncrona para buscar dados no Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "item"));
        const dados = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItens(dados);
      } catch (error) {
        console.error("Erro ao buscar dados do Firestore:", error);
      }
    };

    // Chama a função para buscar os dados ao montar o componente
    fetchData();
  }, []); // O array vazio como segundo argumento garante que o useEffect só seja executado uma vez, ao montar o componente

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
        <div className="text-white font-semibold mb-4">
          {itens.map((item) => (
            <div key={item.id}>
              <p>{item.nome}</p>

              {/* Adicione mais campos conforme necessário */}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}

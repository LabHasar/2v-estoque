import React, { useState, useEffect } from "react";
import { onSnapshot, collection, doc, updateDoc, query, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from "../../configdb/firebase";
import sx from "./styles.module.css";
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar } from "@mui/material";

export default function EquipList() {
  const [itens, setItens] = useState([]);
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [codigoProduto, setCodigoProduto] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);

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

  const toggleItemSelection = (itemId) => {
    setItensSelecionados([itemId]);
  };

  const handleAlugarClick = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setCodigoProduto('');
  };

  const showAlert = (message) => {
    setAlertMessage(message)
  }

  const handleConfirmAluguel = async () => {
    // Verifica se há itens selecionados
    if (itensSelecionados.length === 0) {
      showAlert("Nenhum item selecionado para alugar");
      return;
    }

    // Realiza a consulta para buscar o documento com o código do produto
    const q = query(collection(db, "Itens"), where("codigo", "==", codigoProduto));
    const querySnapshot = await getDocs(q);

    // Verifica se há documentos correspondentes ao código do produto
    if (querySnapshot.empty) {
      showAlert("Nenhum produto encontrado com o código inserido.");
      return;
    }

    // Verifica se o código do produto corresponde ao item selecionado
    const itemSelecionado = itens.find(item => item.id === itensSelecionados[0]);
    const produtoCorrespondente = querySnapshot.docs[0].data();

    if (itemSelecionado.codigo !== produtoCorrespondente.codigo) {
      showAlert("O código do produto não corresponde ao item selecionado.");
      return;
    }

    // Atualiza o campo alugadoPor para false no item selecionado no banco de dados
    const itemRef = doc(db, "Itens", String('item-' + itemSelecionado.id));
    await updateDoc(itemRef, {
      alugadoPor: false,
      dataAlugado: Timestamp.now()
    });

    // Atualiza a lista de itens exibidos para remover o item alugado
    setItens(itens.filter(item => item.id !== itemSelecionado.id));

    // Limpa a lista de itens selecionados após a atualização bem-sucedida no banco de dados
    setItensSelecionados([]);
    setCodigoProduto('');
    setOpenModal(false);
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
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Confirmar Aluguel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="codigoProduto"
            label="Código do Produto"
            type="text"
            fullWidth
            value={codigoProduto}
            onChange={(e) => setCodigoProduto(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancelar</Button>
          <Button onClick={handleConfirmAluguel} variant="contained" disabled={!codigoProduto}>Confirmar Aluguel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={alertMessage !== null} message = { alertMessage} onClose={() => {setAlertMessage(null)}} autoHideDuration={5000}/>
    </Box>
  );
}

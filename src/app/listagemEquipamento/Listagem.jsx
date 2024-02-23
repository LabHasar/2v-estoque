import { useEffect } from "react";
import { useState } from "react";
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from "../configdb/firebase";
import { Modal, Box, Typography } from "@mui/material";
import sx from "./styles.module.css"

export default function Listagem() {

    const [itens, setItens] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Itens"), (querySnapshot) => {
            const dados = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItens(dados);
        });
        return () => unsubscribe();
    }, []);

    const handleItemClick = (item) => {
        setSelectedImage(item);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (

        <div className={sx.principal}>
            <div className={sx.titulo}>
                <h1>LISTAGEM DE EQUIPAMENTOS</h1>
            </div>
            <div className={sx.equipamento}>
                {itens.map((item) => (
                    <div className={sx.item} key={item.id} onClick={() => handleItemClick(item)}>
                        <text className={sx.nomeequipamento}>{item?.item}</text>
                        <img src={item.img} className={sx.image} />
                    </div>
                ))}
            </div>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={sx.modalContainer}>
                    <img src={selectedImage.img} alt="Selected" className={sx.modalImage} />
                    <Typography variant="h5" className={sx.modalTitle}>
                        {selectedImage.item}
                    </Typography>
                    <Typography className={sx.modalText}>
                        Descrição do Equipamento
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )


}
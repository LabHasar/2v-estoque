import { useEffect } from "react";
import { useState } from "react";
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from "../configdb/firebase";
import sx from "./styles.module.css"

export default function Listagem() {

    const [itens, setItens] = useState([]);

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

    return (

        <div className = {sx.principal}>

            <div className={sx.titulo} >
                <h1> LISTAGEM DE EQUIPAMENTOS </h1>
            </div>

            <div className= {sx.equipamento}> 
                    {itens.map((item) => (
                        <div className={sx.item}key={item.id} onClick = {() => console.log(item)}>
                                <text className={sx.nomeequipamento}>{item?.item}</text>
                                <img src={item.img} className={sx.image} />
                        </div>
                    ))}
            </div>


        </div>

    )


}
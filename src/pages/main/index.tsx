import {type FC, useState} from "react";
import {Modal} from "../../modal";
import styles from "./index.module.css"

export const Main: FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={styles.main}>
            <button className={styles.main_btn} onClick={openModal}>Заявка на регистрацию для мероприятия</button>
            <Modal isOpen={isModalOpen} onClose={closeModal}/>
        </div>
    )
}
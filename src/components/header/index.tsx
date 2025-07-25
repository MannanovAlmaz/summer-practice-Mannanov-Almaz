import type {FC} from "react";
import styles from "./index.module.css"

export const Header: FC = () => {
    return (
        <div>
            <ul className={styles.header_ul}>
                <li><a>HOME</a></li>
                <li><a>ABOUT</a></li>
                <li><a>CONTACTS</a></li>
            </ul>
        </div>
    )
}
import type {FC} from "react";
import styles from "./index.module.css"

interface IInputField {
    name: string,
    value: string,
    required?: boolean,
    onChange: (value: string) => void,
    placeholder?: string
}

export const InputField: FC<IInputField> = ({ name, value, onChange, required, placeholder } ) => {
    return (
        <div className={styles.input_field}>
            <label className={styles.input_label} htmlFor={name}>
                {name}
                {required && <span style={{color: "rgba(138, 143, 168, 1)"}}> *</span>}
            </label>
            <input
                type='text'
                id={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                placeholder={placeholder}
                className={styles.input}
            />
        </div>
    )
}
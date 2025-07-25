import {type FC, useState} from "react"
import styles from "./index.module.css"
import {InputField} from "../input"
import close from "../assets/svg/Close Frame.svg"
import add from "../assets/svg/Add Icon.svg"
import inputStyles from "../input/index.module.css"

interface IModal {
    isOpen: boolean,
    onClose: () => void
}

interface FormData {
    type: string,
    fullName: string,
    email: string,
    telephone: string,
    friends: FriendData[];
    preferredContact: PreferredContact;
}

interface FriendData {
    id: string;
    name: string;
    email: string;
    phone: string;
}

type PreferredContact = 'phone' | 'email' | 'whatsapp' | 'telegram' | 'none' | null;

export const Modal: FC<IModal> = ({ isOpen, onClose }) => {

    const [formData, setFormData] = useState<FormData>({
        type: '',
        fullName: '',
        email: '',
        telephone: '',
        friends: [],
        preferredContact: null
    });

    const handleChange = (field: keyof Omit<FormData, 'friends'>) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFriendChange = (id: string, field: keyof FriendData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            friends: prev.friends.map(friend =>
                friend.id === id ? { ...friend, [field]: value } : friend
            ),
        }));
    };

    const addFriend = () => {
        if (formData.friends.length >= 3) return;

        setFormData(prev => ({
            ...prev,
            friends: [
                ...prev.friends,
                { id: Date.now().toString(), name: '', email: '', phone: '' },
            ],
        }));
    };

    const removeFriend = (id: string) => {
        setFormData(prev => ({
            ...prev,
            friends: prev.friends.filter(friend => friend.id !== id),
        }));
    };

    const contactOptions: { value: PreferredContact; label: string }[] = [
        {value: null, label: 'Выберите предпочитаемый вид связи'},
        { value: 'phone', label: 'Телефонный звонок' },
        { value: 'email', label: 'Email' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'telegram', label: 'Telegram' },
        { value: 'none', label: 'Не важно' },
    ];

    if (!isOpen) return null;

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h3>Заявка на регистрацию для мероприятия</h3>
                    <button onClick={onClose}>
                        <img src={close} alt="close-button"/>
                    </button>
                </div>
                <div className={styles.modal_list}>
                    <InputField name="Тип мероприятия" value={formData.type} required={true}
                                onChange={handleChange('type')} placeholder="Выберете тип мероприятия"/>
                    <InputField name="ФИО" value={formData.fullName} required={true} onChange={handleChange('fullName')}
                                placeholder="Введите ФИО"/>
                    <InputField name="Имейл" value={formData.email} required={true} onChange={handleChange('email')}
                                placeholder="Введите имейл"/>
                    <InputField name="Номер телефона" value={formData.telephone} required={true}
                                onChange={handleChange('telephone')} placeholder="+ 7 777 77 77"/>
                    <div className={styles.friends}>
                        {formData.friends.map(friend => (
                            <div key={friend.id} className={styles.friends_block}>
                                <button
                                    onClick={() => removeFriend(friend.id)}
                                    className={styles.friends_remove_btn}
                                >
                                    <img src={close} alt="close-button"/>
                                </button>

                                <InputField
                                    name="ФИО"
                                    value={friend.name}
                                    onChange={handleFriendChange(friend.id, 'name')}
                                />

                                <InputField
                                    name="Имейл"
                                    value={friend.email}
                                    onChange={handleFriendChange(friend.id, 'email')}
                                />

                                <InputField
                                    name="Телефон"
                                    value={friend.phone}
                                    onChange={handleFriendChange(friend.id, 'phone')}
                                />
                            </div>
                        ))}

                        {formData.friends.length < 3 && (
                            <button onClick={addFriend} className={styles.friends_add_btn}>
                                <img src={add} alt="Add Friend"/>
                                <span>Добавить друга</span>
                            </button>
                        )}
                    </div>
                    <div className={inputStyles.input_field}>
                        <label htmlFor="preferredContacts" className={inputStyles.input_label}>
                            Предпочитаемый вид связи
                            <span style={{color: "rgba(138, 143, 168, 1)"}}> *</span>
                        </label>
                        <select value={formData.preferredContact ?? ''}
                                id="preferredContacts"
                                onChange={(e) => {
                                    const value = e.target.value as PreferredContact;
                                    setFormData(prev => ({ ...prev, preferredContact: value }));
                                }}
                                className={inputStyles.input}
                                required={true}>
                            {contactOptions.map((option) => (
                                <option key={option.value ?? 'placeholder'}
                                        value={option.value ?? ''}
                                        disabled={option.value === null}
                                        hidden={option.value === null}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.modal_footer}>
                    <button>Назад</button>
                    <button>Дальше</button>
                </div>
            </div>
        </div>
    )
}
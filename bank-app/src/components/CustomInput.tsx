import React, { ChangeEvent } from "react";
import Form from 'react-bootstrap/Form';

interface IInputProps {
    label: string;
    value?: string | number | undefined;
    onChange: (ev: ChangeEvent) => void;
    name: string;
    min?: number;
    type?: string;
    placeholder?: string;
    isValid?: boolean;
    isInvalid?: boolean;
    styles?: string
}

const CustomInput: React.FC<IInputProps> = ({label, value, onChange,name, min, type, placeholder, isValid, isInvalid, styles }) => {

    return (
        <Form.Group controlId={name} className={styles}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                isValid={isValid}
                min={min}
                placeholder={placeholder}
                isInvalid={isInvalid}
                data-testid={name}
            />

            <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>);
}

export default CustomInput;

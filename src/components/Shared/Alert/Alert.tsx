import { ReactNode } from "react";
import './Alert.css';

export interface AlertProps {
    children: ReactNode;
    type: "default" | "pikachu" | "diablo"
}

const Alert = (props: AlertProps) => {
    return (
        <p className={"alert alert-"+props.type}>{props.children}</p>
    )
}

export default Alert;
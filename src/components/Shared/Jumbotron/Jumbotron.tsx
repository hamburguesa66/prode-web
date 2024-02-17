import './Jumbotron.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from 'react';

export interface JumbotronProps {
    title: string;
    icon: IconProp;
    children: ReactNode | undefined;
}

const Jumbotron = (props: JumbotronProps) => {
    return (
        <>
            <h1><FontAwesomeIcon icon={props.icon} /> {props.title}</h1>
            {props.children && <p>{props.children}</p>}
        </>
    )
}

export default Jumbotron;
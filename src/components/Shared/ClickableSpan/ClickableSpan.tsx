import { ReactNode } from "react";
import './ClickableSpan.css';

export interface ClickableSpanProps {
    children: ReactNode,
    onClick: () => any;
}

const ClickableSpan = (props: ClickableSpanProps) => {
    return (
        <span className="clickable-span" onClick={props.onClick}>
            {props.children}
        </span>
    )
}

export default ClickableSpan;
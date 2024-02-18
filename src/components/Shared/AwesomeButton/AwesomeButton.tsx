import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface AwesomeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    loading?: boolean;
}

const AwesomeButton = (props: AwesomeButtonProps) => {
    return (
        <button type="button" {... props}>
            {props.loading ? (
                <>
                    <FontAwesomeIcon icon="spinner" spin />
                </>
            ) : (
                <>{props.children}</>
            )}
        </button>
    )
}

export default AwesomeButton;
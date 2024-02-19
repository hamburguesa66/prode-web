import React, { useState } from "react";
import './SearchInput.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AwesomeButton from "../../../components/Shared/AwesomeButton/AwesomeButton";

export interface SearchInputProps {
    loading?: boolean;
    disabled?: boolean;
    onSearch: (query: string) => void;
}

const SearchInput = (props: SearchInputProps) => {
    const [query, setQuery] = useState<string>("");

    const changeQuery = (e: React.FormEvent<HTMLInputElement>): void => {
        setQuery(e.currentTarget.value);
    };

    return (
        <div className="search-input-container">
            <div>
                <input 
                    placeholder="Ingrese al menos 3 caracteres ..." 
                    type="text" 
                    value={query} 
                    onChange={changeQuery}
                    readOnly={props.loading || props.disabled} />
            </div>
            <div>
                <AwesomeButton
                    loading={props.loading} 
                    disabled={props.disabled || query.length < 3} 
                    onClick={() => props.onSearch(query)}>
                        <FontAwesomeIcon icon="magnifying-glass" />
                </AwesomeButton>
            </div>
        </div>
    )
}

export default SearchInput;
import { useState } from "react";
import Modal from "react-responsive-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from '../../../model/User';
import UserSelector from '../../../components/Shared/UserSelector';
import AwesomeButton from '../../../components/Shared/AwesomeButton/AwesomeButton';

interface FaceToFaceSearchInputProps {
    disable: boolean;
    onSearch: (userA: User, userB: User) => any
}

const FaceToFaceSearchInput = (props: FaceToFaceSearchInputProps) => {

    const [userA, setUserA] = useState<User>();
    const [userB, setUserB] = useState<User>();

    const [userASelectorOpen, setUserASelectorOpen] = useState<boolean>(false);
    const [userBSelectorOpen, setUserBSelectorOpen] = useState<boolean>(false);

    const selectUserA = (user: User) => {
        setUserA(user);
        setUserASelectorOpen(false);
    }

    const selectUserB = (user: User) => {
        setUserB(user);
        setUserBSelectorOpen(false);
    }

    const searchBtnDisabled = !userA || !userB || props.disable;

    return (
        <>
            <Modal
                open={userASelectorOpen}
                onClose={() => setUserASelectorOpen(false)}
                center>
                <UserSelector title="Seleccionar Usuario A" onSelect={selectUserA} />
            </Modal>

            <Modal
                open={userBSelectorOpen}
                onClose={() => setUserBSelectorOpen(false)}
                center>
                <UserSelector title="Seleccionar Usuario B" onSelect={selectUserB} />
            </Modal>

            <div className="flex-container flex-container-input">
                <div>
                    <input type="text" value={userA?.name || "Nadie"} readOnly={true} />
                </div>
                <div>
                    <AwesomeButton className="full-width" onClick={() => setUserASelectorOpen(true)}>
                        <FontAwesomeIcon icon="pen-to-square" />
                    </AwesomeButton>
                </div>
            </div>
            <div className="flex-container flex-container-input">
                <div>
                    <input type="text" value={userB?.name || "Nadie"} readOnly={true} />
                </div>
                <div>
                    <AwesomeButton className="full-width" onClick={() => setUserBSelectorOpen(true)}>
                        <FontAwesomeIcon icon="pen-to-square" />
                    </AwesomeButton>
                </div>
            </div>
            <div className="flex-container flex-container-input">
                <select className="full-width" defaultValue={10} disabled={true}>
                    <option value={10} selected>&Uacute;ltimos 10 partidos</option>
                </select>
            </div> 

            <AwesomeButton className="full-width" disabled={searchBtnDisabled} onClick={() => props.onSearch(userA!,userB!)}>
                <FontAwesomeIcon icon="magnifying-glass" />
            </AwesomeButton>
        </>
    )
}

export default FaceToFaceSearchInput;
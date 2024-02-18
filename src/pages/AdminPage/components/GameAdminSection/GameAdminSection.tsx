import { useEffect, useState } from "react";
import { Game } from "../../../../model/Game";
import useAxios from "../../../../hooks/useAxios";
import CondensedGameTable from "./CondensedGameTable";
import Modal from "react-responsive-modal";
import DeleteGameForm from "./DeleteGameForm";
import CloseGameForm from "./CloseGameForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GameAdminSection = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game>();
    const [isDeleteFormOpen, setDeleteFormOpen] = useState<boolean>(false);
    const [isCloseFormOpen, setCloseFormOpen] = useState<boolean>(false);

    const { response, loading } = useAxios({
        lazy: false,
        method: "GET",
        url: `/game`,
        data: undefined
    });

    useEffect(() => {
        if (response?.data) {
            setGames(response.data as Game[]);
        }
    }, [response]);

    const showDeleteGameForm = (game: Game) => {
        setSelectedGame(game);
        setDeleteFormOpen(true);
    }

    const showCloseGameForm = (game: Game) => {
        setSelectedGame(game);
        setCloseFormOpen(true);
    }

    const handleSuccessfullyDelete = () => {
        setGames(games.filter(it => it.id !== selectedGame!.id));
        setSelectedGame(undefined);
        setDeleteFormOpen(false);
    }

    const handleSuccessfullyClose = (game: Game) => {
        setGames(games.map(it => {
            if (it.id === game.id) { return game } else { return it }
        }
        ));
        setSelectedGame(undefined);
        setCloseFormOpen(false);
    }
    return (
        <>
            <h3><FontAwesomeIcon icon="bell" /> Partidos que requieren atenci&oacute;n</h3>
            <p>Partidos pendientes de carga de resultado o pendientes de c&oacute;mputo (para el ranking).</p>
            {selectedGame && <>
                <Modal
                    open={isDeleteFormOpen}
                    onClose={() => setDeleteFormOpen(false)}
                    showCloseIcon={false}
                    closeOnOverlayClick={false}
                    closeOnEsc={false}
                    center>
                    <DeleteGameForm
                        game={selectedGame}
                        onCancel={() => setDeleteFormOpen(false)}
                        onSuccess={handleSuccessfullyDelete}
                        onError={() => setDeleteFormOpen(false)}
                    />
                </Modal>
                <Modal
                    open={isCloseFormOpen}
                    onClose={() => setCloseFormOpen(false)}
                    showCloseIcon={false}
                    closeOnOverlayClick={false}
                    closeOnEsc={false}
                    center>
                    <CloseGameForm
                        game={selectedGame}
                        onCancel={() => setCloseFormOpen(false)}
                        onSuccess={handleSuccessfullyClose}
                        onError={() => setCloseFormOpen(false)}
                    />
                </Modal>
            </>}
            <CondensedGameTable
                games={games}
                loading={loading}
                onDelete={showDeleteGameForm}
                onClose={showCloseGameForm}
            />
        </>
    )
}

export default GameAdminSection;
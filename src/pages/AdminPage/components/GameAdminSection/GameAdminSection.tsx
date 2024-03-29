import { useEffect, useState } from "react";
import { Game } from "../../../../model/Game";
import useAxios from "../../../../hooks/useAxios";
import CondensedGameTable from "./CondensedGameTable";
import Modal from "react-responsive-modal";
import DeleteGameForm from "./DeleteGameForm";
import CloseGameForm from "./CloseGameForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Page } from "../../../../model/Page";

const GameAdminSection = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game>();
    const [isDeleteFormOpen, setDeleteFormOpen] = useState<boolean>(false);
    const [isCloseFormOpen, setCloseFormOpen] = useState<boolean>(false);

    const { response, loading } = useAxios({
        lazy: false,
        method: "GET",
        url: `/game/list?page=0&size=25&sortOrder=DESC&state=IN_PROGRESS`,
        data: undefined
    });

    useEffect(() => {
        if (response?.data) {
            const page = response.data as Page<Game>;
            setGames(page.data);
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
            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec egestas ultrices posuere. Quisque fringilla consectetur velit, a vestibulum massa ullamcorper dictum.</p>
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
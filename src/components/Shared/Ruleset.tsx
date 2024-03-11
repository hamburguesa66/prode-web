import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProdeLogo from "./ProdeLogo";
import Alert from "./Alert/Alert";

const Ruleset = () => {
    return (
        <div>
            <p>El objetivo del {<ProdeLogo />} es acumular la mayor cantidad de <strong>puntos</strong> en base al acierto de <strong>pron&oacute;sticos</strong> (apuestas) de partidos de f&uacute;tbol.</p>

            <p>
                Dado un partido, el participante puede apostar por alguno de estos tres resultados:
                <ul>
                    <li>Gana Local</li>
                    <li>Gana Visitante</li>
                    <li>Empate</li>
                </ul>
            </p>

            <p>Si el jugador <strong>acierta</strong> el resultado, <strong>gana 3 (tres) puntos</strong>.</p>
            <ul className="fa-ul">
                <li><span className="fa-li"><FontAwesomeIcon icon="minus"/></span>No se tiene en cuenta el tiempo extra o penales: <strong>el resultado que vale es el de los 90 minutos</strong>.</li>
                <li><span className="fa-li"><FontAwesomeIcon icon="minus"/></span><strong>El participante tiene hasta comenzado el partido para pronosticar el resultado</strong>, de lo contrario, una vez comenzado el partido, no podr&aacute; colocar resultados y por lo tanto no obtendr&aacute; puntos. <br /> <small>La apuesta se puede cambiar hasta comenzado el partido.</small></li>
            </ul>

            <p>Los partidos y resultados son cargados <strong>manualmente</strong> por el administrador (cuando tenga ganas).</p>
            <ul className="fa-ul">
                <li><span className="fa-li"><FontAwesomeIcon icon="minus"/></span>Los d&iacute;as de carga son los jueves (partidos de fin de semana) y domingo (partidos de entre semana).</li>
                <li><span className="fa-li"><FontAwesomeIcon icon="minus"/></span>Por lo tanto, los viernes y lunes por la ma&ntilde;ana se ofrecer&aacute;n nuevos partidos para apostar.</li>
            </ul>
        </div >
    )
}

export default Ruleset;
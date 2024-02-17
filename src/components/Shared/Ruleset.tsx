import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProdeLogo from "./ProdeLogo";

const Ruleset = () => {
    return (
        <div>
            <p>El objetivo del {<ProdeLogo/>} es acumular la mayor cantidad de <strong>puntos</strong> en base al acierto de <strong>pron&oacute;sticos</strong> (apuestas) de partidos de f&uacute;tbol.</p>

            <hr/>

            <p>
                Dado un partido, el participante puede apostar por alguno de estos tres resultados:
                <ul>
                    <li>Gana Local</li>
                    <li>Gana Visitante</li>
                    <li>Empate</li>
                </ul>
            </p>

            <p>Si el jugador <strong>acierta</strong> el resultado, <strong>gana 3 (tres) puntos</strong>.</p>

            <hr/>

            <p><FontAwesomeIcon icon="circle-exclamation" /> No se tiene en cuenta el tiempo extra o penales: <strong>el resultado que vale es el de los 90 minutos</strong>.</p>

            <p><FontAwesomeIcon icon="circle-exclamation" /> <strong>El participante tiene hasta comenzado el partido para pronosticar el resultado</strong>, de lo contrario, una vez comenzado el partido, no podr&aacute; colocar resultados y por lo tanto no obtendr&aacute; puntos. <br/> <small>La apuesta se puede cambiar hasta comenzado el partido.</small></p>
        
            <hr/>

            <p>Los partidos y resultados son cargados manualmente por el administrador.</p>

            <p>Los d&iacute;as de carga son los jueves (partidos de fin de semana) y domingo (partidos de entre semana). Por lo tanto, los viernes y lunes por la ma&ntilde;ana deber&iacute;a haber nuevos partidos para apostar.</p>
        </div >
    )
}

export default Ruleset;
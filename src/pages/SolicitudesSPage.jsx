import React,{useState, useEffect} from 'react';

//import NavigationComponent from '../components/NavigationComponent';
import { Table, Col } from 'reactstrap';
import solicitudesSService from '../services/solicitudesS.services';

const SolicitudesSPage = () => {

    const [solicitudesS, setSolicitudesS] = useState([]);
    useEffect(() => {
        solicitudesSService.getSolicitudesS().then(res =>{
            setSolicitudesS(res.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    
const solicitudesSItems = solicitudesS.map((solicitudesS) =>
  <tr key={solicitudesS.id}>
        <td> {solicitudesS.id} </td>
        <td> {solicitudesS.idPaciente} </td>
        <td> {solicitudesS.descripcion}</td>
        <td>
            <button onClick={(event) => {
                event.preventDefault();
                solicitudesSService.deleteSolicitudesS(solicitudesS.id);
                window.location.reload();
            }} className="btn btn-danger"
            >
                Eliminar
            </button>
        </td>
  </tr>
);
    return(
        <div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
                integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
                crossOrigin="anonymous"></link>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <td> id </td>
                                <td> idPaciente </td>
                                <td> Descripcion </td>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudesSItems}
                        </tbody>
                    </Table>
                </Col>
        </div>
    )
}

export default SolicitudesSPage;
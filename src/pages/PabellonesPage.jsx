import React, { useState, useEffect } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";

import pabellonesService from '../services/pabellones.services';

const PabellonesPage = () => {

    const [pabellones, setPabellones] = useState([]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        pabellonesService.getPabellones().then(res => {
            setPabellones(res.data);
        }).catch(error => {
            console.log(error);
        });
    }, [pabellones]);

    const handleClickOpen = (event) => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };


    const pabellonesItems = pabellones.map((pabellon) =>
        <tr key={pabellon.id}>
            <td>{pabellon.nombre ?? "no informado"}</td>
            <td>{pabellon.ubicacion ?? "no informado"}</td>
            <td>{pabellon.capacidad ?? "no informado"}</td>
            <td>{pabellon.estado ?? "no asignado"}</td>
            <td>
                <button class="btn btn-warning" onClick={handleClickOpen} >
                    Editar
                </button>
            </td>
            <td>
                <button 
                    onClick={(event) => {
                        event.preventDefault();
                        pabellonesService.deletePabellonesById(pabellon.id);
                    }}
                    class="btn btn-danger"
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
    return (
        <div class="col-12">
            <h1>Pabellones - <button class="btn btn-primary mb-2" onClick={(event) => handleClickOpen(event)}>Agregar</button>
            </h1>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Ubicacion</th>
                        <th>Capacidad</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {pabellonesItems}
                </tbody>
            </table>
            <AddPabellon open={open} onClose={(event) => handleClose(event)} />
        </div>
    )
}

function AddPabellon(props) {
    const { onClose, selectedValue, open} = props;
    const [nombre, setNombre] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [disponible, setDisponible] = React.useState("disponible");

    const disponibilidad = [
        {
          value: "prestado",
          label: "prestado",
        },
        {
          value: "disponible",
          label: "disponible",
        },
      ];

    const handleChange = (event) => {
        const keyname = event.target.name;
        switch(keyname){
            case "nombre":
                setNombre(event.target.value);
                break;
            case "ubicacion":
                setUbicacion(event.target.value);
                break;
            case "capacidad":
                setCapacidad(event.target.value);
                break;
            case "estado":
                setDisponible(event.target.value);
                break;
            default:
                setDisponible(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        pabellonesService.createPabellones(nombre, ubicacion, capacidad, disponible)
        onClose(selectedValue);
    };

    const handleClose = (event) => {
        onClose(selectedValue);
    };

    return (
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <DialogTitle id="simple-dialog-title">Agregar pabellón</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Completar los campos para agregar un nuevo pabellón.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nombre"
              key="nombre"
              name="nombre"
              label="Nombre"
              fullWidth
              onChange={(event) => handleChange(event)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="ubicacion"
              key="ubicacion"
              name="ubicacion"
              label="ubicacion"
              onChange={(event) => handleChange(event)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="capacidad"
              key="capacidad"
              name="capacidad"
              label="capacidad"
              fullWidth
              onChange={(event) => handleChange(event)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="estado"
              name="estado"
              select
              fullWidth
              label="Estado"
              value={disponible}
              onChange={(event) => handleChange(event)}
            >
              {disponibilidad.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <button
              onClick={(event) => handleClose(event)}
              className="btn btn-danger"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="btn btn-primary mb-2"
            >
              Agregar
            </button>
          </DialogActions>
        </Dialog>
      );
}

export default PabellonesPage;
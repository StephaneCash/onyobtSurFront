import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./Client.css"
import Leftbar from '../Leftbar';
import Navbar from '../Navbar';
import { Person } from '@material-ui/icons';
import ElementsBase from "../../base/ElementsBase"
import { NavLink, useNavigate, useLocation } from 'react-router-dom';



function AddClient() {

    const url = ElementsBase && ElementsBase.url;

    const initialiseValues = {
        id: "", nom: "", postnom: '', prenom: "", age: "", sexe: "", poids: "", numTel: "", etatCivile: "",
        email: "", adresse: "", isAbonne: "0",
    };
    const [formData, setFormData] = useState(initialiseValues);

    const [clicBtn, setClicBtn] = useState(false);
    const navigate = useNavigate();


    const changeValue = (e) => {
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
        console.log(id, value);
    }

    const submitData = () => {
        setClicBtn(true);

        axios.post(url + "clients", formData)
            .then(resp => {
                console.log(resp.data)
                navigate('/clients');
                setClicBtn(false);
            })
            .catch(err => {
                console.log(err)
                setClicBtn(false);
            })
    }


    return (
        <div>
            <Navbar />
            <div className='d-flex main'>
                <div className='col-sm-2'>
                    <Leftbar />
                </div>
                <div className='col-sm-10'>
                    <div className='getAllClients' style={{ paddingTop: "1rem", paddingRight: "1rem" }}>
                        <h4 style={{ color: "#fff" }}>
                            Ajout d'un nouveau client <Person />
                        </h4>

                        <div className='addClient'>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <input type="text" id="nom" onChange={changeValue} className='form-control' placeholder='Nom' /> <br />
                                    <input type="text" id="postnom" onChange={changeValue} className='form-control' placeholder='Postnom' /><br />
                                    <input type="text" id="prenom" onChange={changeValue} className='form-control' placeholder='Pr??nom' /><br />
                                    <select id="sexe" onChange={changeValue} className="form-control">
                                        <option value="">--Sexe--</option>
                                        <option value="M">Masculin</option>
                                        <option value="F">F??minin</option>
                                    </select>
                                </div>

                                <div className='col-sm-4'>
                                    <input type="number" id="age" onChange={changeValue} className='form-control' placeholder='Age' /><br />
                                    <input type="number" className='form-control' id="poids" onChange={changeValue} placeholder='Poids' /><br />
                                    <input type="text" className='form-control' id="numTel" onChange={changeValue} placeholder='Num??ro de t??l??phone' /> <br />
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="email" onChange={changeValue} placeholder="name@example.com" /><br />
                                    </div>

                                </div>

                                <div className='col-sm-4'>
                                    <select id="etatCivile" onChange={changeValue} className="form-control">
                                        <option value="">--Etat Civile--</option>
                                        <option value="Mari??">Mari??(e)</option>
                                        <option value="C??libataire">C??libataire</option>
                                        <option value="Secret">Ne pr??f??re rien dire</option>
                                    </select><br />
                                    <div className="form-group">
                                        <textarea className="form-control" id="adresse" onChange={changeValue} rows="3" placeholder='Adresse compl??te'></textarea>
                                    </div>
                                </div>
                                <button className='btn btnAjout' onClick={submitData}>
                                    {clicBtn ? <i className='fa fa-spinner fa-pulse'></i> : "Ajouter"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddClient
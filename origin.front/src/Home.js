import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import Swal from 'sweetalert2'

const Home = () => {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const verifyNumber = async () => {
    let numberCard = number.split('-').join(''); 
    const res = Axios.post(`https://localhost:7208/api/card/verify/number`, { number: numberCard });
    return await res;
  }

  const onClick = () => {
    const regNumberCard = /^[0-9]{3,4}(-[0-9]{3,4})?(-[0-9]{3,4})?(-[0-9]{3,4})?$/;
    if (!regNumberCard.test(number)) {
      Swal.fire({
        icon: 'error',
        title: 'Tarjeta obligatoria',
        text: 'Solo se permiten digitos.'
      });
      return;
    }
    if (number.length !== 19) {
      Swal.fire({
        icon: 'error',
        title: 'Tarjeta obligatoria',
        text: 'Consta de 16 digitos numericos.'
      });
      return;
    }
    verifyNumber()
      .then(response => {
        navigate(`/${response.data.id}`);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error Tarjeta',
          text: `${error.response.data.msj}`
        });
      })
  }

  const OnChange = (event) => {
    const inputLength = event.target.value.length;
    if (inputLength === 20) {
      return false;
    }
    let input = number;
    if (inputLength === 5 || inputLength === 10 || inputLength === 15) {
      input += "-";
      setNumber(input);
    } else {
      setNumber(event.target.value);
    }
  }

  const resetNumberCard = () => {
    setNumber("");
  }

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ width: "100vw", height: "100vh" }}>
      <div>
        <label htmlFor="card" className="form-label">Number Card</label>
        <input type='text' className="form-control" id="card" placeholder="1111-1111-1111-1111" onChange={OnChange} value={number} />
        <div className='mt-2'>
          <button type="button" className="btn btn-primary" style={{ marginRight: "15px" }} onClick={onClick}>Aceptar</button>
          <button type="button" className="btn btn-secondary" onClick={resetNumberCard}>Limpiar</button>
        </div>
      </div>
    </div>
  )
}

export default Home;
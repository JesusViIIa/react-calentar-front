import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import  Swal  from 'sweetalert2';
import { startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
export const RegisterScreen = () => {
    const dispatch = useDispatch()
    const [ registerValues, handleInputRegisterChange] = useForm({rname:'',remail: '', rpassword1:'', rpassword2:''})

    const {rname,remail, rpassword1, rpassword2} = registerValues
     const handleRegister = (e) => { 
        e.preventDefault()
        if(!rname || !remail || !rpassword1 || !rpassword2) return Swal.fire('Error','Todos los campos son obligatorios', 'error')

        if (rpassword1!==rpassword2){
            return Swal.fire('error','Las contraseñas no coinciden', 'error')
        }

        dispatch(startRegister(rname,rpassword1,remail))
     }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col login-form-1">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rname"
                value={rname}
                onChange={handleInputRegisterChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="remail"
                value={remail}
                onChange={handleInputRegisterChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rpassword1"
                value={rpassword1}
                onChange={handleInputRegisterChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rpassword2"
                value={rpassword2}
                onChange={handleInputRegisterChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
            <Link className="ForgetPwd" to='/auth/login'>Do you have an account? Login </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

import { Link } from "react-router-dom";
import '../../styles/login.css';
import { useForm } from './../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from './../../actions/auth';


export const LoginScreen = () => {
    const dispatch = useDispatch()
    const [ loginValues, handleInputLoginChange] = useForm({lemail: '', lpassword:''})
    const {lemail, lpassword} = loginValues
    const handleLogin = (e) => { 
        e.preventDefault()
        dispatch(startLogin(lemail,lpassword))
     }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                onChange = {handleInputLoginChange}
                                name='lemail'
                                value={lemail}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='lpassword'
                                value={lpassword}
                                onChange = {handleInputLoginChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                        <Link className="ForgetPwd" to='/auth/register'>Create an account</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "@inertiajs/react";

export default function AppLayout({user, children}){


    return (

        <div className="container ">
            <div className="row">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/dashboard">Knygų rezervacijos sistema</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" href={route('category.index')}>Kategorijos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" href={route('book.index')}>Knygos</Link>
                                </li>

                            </ul>
                        </div>
                        {user==null ?
                            <div className="float-end">
                                <Link className="btn btn-primary mr-3 "  href={ route("login")} >     	Prisijungti</Link>
                                &nbsp;
                                <Link className="btn btn-secondary "  href={ route("register")} >	Registruotis</Link>                        </div>
                                :
                            <div className="float-end">
                                <span >Jūs esate prisijungęs kaip: <b>{user.name} ({user.type==1?"administratorius":"skaitytojas"})</b> </span>
                                <Link className="btn btn-warning " href={route('logout')} method="post" >Atsijungti</Link>                        </div>
                        }
                        </div>
                </nav>
                <div className="d-flex row col-md-12 justify-content-center">
                    {children}
                </div>
            </div>
        </div>
        )






}

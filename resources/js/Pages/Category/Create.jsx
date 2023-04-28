import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";
import {useForm} from "@inertiajs/react";

export default function Create(props){

    const user=props.auth.user;

    const {data, setData, post, errors, setError, clearErrors}=useForm({
        name: '',
    });

    const [isDirtyField, setDirtyField]=useState({
        name: false,

    });

    const [sent, setSent]=useState(false);

    const validate=()=> {
        if (isDirtyField.name) {
            if (data.name) {
                clearErrors("name");
            } else {
                setError("name", 'Kategorijos pavadinimas yra privalomas')
            }
        }
    }


    const handleChange=(event)=>{
        data [event.target.id]=event.target.value;
        validate();
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        post( route("category.store"));
        setSent(true);
    }

    const handleBlur=(event)=>{
        isDirtyField[event.target.id]=true;
        setDirtyField({
            ...isDirtyField,
            [event.target.id]:true
        });
        validate();
    }


    return (
        <AppLayout
            user={user}>
            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">Naujas</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Kategorija</label>
                                <input className={"form-control" + (errors.name!=null?" is-invalid " :"")} type="text" id="name" onChange={handleChange} onBlur={handleBlur} value={data.name} />
                                <div className="invalid-feedback">
                                    { errors. name}
                                </div>
                            </div>
                            <button className="btn btn-success">Pridėti</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

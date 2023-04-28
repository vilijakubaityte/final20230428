import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";
import {useForm} from "@inertiajs/react";

export default function Create(props){

    const user=props.auth.user;

    const {data, setData, post, errors, setError, clearErrors}=useForm({
        title: '',
        summary: '',
        ISBN: '',
        pages: '',
        picture:null,
        category_id: null
    });

    const [isDirtyField, setDirtyField]=useState({
        title: false,
        summary: false,
        ISBN: false,
        pages: false,
        picture:false,
        category_id: false
    });

    const [sent, setSent]=useState(false);

    const validate=()=> {
        if (isDirtyField.title) {
            if (data.title) {
                clearErrors("title");
            } else {
                setError("title", 'Knygos pavadinimas yra privalomas')
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
        post( route("book.store"));
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

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const categoryList= [];
    categoryList.push(<option key={0} value="">-</option>);
    props.category.forEach((category)=>{
        categoryList.push(<option key={category.id} value={category.id}>{category.name}</option>)
    });


    return (
        <AppLayout
            user={user}>
            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">Pridėti naują knygą</div>
                    <div className="card-body">
                        <form  onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Pavadinimas</label>
                                <input className={"form-control" + (errors.title!=null?" is-invalid " :"")} type="text" id="title" onChange={handleChange} onBlur={handleBlur} value={data.title} />
                                <div className="invalid-feedback">
                                    { errors. title}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Santrauka</label>
                                <input className={"form-control" + (errors.summary!=null?" is-invalid " :"")} type="text" id="summary" onChange={handleChange} onBlur={handleBlur} value={data.summary} />
                                <div className="invalid-feedback">
                                    { errors. summary}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">ISBN</label>
                                <input className={"form-control" + (errors.ISBN!=null?" is-invalid " :"")} type="text" id="ISBN" onChange={handleChange} onBlur={handleBlur} value={data.ISBN} />
                                <div className="invalid-feedback">
                                    { errors. ISBN}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Puslapiai</label>
                                <input className={"form-control" + (errors.pages!=null?" is-invalid " :"")} type="text" id="pages" onChange={handleChange} onBlur={handleBlur} value={data.pages} />
                                <div className="invalid-feedback">
                                    { errors. pages}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nuotrauka</label>
                                <input type="file" id="picture" className="form-control" onChange={(event)=>{
                                setData({
                                    ...data,
                                    picture:event.target.files[0]
                                });
                                }} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Kategorija</label>
                                <select id="category_id" className={"form-control" + (errors.category_id!=null?" is-invalid " :"")} onChange={handleChange} onBlur={handleBlur} value={data.category_id}>
                                    <div className="invalid-feedback">
                                        { errors. category_id}
                                    </div>
                                    {categoryList}
                                </select>
                            </div>
                            <button className="btn btn-success">Pridėti</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

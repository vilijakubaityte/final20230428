import AppLayout from "@/Layouts/AppLayout";
import {Link, router, useForm} from "@inertiajs/react";
import {useState} from "react";


export default function Edit(props){
    const user=props.auth.user;


    const {data, setData, put, post}=useForm(props.book)

    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        router.post(route("book.update", data.id), {
            ...data,
            _method: 'put',
        });
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
                    <div className="card-header">Redaguoti</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Pavadinimas</label>
                                <input className="form-control" type="text" id="title" onChange={handleChange} value={data.title} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Santrauka</label>
                                <input className="form-control" type="text" id="summary" onChange={handleChange} value={data.summary} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">ISBN</label>
                                <input className="form-control" type="text" id="ISBN" onChange={handleChange} value={data.ISBN} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Puslapiai</label>
                                <input className="form-control" type="text" id="pages" onChange={handleChange} value={data.pages} />
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
                                <label className="form-label">Penki</label>
                                <select id="category_id" className="form-select" onChange={handleChange} value={data.category_id}>
                                    {categoryList}
                                </select>
                            </div>
                            <button className="btn btn-success">Atnaujinti</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

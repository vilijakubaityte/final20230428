import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";

export default function Index(props){
    const user=props.auth.user;

    const editBook=props.can.editBook;


    const bookList = [];

    const [filter, setFilter]=useState({
        title:props.filter.title
    });

    const handleDelete=(event)=>{
        router.delete(route("book.destroy", event.target.value));
    }

    const handleChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        });
    }

    const handleFilter=()=>{
        router.post( route("book.filter"), filter);
    }

    const handleClear = () => {
        setFilter({
            title: ''
        });
        handleFilter();
    };

    const contains=(userId,users)=>{
        let result=false;
        users.forEach( (user)=>{
            if (user.id==userId){
                result = true;
            }
        })
        return result;
    }





    props.book.forEach((book)=> {
        bookList.push
        (<tr key={book.id}>
            <td>
                {book.picture && <img alt="Knygos nuotrauka" width="150px" src={'/storage/book/'+book.picture} />}
            </td>
            <td>{book.title}</td>
            <td>{book.summary}</td>
            <td>{book.ISBN}</td>
            <td>{book.pages}</td>
            <td>{book.category.name}</td>

            <td>{book.users.map((user) => (
                <span key={user.id}>{user.name} </span>
            ))}</td>

            <td className="text-center">
                {
                    user.type !== 1 && contains(user.id, book.users) && (
                        <Link className="btn btn-secondary" href={route('book.attend', [book.id, (user!=null?user:'')])}>išimti</Link>
                    )}
                {
                    user.type !== 1 && !contains(user.id, book.users) && (
                        <Link className="btn btn-secondary" href={route('book.attend', [book.id, (user!=null?user:'')])}>Į norų sąrašą</Link>
                    )}
            </td>
            <td className="text-center">
                {editBook && <Link className="btn btn-primary" href={route("book.edit", book.id)}>Redaguoti</Link>}
            </td>
            <td className="text-center">
                {editBook && <button className="btn btn-danger" onClick={handleDelete} value={book.id}>Ištrinti</button>}
            </td>
        </tr>)

    });




    return (

        <AppLayout
            user={user}>
            <div className="mt-5">
                <div className="card">
                    <div className="card-header text-center fs-3">Knygų sąrašas</div>
                    <div className="card-body">
                        {user.type !== 1 ? (
                        <div className="col-md-6">
                                    <>
                            Ieškoti pagal knygos pavadinimą:
                            <input id="title" className="form-control" type="text" value={filter.title} onChange={handleChange}/>
                        <button className="btn btn-success mt-3 px-5 text-center" onClick={handleFilter}>Filtruoti</button>
                        &nbsp;
                        <button className="btn btn-secondary mt-3 px-5 text-center" onClick={handleClear}>Išvalyti paiešką</button>
                                </>
                            </div>
                                )
                                : null }


                        {editBook && <Link className="btn btn-success float-end mb-4" href={ route("book.create") }>Pridėti naują</Link>}
                        <div className="table-responsive">
                        <table className="table my-4">
                            <thead>
                            <th>Nuotrauka</th>
                            <th>Pavadinimas</th>
                            <th>Santrauka</th>
                            <th>ISBN</th>
                            <th>Puslapiai</th>
                            <th>Kategorija</th>
                            <th>Mėgsta</th>
                            <th colSpan="2" className="text-center">Veiksmai</th>
                            </thead>
                            <tbody>
                            {bookList}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>



        </AppLayout>
    )

}

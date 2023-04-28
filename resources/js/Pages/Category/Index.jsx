import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";

export default function Index(props){

    const user=props.auth.user;
    const editBook=props.can.editBook;

    const categoryList = [];

    const handleDelete=(event)=>{
        router.delete(route("category.destroy", event.target.value));
    }

    props.categories.forEach((category)=> {
        categoryList.push
        (<tr key={category.id}>
            <td>{category.name}</td>
            <td className="text-center">
                {editBook && <Link className="btn btn-primary" href={route("category.edit", category.id)}>Redaguoti</Link>}
             </td>
             <td className="text-center">
                 {editBook && <button className="btn btn-danger" onClick={handleDelete} value={category.id}>Ištrinti</button>}
           </td>
         </tr>)
    });


    return (

        <AppLayout
            user={user}>
            <div className="col-md-8 mt-5">
                <div className="card">
                    <div className="card-header text-center fs-3">Kategorijų sąrašas</div>
                    <div className="card-body">
                        {editBook && <Link className="btn btn-success float-end mb-4" href={ route("category.create") }>Pridėti naują kategoriją</Link>}
                        <table className="table">
                            <thead>
                            <th>Kategorijos</th>
                            { user.type === 1 &&
                                <th colSpan="2" className="text-center">Veiksmai</th>
                            }
                            </thead>
                            <tbody>
                            {categoryList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </AppLayout>
    )

}

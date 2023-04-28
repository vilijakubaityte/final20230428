import AppLayout from "@/Layouts/AppLayout";

export default function Second(props){

    const user=props.auth.user;


    return (

        <AppLayout
            user={user}>
            <div className="col-md-8 mt-5">
                <div className="card fs-2 text-center m-5 p-5">
                    Sveiki {user.name}, Jūs esate prisijungęs!
                </div>



            </div>
        </AppLayout>
    )

}

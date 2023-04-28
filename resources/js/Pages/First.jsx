import AppLayout from "@/Layouts/AppLayout";

export default function First(props){


    return (

        <AppLayout>
            <div className="col-md-8 mt-5">
                <div className="card mt-5">
                    <div className="card-header fs-2 text-center">Sveiki atvykę!</div>
                    <div className="card-body text-center m-5 fs-5">
                        Norėdami matyti informaciją, kuri yra sistemoje, turite prisijungti arba užsiregistruoti!
                    </div>
                </div>
            </div>
        </AppLayout>
    )

}

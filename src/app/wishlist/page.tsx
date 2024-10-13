import Link from 'next/link';
import Sidebar from './SideBar';
import FavoriteBooks from './FavoriteBooks';
const baseUrl = process.env.BASE_URL;

export default async function Dashboard(
    {
        searchParams
    }: {
        searchParams?: {
            name?: string;
            lastname?: string;
            login_id?: string;
        };
    }
) {
    const urlPerson = `${baseUrl}/persons?first_name=${searchParams?.name}&last_name=${searchParams?.lastname}`

    const responsePerson = await fetch(urlPerson, {cache: 'no-store'});
    const personData = await responsePerson.json();
    const keys = Object.keys(personData);
    const student_id = keys[0];


    return (
        <div className="flex min-h-screen">
            <Sidebar name={searchParams?.name} lastname={searchParams?.lastname} login_id={searchParams?.login_id}/>
            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex h-3 items-center gap-4 border-b bg-muted/40 px-4 md:h-[3.8rem] lg:h-[3.8rem] lg:px-6">
                    <h1 className='font-bold text-xl'>Favorite: 1 </h1>
                </header>
                <FavoriteBooks student_id={student_id}/>
            </div>
        </div>

    );
};

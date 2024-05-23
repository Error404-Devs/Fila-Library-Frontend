import Sidebar from "./Sidebar";

export default async function Dashboard() 
{
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <h1 className="text-lg font-semibold md:text-2xl">
                Settings
            </h1>
        </div>
    );
};

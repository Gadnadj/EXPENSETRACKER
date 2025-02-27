import DashboardLayout from '../../components/layouts/DashboardLayout';


const Home = () => {
    useUserAuth();

    return (
        <div>
            <DashboardLayout activeMenu='Dashboard'>
                <div className="my-5 mx-auto">

                </div>
            </DashboardLayout>
        </div>
    );
};

export default Home;
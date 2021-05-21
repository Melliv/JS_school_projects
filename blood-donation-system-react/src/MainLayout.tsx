import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const MainLayout = ({children}: any) => {
    return (
        <div id="wrapper">

            <Sidebar />

            <div id="content-wrapper" className="d-flex flex-column">

                <Header />

                <div className="container-fluid">
                    <div id="content">
                        <div className="container">
                            <main role="main" className="pb-3">
                                {children}
                            </main>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    )

}

export default MainLayout;

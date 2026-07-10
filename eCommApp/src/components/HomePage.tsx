import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ContactModal from './ContactModal';

const HomePage = () => {
    const [showContactModal, setShowContactModal] = useState(false);

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <p><h2>Welcome to the The Daily Harvest!</h2></p>
                <p>Check out our products page for some great deals.</p>
                <button className="contact-us-btn" onClick={() => setShowContactModal(true)}>
                    Fale Conosco
                </button>
            </main>
            <Footer />
            {showContactModal && (
                <ContactModal onClose={() => setShowContactModal(false)} />
            )}
        </div>
    );
};

export default HomePage;

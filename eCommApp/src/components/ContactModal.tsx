import { useState, useEffect } from 'react';

interface ContactModalProps {
    onClose: () => void;
}

const ContactModal = ({ onClose }: ContactModalProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [request, setRequest] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        setName('');
        setEmail('');
        setRequest('');
    };

    return (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Fale Conosco">
            <div className="modal-content">
                {submitted ? (
                    <div className="contact-confirmation">
                        <p>Obrigado por sua mensagem.</p>
                        <button onClick={onClose}>Continuar</button>
                    </div>
                ) : (
                    <>
                        <h2>Fale Conosco</h2>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <input
                                type="text"
                                placeholder="Nome"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Solicitação"
                                value={request}
                                onChange={e => setRequest(e.target.value)}
                                required
                            />
                            <button type="submit">Enviar</button>
                        </form>
                        <button onClick={onClose} className="close-button" aria-label="Fechar modal">✕</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ContactModal;

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactModal from './ContactModal';

describe('ContactModal', () => {
    it('renders the contact form with all fields', () => {
        render(<ContactModal onClose={vi.fn()} />);

        expect(screen.getByText('Fale Conosco')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Solicitação')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
    });

    it('shows confirmation message after form submission', () => {
        render(<ContactModal onClose={vi.fn()} />);

        fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'Maria' } });
        fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'maria@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Solicitação'), { target: { value: 'Preciso de ajuda.' } });
        fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

        expect(screen.getByText('Obrigado por sua mensagem.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
    });

    it('clears the form fields after submission', () => {
        render(<ContactModal onClose={vi.fn()} />);

        const nameInput = screen.getByPlaceholderText('Nome') as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText('E-mail') as HTMLInputElement;
        const requestTextarea = screen.getByPlaceholderText('Solicitação') as HTMLTextAreaElement;

        fireEvent.change(nameInput, { target: { value: 'Maria' } });
        fireEvent.change(emailInput, { target: { value: 'maria@example.com' } });
        fireEvent.change(requestTextarea, { target: { value: 'Preciso de ajuda.' } });
        fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

        // After submission the form is replaced by the confirmation, but state was cleared
        expect(screen.queryByPlaceholderText('Nome')).not.toBeInTheDocument();
        expect(screen.queryByPlaceholderText('E-mail')).not.toBeInTheDocument();
    });

    it('calls onClose when Continuar button is clicked', () => {
        const onClose = vi.fn();
        render(<ContactModal onClose={onClose} />);

        fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'Maria' } });
        fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'maria@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Solicitação'), { target: { value: 'Ajuda.' } });
        fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

        fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn();
        render(<ContactModal onClose={onClose} />);

        fireEvent.click(screen.getByRole('button', { name: 'Fechar modal' }));
        expect(onClose).toHaveBeenCalledOnce();
    });
});

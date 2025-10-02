import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '../components/domain/pages/user/LoginPage';

export const Route = createFileRoute('/login')({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <LoginPage />
    );
}

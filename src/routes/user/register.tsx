import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '../../components/domain/base/ProtectedRoute';
import { RegisterPage } from '../../components/domain/pages/user/RegisterPage';

export const Route = createFileRoute('/user/register')({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <ProtectedRoute>
            <RegisterPage />
        </ProtectedRoute>
    );
}

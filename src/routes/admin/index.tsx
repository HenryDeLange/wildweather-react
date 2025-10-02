import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '../../components/domain/base/ProtectedRoute';
import { AdminActions } from '../../components/domain/pages/admin/AdminActions';

export const Route = createFileRoute('/admin/')({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <ProtectedRoute>
            <AdminActions />
        </ProtectedRoute>
    );
}

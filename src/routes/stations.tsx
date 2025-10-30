import { createFileRoute } from '@tanstack/react-router';
import { StationsPage } from '../components/domain/pages/StationsPage';

export const Route = createFileRoute('/stations')({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <StationsPage />
    );
}

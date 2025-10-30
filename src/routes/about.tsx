import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '../components/domain/pages/AboutPage';

export const Route = createFileRoute('/about')({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <AboutPage />
    );
}

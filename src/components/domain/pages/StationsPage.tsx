import { PageContainer, VBox } from '../../ui/layout';

export function StationsPage() {
    return (
        <PageContainer>
            <VBox fullWidth gap={0}>
                <iframe
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    src='https://ambientweather.net/devices/public/1503cf8ef0e711ee10340f9a00ca8433?embed=true'
                />
            </VBox>
        </PageContainer>
    );
}
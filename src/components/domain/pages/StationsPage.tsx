import { FixedGrid, PageContainer, VBox } from '../../ui/layout';

export function StationsPage() {
    return (
        <PageContainer>
            <VBox fullWidth gap={0}>
                <FixedGrid>
                    <iframe
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        src='https://ambientweather.net/devices/public/1503cf8ef0e711ee10340f9a00ca8433?embed=true'
                    />
                    <iframe
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        src='https://ambientweather.net/devices/public/2238f07681ade79646b5aa73779fa589?embed=true'
                    />
                </FixedGrid>
            </VBox>
        </PageContainer>
    );
}
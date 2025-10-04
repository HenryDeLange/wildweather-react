import { t } from 'i18next';
import { PageContainer, VBox } from '../../../ui/layout';
import { Button, RouterButton } from '../../../ui/mywild';


export function AdminActions() {
    return (
        <PageContainer>
            <VBox>
                <RouterButton to='/user/register' >
                    {t('registerButton')}
                </RouterButton>
                <Button>
                    TODO: Process CSV Files
                </Button>
                <Button>
                    TODO: Process API Data
                </Button>
            </VBox>
        </PageContainer>
    );
}
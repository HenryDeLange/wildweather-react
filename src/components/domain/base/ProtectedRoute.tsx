import { useLocation } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { selectAuthUserId } from '../../../auth/authSlice';
import { useAppSelector } from '../../../redux/hooks';
import { HCBox, PageContainer, VBox } from '../../ui/layout';
import { Heading, RouterButton, Text } from '../../ui/mywild';
import type { LoginRedirectType } from '../pages/user/LoginPage';

type Props = {
    children: ReactNode;
}

export function ProtectedRoute({ children }: Readonly<Props>) {
    const { t } = useTranslation();

    const routePathName = useLocation({
        select: location => location.pathname,
    });

    const userId = useAppSelector(selectAuthUserId);
    if (!userId) {
        console.warn('User is not authenticated.');
        return (
            <PageContainer>
                <VBox fullWidth>
                    <HCBox>
                        <Heading variant='error'>
                            {t('protectedPageTitle')}
                        </Heading>
                        <Text>
                            {t('protectedPageDescription')}
                        </Text>
                        <RouterButton
                            to='/login'
                            search={{
                                redirect: routePathName
                            } as LoginRedirectType}
                            variant='priority'
                        >
                            {t('loginButton')}
                        </RouterButton>
                    </HCBox>
                </VBox>
            </PageContainer>
        );
    }
    return (
        <>
            {children}
        </>
    );
}
import { useNavigate, useSearch, type NavigateOptions } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { authLogin } from '../../../../auth/authSlice';
import { useLoginUserMutation, type UserLogin } from '../../../../redux/api/wildweatherApi';
import { useAppDispatch } from '../../../../redux/hooks';
import { HBox, PageContainer, VBox } from '../../../ui/layout';
import { Card, Form, FormField, Separator } from '../../../ui/mywild';

export function LoginPage() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const redirect = useSearch({
        from: '/login',
        select: (search) => (search as LoginRedirectType).redirect
    }) as NavigateOptions['to'];

    const [
        doUserLogin,
        {
            isLoading,
            error
        }
    ] = useLoginUserMutation();

    const onSubmit = async (data: UserLogin) => {
        doUserLogin({
            userLogin: { ...data }
        })
            .unwrap().then(response => {
                if (response.userId) {
                    dispatch(authLogin({
                        userId: response.userId,
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken
                    }));
                    navigate({ to: redirect ?? '/', replace: true });
                }
            });
    };

    return (
        <PageContainer>
            <VBox marginTop='3rem' fullWidth>
                <HBox marginLeft='auto' marginRight='auto'>
                    <VBox maxWidth='30rem'>
                        <Card
                            title={t('loginTitle')}
                            description={t('loginDescription')}
                        >
                            <Separator />
                            <Form<UserLogin>
                                formProps={{
                                    defaultValues: {
                                        username: '',
                                        password: ''
                                    }
                                }}
                                onSubmit={onSubmit}
                                submitLabel={t('loginButton')}
                                loading={isLoading}
                                error={error}
                                errorLabel={t('loginFailed')}
                            >
                                <FormField<UserLogin>
                                    label={t('loginUsernameField')}
                                    formControl={{
                                        name: 'username',
                                        rules: {
                                            required: t('fieldRequired'),
                                            minLength: {
                                                value: 4,
                                                message: t('fieldTooShort', { length: 4 })
                                            }
                                        }
                                    }}
                                    autoFocus
                                />
                                <FormField<UserLogin>
                                    type='password'
                                    label={t('userPasswordField')}
                                    formControl={{
                                        name: 'password',
                                        rules: {
                                            required: t('fieldRequired'),
                                            minLength: {
                                                value: 4,
                                                message: t('fieldTooShort', { length: 4 })
                                            }
                                        }
                                    }}
                                />
                            </Form>
                        </Card>
                    </VBox>
                </HBox>
            </VBox>
        </PageContainer>
    );
}

export type LoginRedirectType = {
    redirect: string;
}
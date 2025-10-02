import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { authLogin } from '../../../../auth/authSlice';
import { useRegisterUserMutation, type UserRegister } from '../../../../redux/api/wildweatherApi';
import { useAppDispatch } from '../../../../redux/hooks';
import { HCBox, PageContainer } from '../../../ui/layout';
import { Card, Form, FormField, Separator } from '../../../ui/mywild';

type UserRegisterForm = UserRegister & {
    confirmPassword: string;
}

export function RegisterPage() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [
        doUserRegister,
        {
            isLoading,
            error
        }
    ] = useRegisterUserMutation();

    const onSubmit = async (data: UserRegister) => {
        doUserRegister({
            userRegister: {
                ...data
            }
        })
            .unwrap().then(response => {
                dispatch(authLogin({
                    userId: response.userId,
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken
                }));
                navigate({ to: '/admin' });
            });
    };

    return (
        <PageContainer>
            <HCBox marginVertical='2rem' marginHorizontal='auto' maxWidth='50rem'>
                <Card
                    title={t('registerTitle')}
                    description={t('registerDescription')}
                >
                    <Separator />
                    <Form<UserRegisterForm>
                        formProps={{
                            defaultValues: {
                                username: '',
                                password: '',
                                confirmPassword: ''
                            }
                        }}
                        onSubmit={onSubmit}
                        submitLabel={t('registerButton')}
                        loading={isLoading}
                        error={error}
                        errorLabel={t('registerFailed')}
                    >
                        <FormField<UserRegisterForm>
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
                        />
                        <FormField<UserRegisterForm>
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
                        <FormField<UserRegisterForm>
                            type='password'
                            label={t('userPasswordConfirmField')}
                            formControl={{
                                name: 'confirmPassword',
                                rules: {
                                    required: t('fieldRequired'),
                                    validate: (value, formValues) => value === formValues.password || t('userPasswordsDoNotMatch')
                                }
                            }}
                        />
                    </Form>
                </Card>
            </HCBox>
        </PageContainer>
    );
}
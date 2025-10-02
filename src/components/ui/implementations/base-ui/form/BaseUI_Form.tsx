import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState, type ComponentType, type ReactElement } from 'react';
import { FormProvider, useForm, type Control, type FieldValues, type SubmitHandler, type UseFormProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ErrorDisplay } from '../../../../domain/base/ErrorDisplay';
import { Button } from '../../../mywild/Button';
import type { BaseUI_FormField } from '../form-field/BaseUI_FormField';
import styles from './BaseUI_Form.module.css';

// https://react-hook-form.com/docs/formprovider

export type FieldElement<T extends FieldValues> = ReactElement<typeof BaseUI_FormField<T>>;

type Props<T extends FieldValues> = {
    children: FieldElement<T> | FieldElement<T>[];
    formProps?: UseFormProps<T>;
    onSubmit: SubmitHandler<T>;
    submitLabel?: string;
    disabled?: boolean;
    loading?: boolean;
    error?: FetchBaseQueryError | SerializedError;
    errorLabel?: string;
}

export function BaseUI_Form<T extends FieldValues>({ children, formProps, onSubmit, submitLabel, disabled, loading, error, errorLabel }: Props<T>) {
    const { t } = useTranslation();
    const methods = useForm<T>(formProps);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [DevToolComponent, setDevToolComponent] = useState<ComponentType<{ control: Control<any>; placement: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> | null>(null);
    useEffect(() => {
        if (import.meta.env.DEV) {
            import('@hookform/devtools').then(({ DevTool }) => {
                setDevToolComponent(() => DevTool);
            });
        }
    }, []);

    return (
        <FormProvider {...methods}>
            <form
                className={styles.Form}
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                {children}
                <Button
                    type='submit'
                    disabled={disabled}
                    loading={loading}
                    variant={methods.formState.isValid ? 'priority' : 'warning'}
                    size='large'
                >
                    {submitLabel ?? t('formSubmitButton')}
                </Button>
                <ErrorDisplay error={error} errorLabel={errorLabel} mode='line' />
            </form>
            {DevToolComponent &&
                <DevToolComponent control={methods.control} placement='top-left' />
            }
        </FormProvider>
    );
}
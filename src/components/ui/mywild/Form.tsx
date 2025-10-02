import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { ReactElement } from 'react';
import type { FieldValues, SubmitHandler, UseFormProps } from 'react-hook-form';
import { BaseUI_Form, type FieldElement as BaseUI_FieldElement } from '../implementations/base-ui/form/BaseUI_Form';
import type { FormField } from './FormField';

type FieldElement<T extends FieldValues> = ReactElement<typeof FormField<T>>;

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

export function Form<T extends FieldValues>({ children, formProps, onSubmit, submitLabel, disabled, loading, error, errorLabel }: Props<T>) {
    return (
        <BaseUI_Form
            formProps={formProps}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
            disabled={disabled}
            loading={loading}
            error={error}
            errorLabel={errorLabel}
        >
            {children as BaseUI_FieldElement<T>}
        </BaseUI_Form>
    );
}
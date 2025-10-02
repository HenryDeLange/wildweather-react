/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useTranslation } from 'react-i18next';
import { getErrorReason } from '../../../redux/api';
import { VBox } from '../../ui/layout';
import { Text } from '../../ui/mywild';

type Props = {
    error?: FetchBaseQueryError | SerializedError | Error;
    errorLabel?: string;
    mode?: 'box' | 'line';
}

export function ErrorDisplay({ error, errorLabel, mode = 'box' }: Readonly<Props>) {
    const { t } = useTranslation();
    if (!error) {
        return null;
    }
    console.error('APP ERROR:', error);

    if (mode === 'line') {
        const errorReason = getErrorReason(error) ?? (error as any).message;
        if (!errorLabel && !errorReason) {
            return (
                <Text variant='error'>
                    {t('errorUnknown')}
                </Text>
            );
        }
        return (
            <>
                {errorLabel &&
                    <Text variant='error'>
                        {errorLabel}
                    </Text>
                }
                {errorReason &&
                    <Text variant='error' size={errorLabel ? 'small' : 'standard'}>
                        {errorReason}
                    </Text>
                }
            </>
        );
    }

    return (
        <div
            style={{
                // backgroundColor: '#e6c1c1ff',
                border: '2px solid var(--color-error)',
                borderRadius: '0.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.2rem',
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}
        >
            <h3>💥👣💥</h3>
            {(error as any).status &&
                <VBox>
                    <Text variant='error'>
                        {(error as any).originalStatus ?? ''}
                    </Text>
                    <Text variant='error'>
                        {(error as FetchBaseQueryError).status}
                    </Text>
                    <Text variant='error' size='small'>
                        {(error as any).error ?? ''}
                    </Text>
                    {(error as FetchBaseQueryError).data
                        ? ((error as FetchBaseQueryError).data as any).reason
                            ? <Text variant='error' size='small'>
                                {((error as FetchBaseQueryError).data as any).reason}
                            </Text>
                            : <Text variant='error'>
                                {JSON.stringify((error as FetchBaseQueryError).data ?? '')}
                            </Text>
                        : null}
                </VBox>
            }
            {(error as any).code &&
                <VBox>
                    <Text variant='error'>
                        {(error as SerializedError).code ?? ''}
                    </Text>
                    <Text variant='error' size='small'>
                        {(error as SerializedError).message ?? ''}
                    </Text>
                </VBox>
            }
            {(error instanceof Error) &&
                <VBox>
                    <Text variant='error'>
                        {error.name}
                    </Text>
                    <Text variant='error' size='small'>
                        {error.message}
                    </Text>
                </VBox>
            }
        </div >
    );
}

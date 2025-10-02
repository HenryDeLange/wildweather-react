import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type SpringErrorResponse = {
    reason: string;
}

export function getErrorReason(error: FetchBaseQueryError | SerializedError): string | null {
    if (error && 'data' in error) {
        const data = error.data as SpringErrorResponse;
        return data.reason ?? null;
    }
    return null;
}
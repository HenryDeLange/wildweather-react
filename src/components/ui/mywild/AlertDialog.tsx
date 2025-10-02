import type { ReactNode } from 'react';
import { BaseUI_AlertDialog } from '../implementations/base-ui/alert-dialog/BaseUI_AlertDialog';

type Props = {
    children?: ReactNode | ReactNode[];
    title: string;
    description: string;
    open: boolean;
    onOpenChange: (open: boolean, eventDetails: unknown) => void;
}

export function AlertDialog({ children, title, description, open, onOpenChange }: Props) {
    return (
        <BaseUI_AlertDialog
            title={title}
            description={description}
            open={open}
            onOpenChange={onOpenChange}
        >
            {children}
        </BaseUI_AlertDialog>
    );
}
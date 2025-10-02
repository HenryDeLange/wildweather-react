import { AlertDialog } from '@base-ui-components/react/alert-dialog';
import type { ReactNode } from 'react';
import { Heading, Text } from '../../../mywild';
import styles from './BaseUI_AlertDialog.module.css';

// https://base-ui.com/react/components/alert-dialog

type Props = {
    children?: ReactNode | ReactNode[];
    title: string;
    description: string;
    open: boolean;
    onOpenChange: (open: boolean, eventDetails: AlertDialog.Root.ChangeEventDetails) => void;
}

export function BaseUI_AlertDialog({ children, title, description, open, onOpenChange }: Props) {
    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Portal>
                <AlertDialog.Backdrop className={styles.Backdrop} />
                <AlertDialog.Popup className={styles.Popup}>
                    <AlertDialog.Title className={styles.Title} render={
                        <Heading>
                            {title}
                        </Heading>
                    } />
                    <AlertDialog.Description className={styles.Description} render={
                        <Text variant='subdued' size='small'>
                            {description}
                        </Text>
                    } />
                    {/* <AlertDialog.Close>close</AlertDialog.Close> */}
                    {children}
                </AlertDialog.Popup>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}
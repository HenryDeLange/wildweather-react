import { Dialog } from '@base-ui-components/react/dialog';
import styles from './BaseUI_Dialog.module.css';

// https://base-ui.com/react/components/dialog

type Props = {
    title: string;
    description: string;
    buttonText: string;
}

export function BaseUI_Dialog({ title, description, buttonText }: Props) {
    // const [dialogOpen, setDialogOpen] = useState(false);
    return (
        <Dialog.Root /*open={dialogOpen} onOpenChange={setDialogOpen}*/>
            <Dialog.Trigger className={styles.Button}>
                {buttonText}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop className={styles.Backdrop} />
                <Dialog.Popup className={styles.Popup}>
                    <Dialog.Title className={styles.Title}>
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className={styles.Description}>
                        {description}
                    </Dialog.Description>
                    <div className={styles.Actions}>
                        <Dialog.Close className={styles.Button}>
                            Close
                        </Dialog.Close>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
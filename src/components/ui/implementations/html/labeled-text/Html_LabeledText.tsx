import type { ReactNode } from 'react';
import { Box } from '../../../layout';
import { Text } from '../../../mywild/Text';
import styles from './Html_LabeledText.module.css';

type Props = {
    label: string | number;
    text: ReactNode;
    truncateText?: boolean;
}

export function Html_LabeledText({ label, text, truncateText }: Props) {
    const isText = typeof text === 'string' || typeof text === 'number';
    return (
        <div className={styles.Wrapper}>
            <Box>
                <Text variant='subdued' size='small' truncateText={truncateText}>
                    {label}
                </Text>
            </Box>
            <div className={styles.Text}>
                {isText
                    ? <Text truncateText={truncateText}>{text}</Text>
                    : text === null
                        ? <div style={{ borderBottom: '1px solid #88888888' }}><div style={{ visibility: 'hidden' }}><Text>??</Text></div></div>
                        : text
                }
            </div>
        </div>
    );
}
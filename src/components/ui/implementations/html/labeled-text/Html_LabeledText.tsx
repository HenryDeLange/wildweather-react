import type { ReactNode } from 'react';
import { Box } from '../../../layout';
import { Text } from '../../../mywild/Text';
import styles from './Html_LabeledText.module.css';

type Props = {
    label: ReactNode;
    body: ReactNode;
    truncateText?: boolean;
}

export function Html_LabeledText({ label, body, truncateText }: Props) {
    const isLabelText = typeof label === 'string' || typeof label === 'number';
    const isBodyText = typeof body === 'string' || typeof body === 'number';
    return (
        <div className={styles.Wrapper}>
            <Box>
                {isLabelText
                    ? <Text variant='subdued' size='small' truncateText={truncateText}>{label}</Text>
                    : label === null
                        ? <div style={{ borderBottom: '1px solid #88888888' }}><div style={{ visibility: 'hidden' }}><Text>??</Text></div></div>
                        : label
                }
            </Box>
            <div className={styles.Text}>
                {isBodyText
                    ? <Text truncateText={truncateText}>{body}</Text>
                    : body === null
                        ? <div style={{ borderBottom: '1px solid #88888888' }}><div style={{ visibility: 'hidden' }}><Text>??</Text></div></div>
                        : body
                }
            </div>
        </div>
    );
}
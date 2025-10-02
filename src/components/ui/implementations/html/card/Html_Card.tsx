import type { ReactNode } from 'react';
import { Box, HBox, VBox } from '../../../layout';
import { Heading, Text } from '../../../mywild';
import styles from './Html_Card.module.css';

type Props = {
    title?: ReactNode;
    description?: ReactNode | ReactNode[];
    right?: ReactNode | ReactNode[];
    children?: ReactNode | ReactNode[];
}

export function Html_Card({ title, description, right, children }: Props) {
    const isTextTitle = typeof title === 'string' || typeof title === 'number';
    const isTextDescription = typeof description === 'string' || typeof description === 'number';
    return (
        <div className={styles.Card}>
            <VBox>
                <HBox>
                    {title &&
                        <>
                            {isTextTitle
                                ? <Heading size='sub-title'>{title}</Heading>
                                : title
                            }
                        </>
                    }
                    {right &&
                        <Box marginLeft='auto'>
                            {right}
                        </Box>
                    }
                </HBox>
                {description &&
                    <>
                        {isTextDescription
                            ? <Text variant='subdued' size='standard'>{description}</Text>
                            : description
                        }
                    </>
                }
                <VBox marginTop='-1rem'>
                    {children}
                </VBox>
            </VBox>
        </div>
    );
}
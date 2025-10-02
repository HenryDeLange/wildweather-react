import styles from './Html_Heading.module.css';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements

type Props = {
    children: string | number;
    textAlign?: React.CSSProperties['textAlign'];
    variant?: 'standard' | 'priority' | 'error' | 'warning';
    size?: 'standard' | 'title' | 'sub-title' | 'small';
}

export function Html_Heading({ children, textAlign, variant, size = 'standard' }: Props) {
    return (
        <>
            {size === 'standard'
                ? <h3
                    className={styles.Heading}
                    style={textAlign ? { textAlign } : undefined}
                    data-variant={variant}
                    data-size={size}
                >
                    {children}
                </h3>
                : size === 'small'
                    ? <h4
                        className={styles.Heading}
                        style={textAlign ? { textAlign } : undefined}
                        data-variant={variant}
                        data-size={size}
                    >
                        {children}
                    </h4>
                    : size === 'sub-title'
                        ? <h2
                            className={styles.Heading}
                            style={textAlign ? { textAlign } : undefined}
                            data-variant={variant}
                            data-size={size}
                        >
                            {children}
                        </h2>
                        : <h1
                            className={styles.Heading}
                            style={textAlign ? { textAlign } : undefined}
                            data-variant={variant}
                            data-size={size}
                        >
                            {children}
                        </h1>
            }
        </>

    );
}
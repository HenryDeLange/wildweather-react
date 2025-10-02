import styles from './Html_Spinner.module.css';

type Props = {
    size?: 'standard' | 'small';
}

export function Html_Spinner({size}: Props) {
    return (
        <div className={styles.Spinner} data-size={size} />
    );
}
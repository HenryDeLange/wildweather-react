import { Html_Spinner } from '../implementations/html/spinner/Html_Spinner';

type Props = {
    size?: 'standard' | 'small';
}

export function Spinner({size}: Props) {
    return (
        <Html_Spinner size={size} />
    );
}
import { Select } from '@base-ui-components/react/select';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import type { Noop } from 'react-hook-form';
import { Text } from '../../../mywild';
import styles from './BaseUI_Select.module.css';

// https://base-ui.com/react/components/select

export type SelectItem = {
    label: string;
    value: string | null;
}

type Props = {
    placeholder?: string;
    autoFocus?: boolean;
    items: SelectItem[];
    value: string | null;
    onValueChange: (value: string | null, eventDetails: Select.Root.ChangeEventDetails) => void;
    onBlur?: Noop;
}

export function BaseUI_Select({ placeholder, autoFocus, items, value, onValueChange, onBlur }: Props) {
    return (
        <Select.Root
            items={items}
            value={value === '' ? null : value}
            onValueChange={(selectedValue, event) => onValueChange?.(selectedValue !== value ? selectedValue : null, event)}
        >
            <Select.Trigger className={styles.Select} onBlur={onBlur} autoFocus={autoFocus}>
                <Select.Value
                    render={
                        <Text size='small' variant={!value && placeholder ? 'subdued' : 'standard'}>
                            {!value ? (placeholder ?? '') : items.find(item => item.value === value)?.label ?? ''}
                        </Text>
                    }
                />
                <Select.Icon className={styles.SelectIcon}>
                    <ChevronsUpDownIcon size='clamp(0.9rem, 2vw, 1.2rem)' />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Positioner className={styles.Positioner}>
                    <Select.ScrollUpArrow className={styles.ScrollArrow} />
                    <Select.Popup className={styles.Popup}>
                        {items.map(({ label, value }) => (
                            <Select.Item key={label} value={value} className={styles.Item}>
                                <Select.ItemIndicator className={styles.ItemIndicator}>
                                    <CheckIcon size='0.75rem' />
                                </Select.ItemIndicator>
                                <Select.ItemText className={styles.ItemText}
                                    render={
                                        <div>
                                            <Text size='small'>
                                                {label}
                                            </Text>
                                        </div>
                                    }
                                />
                            </Select.Item>
                        ))}
                    </Select.Popup>
                    <Select.ScrollDownArrow className={styles.ScrollArrow} />
                </Select.Positioner>
            </Select.Portal>
        </Select.Root>
    );
}

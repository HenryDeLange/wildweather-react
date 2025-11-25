import { Select } from '@base-ui-components/react/select';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';
import type { Noop } from 'react-hook-form';
import { Text } from '../../../mywild';
import styles from './BaseUI_MultiSelect.module.css';

// https://base-ui.com/react/components/select

export type SelectItem = {
    label: string;
    value: string;
}

type Props = {
    placeholder?: string;
    autoFocus?: boolean;
    items: SelectItem[];
    values?: string[] | null;
    onValueChange: (value?: string[] | null, eventDetails?: Select.Root.ChangeEventDetails) => void;
    onBlur?: Noop;
}

export function BaseUI_MultiSelect({ placeholder, autoFocus, items, values, onValueChange, onBlur }: Props) {
    const [open, setOpen] = useState(false);
    return (
        <Select.Root
            multiple
            items={items}
            // value={values ? null : values}
            onValueChange={(selectedValues, event) => {
                onValueChange?.(selectedValues.length > 0 ? selectedValues : null, event);
                setOpen(false);
            }}
            open={open}
            onOpenChange={open => setOpen(open)}
        >
            <Select.Trigger className={styles.Select} onBlur={onBlur} autoFocus={autoFocus}>
                <Select.Value
                    render={
                        <Text size='small' variant={!values && placeholder ? 'subdued' : 'standard'}>
                            {`
                            ${!values ? (placeholder ?? '') : items.find(item => values.indexOf(item.value) >= 0)?.label ?? ''}
                            ${(values?.length ?? 0) > 1 ? `(+${values!.length - 1})` : ''}
                            `}
                        </Text>
                    }
                />
                <Select.Icon className={styles.SelectIcon}>
                    <ChevronsUpDownIcon size='clamp(0.9rem, 2vw, 1.2rem)' />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Positioner sideOffset={-4} alignItemWithTrigger={false} className={styles.Positioner}>
                    <Select.ScrollUpArrow className={styles.ScrollArrow} />
                    <Select.Popup className={styles.Popup}>
                        <Select.List className={styles.List}>
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
                        </Select.List>
                    </Select.Popup>
                    <Select.ScrollDownArrow className={styles.ScrollArrow} />
                </Select.Positioner>
            </Select.Portal>
        </Select.Root>
    );
}
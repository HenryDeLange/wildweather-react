import { Select } from '@base-ui-components/react/select';
import { CheckIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { languages } from '../../../../../i18n';
import { Text } from '../../../mywild/Text';
import styles from './BaseUI_LanguageToggle.module.css';

// https://base-ui.com/react/components/select

export function BaseUI_LanguageToggle() {
    const { t, i18n } = useTranslation();
    if (languages.length <= 1)
        return null;
    const items = languages.map(language => ({ label: t(language.label), value: language.value }));
    return (
        <Select.Root
            items={items}
            value={i18n.language}
            onValueChange={value => i18n.changeLanguage(value ?? undefined)}
        >
            <Select.Trigger className={styles.Select}>
                <Select.Value>
                    {(value: string) => (
                        <Text size='tiny' variant='subdued'>
                            {value?.toUpperCase()}
                        </Text>
                    )}
                </Select.Value>
            </Select.Trigger>
            <Select.Portal>
                <Select.Positioner className={styles.Positioner} sideOffset={8}>
                    <Select.Popup className={styles.Popup}>
                        <Select.List className={styles.List}>
                            {items.map(({ label, value }) => (
                                <Select.Item key={label} value={value} className={styles.Item}>
                                    <Select.ItemIndicator className={styles.ItemIndicator}>
                                        <CheckIcon size='0.75rem' />
                                    </Select.ItemIndicator>
                                    <Select.ItemText>
                                        <Text>
                                            {label}
                                        </Text>
                                    </Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.List>
                    </Select.Popup>
                </Select.Positioner>
            </Select.Portal>
        </Select.Root>
    );
}
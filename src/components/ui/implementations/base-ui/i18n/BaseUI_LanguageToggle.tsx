import { Select } from '@base-ui-components/react/select';
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
            onValueChange={value => i18n.changeLanguage(value)}
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
                        {items.map(({ label, value }) => (
                            <Select.Item className={styles.Item} key={label} value={value}>
                                <Select.ItemText>
                                    <Text>
                                        {label}
                                    </Text>
                                </Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Popup>
                </Select.Positioner>
            </Select.Portal>
        </Select.Root>
    );
}
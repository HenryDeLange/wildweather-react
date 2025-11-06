import { NavigationMenu } from '@base-ui-components/react/navigation-menu';
import { type LinkProps } from '@tanstack/react-router';
import { RouterLink } from '../../../mywild/RouterLink';

export function BaseUI_NavLink({ forceReload, ...props }: NavigationMenu.Link.Props & { forceReload?: boolean }) {
    return (
        <NavigationMenu.Link
            render={
                <RouterLink to={props.href as LinkProps['to']} forceReload={forceReload}>
                    {props.children}
                </RouterLink>
            }
            {...props}
        />
    );
}

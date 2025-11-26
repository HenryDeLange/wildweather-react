import { PageContainer, VBox } from '../../ui/layout';
import { WeatherChart } from '../components/chart/WeatherChart';
import { WEATHER_CHART_DOM_ID, WeatherData } from '../components/WeatherData';
import { WeatherFilter } from '../components/WeatherFilter';

export function HomePage() {
    return (
        <PageContainer>
            <VBox fullWidth gap={0}>
                <WeatherFilter>
                    <WeatherData>
                        {dataState =>
                            <WeatherChart {...dataState} />
                        }
                    </WeatherData>
                </WeatherFilter>
                <div id={WEATHER_CHART_DOM_ID} style={{ height: '100%' }} />
            </VBox>
        </PageContainer>
    );
}

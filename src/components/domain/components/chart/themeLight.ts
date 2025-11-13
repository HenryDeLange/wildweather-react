import type { ThemeOption } from 'echarts/types/src/util/types.js';

export const themeLight: ThemeOption = {
    backgroundColor: 'rgba(254,248,239,1)',
    color: [
        "#ec355d",
        "#ce9937",
        "#8648cc",
        "#1990a5",
        "#be10a7",
        "#5e1854",
        "#be10a7",
        "#5e1854",
        "#be10a7",
        "#5e1854",
        "#be10a7",
        "#5e1854",
        "#be10a7",
        "#5e1854",
        "#be10a7",
        "#5e1854",
        "#be10a7",
        "#5e1854",
        "#be10a7",
        "#5e1854",
        "#be10a7",
        "#5e1854",
        "#be10a7",
        "#5e1854",
        "#be10a7",
        "#5e1854",
        "#be10a7",
        "#5e1854",
    ],
    title: {
        textStyle: {
            color: "#13556bff",
            fontSize: 24
        },
        subtextStyle: {
            color: "#254550ff",
            fontSize: 14
        },
        itemGap: 6
    },
    line: {
        itemStyle: {
            borderWidth: 1
        },
        lineStyle: {
            width: 4
        },
        // areaStyle: {
        //     opacity: 0.1
        // },
        symbolSize: 10,
        symbol: "emptyCircle",
        smooth: true
    },
    legend: {
        textStyle: {
            color: "#333333"
        }
    },
    tooltip: {
        axisPointer: {
            lineStyle: {
                color: "#333333",
                width: 1
            },
            crossStyle: {
                color: "#333333",
                width: 1
            }
        }
    },
    bar: {
        itemStyle: {
            barBorderWidth: 0,
            barBorderColor: "#cec6c6ff"
        }
    },
    categoryAxis: {
        axisLine: {
            show: true,
            lineStyle: {
                color: "#9e9e9eff"
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: "#9e9e9eff"
            }
        },
        axisLabel: {
            show: true,
            color: "#333333",
            fontSize: 16
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: [
                    "#ccccccff"
                ]
            }
        },
        splitArea: {
            show: false
        }
    },
    valueAxis: {
        axisLine: {
            show: true,
            lineStyle: {
                color: "#9e9e9eff"
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: "#9e9e9eff"
            }
        },
        axisLabel: {
            show: true,
            color: "#333333",
            fontSize: 16
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: [
                    "#ccccccff"
                ]
            }
        },
        splitArea: {
            show: false
        }
    }
};

import type { ThemeOption } from 'echarts/types/src/util/types.js';

export const themeDark: ThemeOption = {
    backgroundColor: 'rgba(51,51,51,1)',
    color: [
        "#ec355d",
        "#ce9937",
        "#8648cc",
        "#1990a5",
        "#8aa529",
        "#26b170"
    ],
    title: {
        textStyle: {
            color: "#daf3fcff",
            fontSize: 24
        },
        subtextStyle: {
            color: "#adbfc5ff",
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
            color: "#eeeeee"
        }
    },
    tooltip: {
        axisPointer: {
            lineStyle: {
                color: "#eeeeee",
                width: 1
            },
            crossStyle: {
                color: "#eeeeee",
                width: 1
            }
        }
    },
    bar: {
        itemStyle: {
            barBorderWidth: 0,
            barBorderColor: "#727272"
        }
    },
    categoryAxis: {
        axisLine: {
            show: true,
            lineStyle: {
                color: "#eeeeee"
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: "#eeeeee"
            }
        },
        axisLabel: {
            show: true,
            color: "#eeeeee",
            fontSize: 16
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: [
                    "#444444"
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
                color: "#eeeeee"
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: "#eeeeee"
            }
        },
        axisLabel: {
            show: true,
            color: "#eeeeee",
            fontSize: 16
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: [
                    "#444444"
                ]
            }
        },
        splitArea: {
            show: false
        }
    }
};

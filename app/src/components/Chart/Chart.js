import { useRef, useEffect } from 'react'
import Chart from 'chart.js'

const StockChart = ({chartData, companyData}) => {

    const canvas = useRef()

    useEffect(() => {
        if (canvas.current && chartData) {
            const myChart = new Chart(canvas.current, {
                type: 'line',
                data: {
                    datasets: [{
                        label: `${companyData['2. Symbol']} Price`,
                        data: chartData,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)'],
                        borderWidth: 1,
                        pointRadius: 0
                    }]
                },
                options: {
                    lineHeightAnnotation: {
                        always: true,
                        hover: false,
                        lineWeight: 1.5
                    },
                    animation: {
                        duration: 1500
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                displayFormats: {
                                    unit: 'day',
                                }
                            },
                            distribution: 'series',
                            bounds: 'data'
                        }],
                        yAxes: [{
                            ticks: {

                            }
                        }]
                    }
                }
            })
        }
    }, [])

    const render = () => {
        return (
            <div id="chart-container">
                <canvas ref={canvas} width="400" height="400"></canvas>
            </div>
        )
    }

    return render()
}

export default StockChart
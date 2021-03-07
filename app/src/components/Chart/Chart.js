import { useState, useRef, useEffect } from 'react'
import Chart from 'chart.js'
import './Chart.css'

const StockChart = ({chartData, companyData}) => {

    const [timeFrame, setTimeFrame] = useState('day')
    const canvas = useRef()

    const {day, week} = chartData
    const timeSpan = () => {
        switch (timeFrame) {
            case 'day': return day
            case 'week': return week
            default: return day
        }
    }

    useEffect(() => {
        if (canvas.current && chartData) {
            const myChart = new Chart(canvas.current, {
                type: 'line',
                data: {
                    datasets: [{
                        label: `${companyData.Symbol} Price`,
                        data: timeSpan(),
                        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)'],
                        borderWidth: 1,
                        pointRadius: 0
                    }]
                },
                options: {
                    lineHeightAnnotation: {
                        always: true,
                        hover: true,
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
                                    hour: 'hA',
                                    day: 'MMM D',
                                }
                            },
                            distribution: 'series',
                            bounds: 'data',
                            ticks: {
                                source: 'auto',
                            }
                        }],
                        yAxes: [{
                            ticks: {

                            }
                        }]
                    }
                }
            })
        }
    }, [timeFrame])

    const render = () => {
        return (
            <div id="chart">
                    <canvas ref={canvas} width="200" height="200"></canvas>
                    <div id="chart-button-container">
                        <button className="chart-button" onClick={() => {
                            setTimeFrame('day')
                        }}>Day</button>
                        <button className="chart-button" onClick={() => {
                            setTimeFrame('week')
                        }}>Week</button>
                    </div>
            </div>
        )
    }

    return render()
}

export default StockChart

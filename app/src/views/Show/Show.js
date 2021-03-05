// import './App.css'
import { useState, useEffect } from 'react'
import StockChart from '../../components/Chart/Chart.js'
import axios from 'axios'
import SearchBar from '../../components/SearchBar/SearchBar.js'
const API_KEY = process.env.API_KEY

function App() {

    const [chartData, setChartData] = useState({})
    const [companyData, setCompanyData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const formatData = (data) => {
        return Object.entries(data).map(([key, value]) => {
            return {
                t: key,
                y: value['4. close'] - 0
            }
        })
    }

    const apiCall = async () => {
        setIsLoading(true)
        const formatedData = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo`)
            .then((res) => {
                console.log(res.data)
                setCompanyData(res.data['Meta Data'])
                return formatData(res.data['Weekly Time Series'])
            })
        setChartData(formatedData)
        setIsLoading(false)
    }

    useEffect(() => {
        apiCall()
    }, [])

    const render = () => {
        if (isLoading) {
            return <div>Loading...</div>
        } else {
            return (
              <div className="App">
                <h1>NASCAR</h1>
                <SearchBar />
                <StockChart chartData={chartData} companyData={companyData}/>
              </div>
            )
        }
    }

    return render()

}

export default App;

// import './App.css'
import { useState, useEffect } from 'react'
import StockChart from '../../components/Chart/Chart.js'
import axios from 'axios'
// import SearchBar from '../../components/SearchBar/SearchBar.js'
import Header from '../../components/Header/Header.js'
import './Show.css'
const API_KEY = process.env.API_KEY

function App() {

    const [asset, setAsset] = useState('IBM')
    const [chartData, setChartData] = useState({})
    const [companyData, setCompanyData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const formatData = (data) => {
        return Object.entries(data).map(([key, value]) => {
            return {
                x: key,
                y: value['4. close'] - 0
            }
        })
    }

    const apiCall = async () => {
        setIsLoading(true)
        const [daily, weekly] = await Promise.all([
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${asset}&interval=5min&apikey=demo`)
                .then((res) => {
                    console.log(res.data)
                    return formatData(res.data['Time Series (5min)'])
                }),
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${asset}&interval=60min&apikey=${API_KEY}`)
                .then((res) => {
                    console.log(res.data)
                    return formatData(res.data['Time Series (60min)'])
                }),
            axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${asset}&apikey=demo`)
                .then((res) => {
                    console.log(res.data)
                    setCompanyData(res.data)
                }),
        ])
        setChartData({
            day: daily,
            week: weekly
        })
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
                <Header />
                <h1>{companyData.Name}</h1>
                {/* <SearchBar /> */}
                <StockChart chartData={chartData} companyData={companyData}/>
              </div>
            )
        }
    }

    return render()

}

export default App;

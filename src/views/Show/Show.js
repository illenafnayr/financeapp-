// import './App.css'
import { useState, useEffect } from 'react'
import StockChart from '../../components/Chart/Chart.js'
import axios from 'axios'
// import SearchBar from '../../components/SearchBar/SearchBar.js'
import Header from '../../components/Header/Header.js'
// Styles
import './Show.css'
// API Keys
const AV_API_KEY = process.env.AV_API_KEY
const NEWS_API_KEY = process.env.NEWS_API_KEY

function App() {

    const [asset, setAsset] = useState('AMZN')
    const [chartData, setChartData] = useState({})
    const [companyData, setCompanyData] = useState({})
    const [companyNews, setCompanyNews] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const formatData = (data) => {
        return Object.entries(data).map(([key, value]) => {
            return {
                x: key,
                y: value['4. close'] - 0
            }
        })
    }
    
    // let query;
    const search = (param) => {
        console.log('param', param)
        // query = param;
        setAsset(param)
    }

    const apiCall = async () => {
        setIsLoading(true)
        
        const [daily, weekly] = await Promise.all([
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${asset}&interval=5min&apikey=${AV_API_KEY}`)
                .then((res) => {
                    console.log(res.data)
                    return formatData(res.data['Time Series (5min)'])
                }),
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${asset}&interval=60min&apikey=${AV_API_KEY}`)
                .then((res) => {
                    console.log(res.data)
                    return formatData(res.data['Time Series (60min)'])
                }),
            axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${asset}&apikey=${AV_API_KEY}`)
                .then((res) => {
                    console.log(res.data)
                    setCompanyData(res.data)
                }),
            axios.get(`https://api.polygon.io/v1/meta/symbols/${asset}/news?perpage=50&page=1&apiKey=HvlrSrp7V4UMAWFLEpHiW3FpC9VkDpVU`)
                .then((res) => {
                    console.log(res.data)
                    setCompanyNews(res.data)
                })
        ])
        setChartData({
            day: daily,
            week: weekly
        })
        setIsLoading(false)
    }

    useEffect(() => {
        console.log("asset: ", asset)
        apiCall()
    }, [asset])

    const render = () => {
        if (isLoading) {
            return <div>Loading...</div>
        } else {
            return (
              <div className="App">
                <Header search={search}/>
                <main>
                    <h1>{companyData.Name}</h1>
                    {/* <SearchBar /> */}
                    <div id="chart-container">
                        <StockChart chartData={chartData} companyData={companyData}/>
                    </div>
                    <div id="bottom-row">
                        <div id="details-container">
                            <h2>Company Details</h2>
                            <label>Industry</label>
                            <p className="detail">{companyData.Industry}</p>
                            <label>Asset Type</label>
                            <p className="detail">{companyData.AssetType}</p>
                            <label>Market Cap</label>
                            <p className="detail">${companyData.MarketCapitalization}</p>
                            <label>Moving Average</label>
                            <p className="detail">${companyData['50DayMovingAverage']}</p>
                            <label>Yearly High</label>
                            <p className="detail">${companyData['52WeekHigh']}</p>
                        </div>
                        <div id="news-container">
                            <h2>In The News</h2>
                            {companyNews.slice(0, 4).map((article) => {
                                return (
                                    <div className="news-item" key={article.title}>
                                        <div className="news-title">
                                            <label>{article.title}</label>
                                            <p><a href={article.url}>read more</a></p>
                                        </div>
                                        <img className="news-img" src={article.image} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </main>
              </div>
            )
        }
    }

    return render()

}

export default App;

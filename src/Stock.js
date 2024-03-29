import React, { Component } from 'react'
import Plot from 'react-plotly.js'

 class Stock extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       stockChartXValues: [],
       stockChartYValues: []
    }
  } 
  
  componentDidMount(){
    this.fetchStock()
  }

  fetchStock(){
    const pointerToThis = this
    //from up here we have access to the values x y because using this is returning us an objet with the state values
    console.log(pointerToThis);
    const API_KEY = '9305CW0N2S2MIOAZ'
    // for the key we used https://www.alphavantage.co/support/#api-key
    let StockSymbol = 'AMZN'
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`
    let stockChartXValuesFunction = []
    let stockChartYValuesFunction = []

    fetch(API_Call)
      .then(
        function(response){
          return response.json()
        }
      )
      .then(
        function(data){
          console.log(data);

          for(var key in data['Time Series (Daily)']){
            stockChartXValuesFunction.push(key)
            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open'])
          }
          // console.log(stockChartXValuesFunction);
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          })
        }
      )
  }


  render() {
    return (
      <div>
        <h1>Stock Market</h1>
        <h2>Amazon (AMZN) Stock</h2>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
        />
      </div>
    )
  }
}

export default Stock

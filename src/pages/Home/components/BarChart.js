import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

const BarChart = ({ title }) => {
  const chartRef = useRef('')
  useEffect(() => {
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom)
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'Angular', 'React'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [10, 40, 70],
          type: 'bar',
        },
      ],
    }

    option && myChart.setOption(option)
  }, [title])
  return (
    <div
      ref={chartRef}
      style={{ width: '500px', height: '400px' }}
    />
  )
}

export default BarChart

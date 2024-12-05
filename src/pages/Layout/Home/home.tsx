import { useEffect, useState, useRef } from 'react'
import { getDataCountService } from '../../../api/user'
import { SmileTwoTone, MehTwoTone, PieChartTwoTone, MessageTwoTone } from '@ant-design/icons'
import * as echarts from 'echarts'
import './home.scss'
function Home() {
  const [dataCount, setDataCount] = useState<any>()
  let chartRef1 = useRef<any>(null) //echarts1展示容器的dom
  let chartRef2 = useRef<any>(null) //echarts2展示容器的dom

  useEffect(() => {
    let chartInstance1: any = echarts.init(chartRef1.current)
    let chartInstance2: any = echarts.init(chartRef2.current)

    const circleOption = {
      darkMode: 'auto',
      title: {
        text: '活跃分类使用次数',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: '70%',
          center: ['50%', '55%'],
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const barOption = {
      darkMode: 'auto',
      tooltip: {
        trigger: 'item'
      },
      title: {
        text: '活跃用户贴文数',
        left: 'left'
      },
      grid: {
        x: 50,
        y: 50,
        x2: 25,
        y2: 35
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#6e6e6e',
          fontSize: 10,
          formatter: '{value}'
        }
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          color: '#6e6e6e',
          fontSize: 10,
          formatter: function (value: any) {
            if (value.length > 3) {
              return `${value.slice(0, 3)}...`
            }
            return value
          }
        },
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barWidth: 35,
          color: '#0095ff'
        }
      ]
    }
    //获取评论数，用户量，发帖数，讯息量
    const getDataCount = async () => {
      let res = await getDataCountService()
      setDataCount(res.data.data.data_count)
      circleOption.series[0].data = res.data.data.cate_use_times?.map((item: any) => {
        return { value: item.use_times, name: item.cate_name }
      })
      barOption.series[0].data = res.data.data.active_user_data?.map((item: any) => item.post_num)
      barOption.xAxis.data = res.data.data.active_user_data?.map((item: any) => item.nick_name)
      chartInstance1.setOption(circleOption, true)
      chartInstance2.setOption(barOption, true)
    }
    getDataCount()
  }, [])

  return (
    <>
      <div className="count_card">
        <div className="count_card_item">
          <SmileTwoTone style={{ fontSize: '50px', marginLeft: '20px' }} />
          <div className="count_card_item_text">
            <span>用户数:</span>
            <span style={{ fontWeight: '600' }}>{dataCount?.user_count}</span>
          </div>
        </div>
        <div className="count_card_item">
          <MehTwoTone style={{ fontSize: '50px', marginLeft: '20px' }} />
          <div className="count_card_item_text">
            <span>发帖数:</span>
            <span style={{ fontWeight: '600' }}>{dataCount?.post_count}</span>
          </div>
        </div>
        <div className="count_card_item">
          <PieChartTwoTone style={{ fontSize: '50px', marginLeft: '20px' }} />
          <div className="count_card_item_text">
            <span>评论数:</span>
            <span style={{ fontWeight: '600' }}>{dataCount?.comments_count}</span>
          </div>
        </div>
        <div className="count_card_item">
          <MessageTwoTone style={{ fontSize: '50px', marginLeft: '20px' }} />
          <div className="count_card_item_text">
            <span>讯息数:</span>
            <span style={{ fontWeight: '600' }}>{dataCount?.msg_count}</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div className="chart1" ref={chartRef1}></div>
        <div className="chart2" ref={chartRef2}></div>
      </div>
    </>
  )
}
export default Home

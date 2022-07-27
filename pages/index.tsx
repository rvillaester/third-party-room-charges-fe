import React from 'react'
import Table from 'antd/lib/table'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { axiosInstance } from '../common/axios'
import styles from '../styles/Home.module.css'

export default function Home() {
  const columns = [{
    title: 'Customer Number',
    dataIndex: 'customerNumber',
    key: 'customerNumber',
  }, {
    title: 'Transaction ID',
    dataIndex: 'pk',
    key: 'pk',
  }, {
    title: 'Partner ID',
    dataIndex: 'partnerId',
    key: 'partnerId',
  }, {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  }, {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  }, {
    title: 'Details',
    dataIndex: 'detail',
    key: 'detail',
  }, {
    title: 'Receipt Number',
    dataIndex: 'receiptNumber',
    key: 'receiptNumber',
  }, {
    title: 'Payment Status',
    dataIndex: 'status',
    key: 'status',
  }]

  const [ searchText, setSearchText ] = React.useState('')
  const [ dataSource, setDataSource ] = React.useState([])

  const [ filterDataSoure, setFilterDataSource ] = React.useState(dataSource)

  const handleSearchTextValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    console.log('search', event.target.value)
  
    setSearchText(event.target.value)
  
  }

  const handleSearch = () => {

    const filterData = dataSource.filter((value: any) => value.customerNumber === searchText)

    const responseData = filterData.length ? filterData : dataSource

    console.log('responseData', responseData)

    setFilterDataSource(responseData)

  }

  React.useEffect(() => {
    axiosInstance
      .post('/transaction/fetch', {})
      .then(response => {

        console.log('response', response)

        setDataSource(response.data.transactions)

      }).catch(error => {

        console.log('error', error)

      })
  }, [])

  React.useEffect(() => {

    setFilterDataSource(dataSource)

  }, [dataSource])


  return (
    <div className={styles.container}>
      <main className="associates-table">
        <h1>Hotel</h1>
        <div className="filters">

          <div className="searchbox">
            <Input
              placeholder="Customer Number"
              onPressEnter={handleSearch}
              onChange={handleSearchTextValue}
            />
            <Button onClick={handleSearch}>
              Search
            </Button>
          </div>

        </div>

        <Table dataSource={filterDataSoure} columns={columns} />
      </main>
    </div>
  )
}

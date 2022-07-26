import React from 'react'
import Table from 'antd/lib/table'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { Axios } from '../common/axios'
import styles from '../styles/Home.module.css'

export default function Home() {
  
  const columns = [{
    title: 'Customer Number',
    dataIndex: 'customerNumber',
    key: 'customerNumber',
  }, {
    title: 'Third Party',
    dataIndex: 'thirdPartyNumber',
    key: 'thirdPartyNumber',
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
    dataIndex: 'details',
    key: 'details',
  }, {
    title: 'Payment Status',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
  }]

  const [ searchText, setSearchText ] = React.useState('')
  const [ dataSource ] = React.useState([{
    customerNumber: 'cn123',
    thirdPartyNumber: 'tpn123',
    date: '10/11/2022',
    amount: 1234.56,
    details: <Button>Details</Button>,
    paymentStatus: 'Pending',
  }, {
    customerNumber: 'cn1234',
    thirdPartyNumber: 'tpn1234',
    date: '10/11/2022',
    amount: 1234.567,
    details: <Button>Details</Button>,
    paymentStatus: 'Pending',
  }])

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
    Axios()
      .get('/test')
      .then(response => {

        console.log('response', response)

      }).catch(error => {

        console.log('error', error)

      })
  }, [])


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

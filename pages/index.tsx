import React from 'react'
import { useRouter } from 'next/router';
import Table from 'antd/lib/table'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { axiosInstance } from '../common/axios'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()

  const columns = [{
    title: 'Wallet ID',
    dataIndex: 'walletId',
    key: 'walletId',
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

  const handleRedirectToWallet = () => {
    router.push('/wallet')
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


  const hotelName = typeof localStorage !== 'undefined' ? localStorage.getItem('hotelName') : ''

  return (
    <div className={styles.container}>
      <main className="associates-table">
        <h1>{hotelName}</h1>
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

          <div className="transaction-content">
            <Button type="primary" onClick={handleRedirectToWallet}>
              Go to Wallet
            </Button>
          </div>

        </div>

        <Table dataSource={filterDataSoure} columns={columns} />
      </main>
    </div>
  )
}

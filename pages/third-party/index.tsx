import React from 'react'
import Table from 'antd/lib/table'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import { axiosInstance } from '../../common/axios'
import styles from '../../styles/Home.module.css'

export default function ThirdParty() {
  const [ form ] = Form.useForm();

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

  const [ searchCustomerText, setSearchCustomerText ] = React.useState('')
  const [ searchHotelText, setSearchHotelText ] = React.useState('')
  const [ dataSource, setDataSource ] = React.useState([])

  const [ filterDataSoure, setFilterDataSource ] = React.useState(dataSource)

  const [isModalVisible, setIsModalVisible] = React.useState(false)

  const handleSearchCustomerTextValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    console.log('search', event.target.value)
  
    setSearchCustomerText(event.target.value)
  
  }

  const handleSearchHotelTextValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    console.log('search', event.target.value)
  
    setSearchHotelText(event.target.value)
  
  }

  const handleSearchCustomer = () => {

    const filterData = dataSource.filter((value: any) => value.customerNumber === searchCustomerText)

    if (!searchCustomerText) {
      setFilterDataSource(dataSource)
    } else {
      const responseData = filterData.length ? filterData : []

      console.log('responseData', responseData)

      setFilterDataSource(responseData)
    }

    setSearchCustomerText('')

  }

  const handleSearchHotel = () => {

    if (!searchHotelText) {
      setFilterDataSource(dataSource)
    } else {
      const filterData = dataSource.filter((value: any) => value.hotelName === searchHotelText)
      const responseData = filterData.length ? filterData : []

      console.log('responseData', responseData)

      setFilterDataSource(responseData)
    }

    setSearchHotelText('')
  
  }

  const handleShowModal = () => {

    setIsModalVisible(!isModalVisible)
  
  }

  const handleCreateTransaction = () => {
    setIsModalVisible(false)
  }

  const handleCloseModal = () => {

    setIsModalVisible(false)
  
  }

  const handleSubmitCapture = (response: any) => {
    console.log('response', response)

    setIsModalVisible(false)

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
      <main className="third-party-table">
        <h1>Third Party Store</h1>
        <div className="filters">
          <div className="searchbox">
            <Input
              placeholder="Customer Number"
              onPressEnter={handleSearchCustomer}
              onChange={handleSearchCustomerTextValue}
              value={searchCustomerText}
            />
            <Button onClick={handleSearchCustomer}>
              Search
            </Button>
          </div>

          <div className="searchbox">
            <Input
              placeholder="Hotel Name"
              onPressEnter={handleSearchHotel}
              onChange={handleSearchHotelTextValue}
              value={searchHotelText}
            />
            <Button onClick={handleSearchHotel}>
              Search
            </Button>
          </div>

          <div className="transaction-content">
            <Button onClick={handleShowModal}>
              Create Transaction
            </Button>
          </div>

        </div>
        <Table dataSource={filterDataSoure} columns={columns} />
        <Modal
          title="Create Transaction"
          className="transaction-modal"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[]}
        >
          <Form
            form={form}
            layout="vertical"
            onSubmitCapture={handleSubmitCapture}
          >
            
            <Form.Item label="Hotel">
              <Input placeholder="hotel" />
            </Form.Item>

            <Form.Item label="Customer Number">
              <Input placeholder="Customer #" />
            </Form.Item>

            <Form.Item label="Reference Number">
              <Input placeholder="Reference #" />
            </Form.Item>

            <Form.Item label="Amount">
              <Input placeholder="Amount" />
            </Form.Item>

            <Form.Item label="Description">
              <Input placeholder="description" />
            </Form.Item>

            <Form.Item>
              <Button className="submit-transaction-button" type="primary">Submit</Button>
            </Form.Item>

          </Form>
        </Modal>
      </main>
    </div>
  )
}

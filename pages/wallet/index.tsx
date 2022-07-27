import React from 'react'
import Table from 'antd/lib/table'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import { axiosInstance } from '../../common/axios'
import styles from '../../styles/Home.module.css'

export default function Home() {
  const [ form ] = Form.useForm();

  const columns = [{
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  }, {
    title: 'Hotel ID',
    dataIndex: 'hotelId',
    key: 'hotelId',
  }, {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  }, {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  }, {
    title: 'Wallet ID',
    dataIndex: 'pk',
    key: 'pk',
  }, {
    title: 'Room Number',
    dataIndex: 'roomNumber',
    key: 'roomNumber',
  }, {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  }, {
    title: 'Valid To',
    dataIndex: 'validTo',
    key: 'validTo',
  }]

  const [ searchText, setSearchText ] = React.useState('')
  const [ tabs, setTabs ] = React.useState('form')
  const [ dataSource, setDataSource ] = React.useState([])

  const [ filterDataSoure, setFilterDataSource ] = React.useState(dataSource)
  const [isModalVisible, setIsModalVisible] = React.useState(false)

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

  const handleCreateWallet = (values: any) => {

    const hotelId = localStorage.getItem('hotelId')

    axiosInstance.post('/wallet/create', {
      ...values,
      hotelId,
    }).then(response => {

      console.log('response', response)
      setTabs('qr')
      // setIsModalVisible(false)

    }).catch(error => {
      setTabs('form')
      console.log('error', error)
      // setIsModalVisible(false)
    
    })


  }

  const handleShowModal = () => {

    setIsModalVisible(!isModalVisible)
  
  }

  const handleCloseModal = () => {
    setTabs('form')
    form.resetFields()
    setIsModalVisible(false)
  
  }

  React.useEffect(() => {
    const hotelId = localStorage.getItem('hotelId')
    axiosInstance
      .post('/wallet/fetch', {
        hotelId,
        "active": true
      })
      .then(response => {

        console.log('response', response)

        setDataSource(response.data.wallets || [])

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

          <div className="transaction-content">
            <Button onClick={handleShowModal}>
              Create Wallet
            </Button>
          </div>

        </div>

        <Table dataSource={filterDataSoure} columns={columns} />

        <Modal
          title="Create Wallet"
          visible={isModalVisible}
          className="wallet-modal"
          onCancel={handleCloseModal}
          footer={[]}
        >
          {tabs === 'form' && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateWallet}
          >
            
            <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
              <Input placeholder="First Name" />
            </Form.Item>

            <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
              <Input placeholder="Last Name" />
            </Form.Item>

            <Form.Item name="validTo" label="Valid To" rules={[{ required: true }]}>
              <Input placeholder="Valid To" />
            </Form.Item>

            <Form.Item name="roomNumber" label="Room Number" rules={[{ required: true }]}>
              <Input placeholder="Room Number" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-transaction-button">Submit</Button>
            </Form.Item>

          </Form>
          )}
          {
            tabs === 'qr' && (
              <div>
                <img className="qr-code" src="/qr-code.png" />

                <div className="success-qr">Successfully created a wallet!</div>
              </div>
            )
          }
        </Modal>

      </main>
    </div>
  )
}

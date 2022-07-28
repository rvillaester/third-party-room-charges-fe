import React from 'react'
import QrReader from 'react-qr-reader';
import Table from 'antd/lib/table'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Result from 'antd/lib/result'
import { axiosInstance } from '../../common/axios'
import styles from '../../styles/Home.module.css'

export default function ThirdParty() {
  const [ form ] = Form.useForm();

  const columns = [{
    title: 'Wallet ID',
    dataIndex: 'walletId',
    key: 'walletId',
  }, {
    title: 'Transaction ID',
    dataIndex: 'pk',
    key: 'pk',
  }, {
    title: 'Hotel ID',
    dataIndex: 'hotelId',
    key: 'hotelId',
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
  const [ tabs, setTabs ] = React.useState('form')

  const [ filterDataSoure, setFilterDataSource ] = React.useState(dataSource)

  const [isModalVisible, setIsModalVisible] = React.useState(false)

  const [ walletId, setWalletId ] = React.useState('') 

  const [ formValues, setFormValues ] = React.useState({})

  const [qrResult , setQrResult] = React.useState({})

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

  const handleCloseModal = () => {

    setTabs('form')

    form.resetFields()

    setIsModalVisible(false)

    axiosInstance
      .post('/transaction/fetch', {})
      .then(response => {

        console.log('response', response)

        setDataSource(response.data.transactions)

      }).catch(error => {

        console.log('error', error)

      })
  
  }

  const handleSubmitCapture = (values: any) => {
    console.log('values', values)

    const partnerId = localStorage.getItem('partnerId')

    axiosInstance.post('/transaction/create', {
      ...values,
      partnerId,
    }).then(response => {
      setTabs('success')
    }).catch(error => {
      console.log('error', error)
      setTabs('form')
      setIsModalVisible(false)
    })


  }

  const handleQrResult = (result: any) => {
    console.log('result', result)
    if(result) {
      setQrResult(JSON.parse(result))
      form.setFieldsValue(JSON.parse(result))
      console.log('tabsQRResult', tabs)
      setTabs('form')
    }

  }

  const handleScanQr = () => {
    setTabs('qr')
  }

  const handleFormValuesChange = (values: any) => {
    setFormValues(values)
  }

  const handleScanError = (error: any) => {
    console.log('error', error)
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

  const partnerName = typeof localStorage !== 'undefined' ? localStorage.getItem('partnerName') : ''
  const qrTab = tabs === 'qr' ? <QrReader onScan={handleQrResult} onError={handleScanError} /> : ''

  console.log('tabs', tabs)

  return (
    <div className={styles.container}>
      <main className="third-party-table">
        <h1>{partnerName}</h1>
        <div className="filters">
          <div className="searchbox">
            <Input
              placeholder="Wallet ID"
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
        {isModalVisible && (<Modal
          title="Create Transaction"
          className="transaction-modal"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[]}
        >
          {tabs === 'form' && (
            <React.Fragment>
              <Button className="button-scan" type="primary" onClick={handleScanQr}>
                Scan QR Code
              </Button>
              <Form
              form={form}
              layout="vertical"
              onValuesChange={handleFormValuesChange}
              onFinish={handleSubmitCapture}
            >
              
              <Form.Item name="hotelId" label="Hotel ID" rules={[{ required: true }]}>
                <Input placeholder="Hotel ID" />
              </Form.Item>

              <Form.Item name="walletId" label="Wallet ID" rules={[{ required: true }]}>
                  <Input placeholder="Wallet ID" />
              </Form.Item>

              <Form.Item name="receiptNumber" label="Receipt Number" rules={[{ required: true }]}>
                <Input placeholder="Receipt #" />
              </Form.Item>

              <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
                <Input placeholder="Amount" />
              </Form.Item>

              <Form.Item name="detail" label="Detail">
                <Input placeholder="Detail" />
              </Form.Item>

              <Form.Item>
                <Button className="submit-transaction-button" htmlType="submit" type="primary">Submit</Button>
              </Form.Item>

            </Form>
          </React.Fragment>
          )}


          {qrTab}
          {/* {
            tabs === 'qr' && (
              <QrReader onResult={handleQrResult} constraints={{ facingMode: 'environment' }} />
            )
          } */}

          {tabs === 'success' && (
            <Result
              status="success"
              title="Successful transaction"
              subTitle="Successfully created the transaction"
            />
          )}
          
        </Modal>)}
      </main>
    </div>
  )
}

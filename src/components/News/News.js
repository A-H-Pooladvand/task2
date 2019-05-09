import React, { Component, Fragment } from 'react'
import { Button, ButtonToolbar, FormControl, Table } from 'react-bootstrap'
import Modal from '../Modal'
import news from './data'
import Input from '../Input'
import { empty } from '../../lib/helpers'

let lastId = 0

export default class extends Component {
  state = {
    news: [],
    isModalVisible: false,
    temp: {},
    editable_field: {},
  }

  componentDidMount () {
    this.setNews(news)

  }

  setNews = (news) => {
    this.setState({ news })
  }

  setEditableField = (editable_field) => {
    this.setState({ editable_field: { is_editing: true, ...editable_field } })
  }

  renderEditableField = (id, title, name) => {
    const { editable_field } = this.state

    if (!empty(editable_field) && editable_field.id === id) {
      return <FormControl onKeyUp={(event) => this.handleEdit(event, name)} defaultValue={title}/>

    }

    return <span>{title}</span>
  }

  handleEdit = (event, name) => {
    const { editable_field, news } = this.state

    if (event.keyCode === 13) {
      const index = news.findIndex((item) => item.id === editable_field.id)

      if (index > -1) {
        news[index] = { id: editable_field.id, title: editable_field.title, links: editable_field.links, requests: editable_field.requests }
        this.setState({
          news,
          editable_field: {},
        })
        return
      }
    }

    editable_field[name] = event.target.value

    this.setState({ editable_field })
  }

  showNews = () => {
    const { news } = this.state

    return news.map((item) => {
      lastId = item.id
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td
            onClick={() => this.decreaseRequest(item.id)}
            onDoubleClick={() => this.setEditableField(item)}
          >
            {this.renderEditableField(item.id, item.title, 'title')}
          </td>
          <td>{this.showLinks(item.links)}</td>
          <td>{item.requests}</td>
        </tr>
      )
    })
  }

  showLinks = (links) => {
    return links.map((link, index) => {
      return <div key={index}>{link}</div>
    })
  }

  decreaseRequest = (id) => {
    const { news } = this.state

    const index = news.findIndex((item) => item.id === id)

    if (index > -1) {
      news[index].requests -= 1
      this.setState({ news })
    }

  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  handleKeyUp = (event) => {
    event.persist()

    this.setState((state) => {
      return { temp: { ...state.temp, [event.target.name]: event.target.name === 'links' ? [event.target.value] : event.target.value } }
    })
  }

  handleSubmit = () => {
    const news = [...this.state.news, { id: ++lastId, ...this.state.temp }]

    this.setNews(news)
    this.toggleModal()
  }

  render () {
    return (
      <Fragment>

        <ButtonToolbar className='mt-3 mb-3'>
          <Button variant="info" onClick={this.toggleModal}>افزودن خبر گذاری</Button>

          <Modal
            show={this.state.isModalVisible}
            onHide={this.toggleModal}
            headerTitle='افزودن خبر گذاری'
            onSubmit={this.handleSubmit}
          >
            <Input onKeyUp={this.handleKeyUp} name='title' placeholder='عنوان'/>
            <Input onKeyUp={this.handleKeyUp} name='links' placeholder='لینک'/>
            <Input onKeyUp={this.handleKeyUp} name='requests' placeholder='تعداد درخواست'/>
          </Modal>
        </ButtonToolbar>

        <Table striped hover>
          <thead>
          <tr>
            <th>#</th>
            <th>خبر گذاری</th>
            <th>لینک ها</th>
            <th>تعداد درخواست</th>
          </tr>
          </thead>
          <tbody>
          {this.showNews()}
          </tbody>
        </Table>

      </Fragment>
    )
  }
}
import React, { Component } from 'react'
import { Card, Button,Modal } from 'antd'
import './ui.less'

export default class Modals extends Component {
    state = { 
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false
     };
    handleOpen = (type) => {
        this.setState({
            [type]:true
        });
    };
    handleConfirm = (type) =>{
        Modal[type]({
            title:'确认？',
            content:'您确定要放弃骑车吗？',
            onOk(){
                console.log('OK')
            },
            onCancel(){
                console.log("Cancel")
            }
        })
    }
    render() {
        return (
            <div>
                <Card title="基础模态框" className="card">
                    <Button type="primary" onClick={() =>this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={() =>this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() =>this.handleOpen('showModal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() =>this.handleOpen('showModal4')}>水平垂直居中弹框</Button>
                </Card>
                <Card title="信息确认框" className="card">
                    <Button type="primary" onClick={() =>this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() =>this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() =>this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() =>this.handleConfirm('error')}>Error</Button>
                    <Button type="primary" onClick={() =>this.handleConfirm('warning')}>Warning</Button>
                </Card>
                    <Modal
                        title="温馨提示"
                        visible={this.state.showModal1}
                        onCancel={()=>{
                            this.setState({
                                showModal1:false
                            })
                        }}
                        onOk={()=>{
                            this.setState({
                                showModal1:false
                            })
                        }}
                        >
                            <p>共享单车不能驶出规定范围内哦！</p>
                    </Modal>
                    <Modal
                        title="温馨提示"
                        visible={this.state.showModal2}
                        okText="好的"
                        cancelText="算了"
                        onCancel={()=>{
                            this.setState({
                                showModal2:false
                            })
                        }}
                        onOk={()=>{
                            this.setState({
                                showModal2:false
                            })
                        }}
                        >
                            <p>共享单车不能驶出规定范围内哦！</p>
                    </Modal>
                    <Modal
                        title="温馨提示"
                        visible={this.state.showModal3}
                        style={{top:20}}
                        onCancel={()=>{
                            this.setState({
                                showModal3:false
                            })
                        }}
                        onOk={()=>{
                            this.setState({
                                showModal3:false
                            })
                        }}
                        >
                            <p>共享单车不能驶出规定范围内哦！</p>
                    </Modal>
                    <Modal
                        title="温馨提示"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.showModal4}
                        onCancel={()=>{
                            this.setState({
                                showModal4:false
                            })
                        }}
                        onOk={()=>{
                            this.setState({
                                showModal4:false
                            })
                        }}
                        >
                            <p>共享单车不能驶出规定范围内哦！</p>
                    </Modal>
            </div>
        )
    }
}

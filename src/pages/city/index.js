import React, { Component } from 'react'
import {Card,Button,Table,Form, Select,Modal, message} from 'antd';
import axios from './../../axios/index';
import Utils from './../../util/utils'
import './../../style/common.less'

export default class City extends Component {
    
    state = {
        list:[],
        isShowOpenCity:false
    }
    params = {
        page:1
    }
    componentDidMount(){
        this.requestList();
    }

    //默认请求接口数据
    requestList = ()=>{
        let _this = this;
        axios.ajax({
            url:'/open_city',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            let list = res.result.item_list.map((item,index)=>{
                item.key = index;
                return item;
            });
            this.setState({
                list,
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    //开通城市
    handleOpenCity = ()=>{
        this.setState({
            isShowOpenCity:true
        })
    }
    //开通城市提交
    handleSubmit = ()=>{
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        axios.ajax({
            url:'/city/open',
            data:{
                params:cityInfo
            }
        }).then((res)=>{
            if(res.code === '0'){
                message.success('开通成功');
                this.setState({
                    isShowOpenCity:false
                })
                this.requestList();
            }
        })
    }

    render() {
        const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            },{
                title:'城市名称',
                dataIndex:'name'
            },{
                title:'用车模式',
                dataIndex:'mode',
                render(mode){
                    return mode === 1 ? '停车点' : '禁停区';
                }
            },{
                title:'运营模式',
                dataIndex:'op_mode',
                render(op_mode){
                    return op_mode === 1 ? '自营' : '加盟';
                }
            },{
                title:'授权加盟商',
                dataIndex:'franchisee_name'
            },{
                title:'城市管理员',
                dataIndex:'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join(',');
                }
            },{
                title:'城市开通时间',
                dataIndex:'open_time'
            },{
                title:'操作时间',
                dataIndex:'update_time',
                render:Utils.formateDate
            },{
                title:'操作人',
                dataIndex:'sys_user_name'
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:'10px'}}>
                    <Button type='primary' onClick={this.handleOpenCity} >开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title='开通城市'
                    visible={this.state.isShowOpenCity}
                    onCancel={()=>{
                        this.setState({
                            isShowOpenCity:false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>
                </Modal>
            </div>
        )
    }
}

class FilterForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        return (
            <Form layout='inline'>
                <Form.Item label='城市'>
                    {
                        getFieldDecorator('city_id')(
                            <Select 
                                placeholder='全部'
                                style={{width:80}}
                            >
                                <Option value=''>全部</Option>
                                <Option value='1'>北京市</Option>
                                <Option value='2'>天津市</Option>
                                <Option value='3'>深圳市</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label='用车模式'>
                    {
                        getFieldDecorator('mode')(
                            <Select placeholder='全部' style={{width:140}}>
                                <Option value=''>全部</Option>
                                <Option value='1'>指定停车点模式</Option>
                                <Option value='2'>禁停区模式</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label='运营模式'>
                    {
                        getFieldDecorator('op_mode')(
                            <Select placeholder='全部' style={{width:80}}>
                                <Option value=''>全部</Option>
                                <Option value='1'>自营</Option>
                                <Option value='2'>加盟</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label='加盟商授权状态'>
                    {
                        getFieldDecorator('auth_status')(
                            <Select placeholder='全部' style={{width:80}}>
                                <Option value=''>全部</Option>
                                <Option value='1'>已授权</Option>
                                <Option value='2'>未授权</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type='primary' style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
//通过form.create实现自动绑定功能
FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends Component {
    render() {
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:8
            }
        }
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        return (
            <Form layout='horizontal'>
                <Form.Item label='选择城市'  {...formItemLayout}>
                    {
                        getFieldDecorator('city_id')(
                            <Select 
                                placeholder='全部'
                                style={{width:80}}
                            >
                                <Option value=''>全部</Option>
                                <Option value='1'>北京市</Option>
                                <Option value='2'>天津市</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label='运营模式'  {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode')(
                            <Select placeholder='自营' style={{width:80}}>
                                <Option value='1'>自营</Option>
                                <Option value='2'>加盟</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label='用车模式'  {...formItemLayout}>
                    {
                        getFieldDecorator('mode')(
                            <Select style={{width:140}}>
                                <Option value='1'>指定停车点模式</Option>
                                <Option value='2'>禁停区模式</Option>
                            </Select>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}
OpenCityForm = Form.create({})(OpenCityForm);


import React from "react"
import { Row, Col } from 'antd';
import {Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal} from 'antd';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

 class PCHeader extends React.Component{
    constructor(){
        super();
        this.state={
            current:"top",
            modalVisiable:false,
            action:'login',
            haslogined:false,
            userNickName:'',
            userid:0,
            lg_state:true,
            rg_state:false
        }
    }

     componentWillMount(){
         if (localStorage.userid!='') {
             this.setState({hasLogined:true});
             this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
         }
     };


     setModalVisible(value)
     {
         console.log("显示"+value);
         this.setState({modalVisible: value});
     };
     handleClick(e) {
         console.log("显示值"+e.key);
         if (e.key == "register") {
             this.setState({current: 'register'});
             this.setModalVisible(true);
         } else {
             {
                 this.setState({current: e.key});
             }
         }
     };
     handleSubmit(e){
         //页面开始向 API 进行提交数据
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
             if (!err) {
                 console.log('Received values of form: ', values);

                 let myFetchOptions = {
                     method: 'GET'
                 };
                 let formData= this.props.form.getFieldsValue();
                 console.log(formData);
                 fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
                     + "&username="+formData.userName+"&password="+formData.password
                     +"&r_userName=" + formData.r_userName + "&r_password="
                     + formData.r_password + "&r_confirmPassword="
                     + formData.r_confirmPassword, myFetchOptions)
                     .then(response => response.json())
                     .then(json => {
                         console.log("返回的"+json);
                         this.setState({userNickName: json.NickUserName, userid: json.UserId});
                         localStorage.userid= json.UserId;
                         localStorage.userNickName = json.NickUserName;
                     });
                 if (this.state.action=="login") {
                     this.setState({hasLogined:true});
                 }
                 message.success("请求成功！");
                 this.setModalVisible(false);
             }
         });
     }
     callback(key) {
         if (key == 1) {
             this.setState({action: 'login'});
             this.setState({
                 lg_state:true,
                 rg_state:false
             })
         } else if (key == 2) {
             this.setState({action: 'register'});
             this.setState({
                 lg_state:false,
                 rg_state:true,
                 hasLogined:true
             })
         }
     };
     logout(){
         localStorage.userid= '';
         localStorage.userNickName = '';
         this.setState({hasLogined:false});
     };

    render(){
        const { getFieldDecorator  } = this.props.form;
        const userShow = this.state.hasLogined
            ? <Menu.Item key="logout" class="register">
                <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Router>
                    <Link  target="_blank" to={`#/usercenter`}>
                        <Button type="dashed" htmlType="button">个人中心</Button>
                    </Link>
                </Router>
                &nbsp;&nbsp;
                <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" class="register">
                <Icon type="appstore"/>注册/登录
            </Menu.Item>;

        return(
            <header>
                <Row>
                    <Col span={2} ></Col>
                    <Col span={4}>
                        <a href="/" className="logo">
                            <img src="./src/images/logo.png" alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)}  selectedKeys={[this.state.current]}>
                            <Menu.Item key="top">
                                <Icon type="appstore"/>头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore"/>国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore"/>体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore"/>科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore"/>时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                    <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText = "关闭">
                        <Tabs type="card" onChange={this.callback.bind(this)}>
                            <TabPane tab="登录" key="1">
                                <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem label="账户">
                                        {getFieldDecorator ('userName', {
                                            rules: [{ required: this.state.lg_state, message: 'Please input your username!' }],
                                        })(
                                        <Input placeholder="请输入您的账号" />
                                        )}
                                    </FormItem>
                                    <FormItem label="密码">
                                        {getFieldDecorator ('password', {
                                            rules: [{ required: this.state.lg_state, message: 'Please input your Password!' }],
                                        })(
                                        <Input type="password" placeholder="请输入您的密码"/>
                                        )}
                                    </FormItem>
                                    <Button type="primary" htmlType="submit">登录</Button>
                                </Form>
                            </TabPane>
                            <TabPane tab="注册" key="2">
                                <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem label="账户">
                                        {getFieldDecorator ('r_userName',{
                                            rules: [{ required: this.state.rg_state, message: '请输入您的账号' }],
                                        })(
                                            <Input placeholder="请输入您的账号" />
                                        ) }
                                    </FormItem>
                                    <FormItem label="密码">
                                        {
                                            getFieldDecorator ('r_password', {
                                                rules: [{ required: this.state.rg_state, message: '请输入您的密码' }],
                                            })(
                                                <Input type="password" placeholder="请输入您的密码"/>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label="确认密码">
                                        {
                                            getFieldDecorator ('r_confirmPassword', {
                                                rules: [{ required: this.state.rg_state, message: '请输入您的密码' }],
                                            })(
                                                <Input type="password" placeholder="请再次输入您的密码" />
                                            )
                                        }
                                    </FormItem>
                                    <Button type="primary" htmlType="submit" >注册</Button>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Modal>
                </Row>
            </header>
        )
    }
}

export default PCHeader = Form.create({})(PCHeader);
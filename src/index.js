
import { HashRouter, Route, Link, Switch} from 'react-router-dom';
import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import PCIndex from "./js/components/pc_index"
import PCNewsDetails from './js/components/pc_news_details';
import PCUserCenter from './js/components/pc_usercenter';
import MediaQuery from 'react-responsive';
import MobileIndex from './js/components/mobile_index';
import MobileNewsDetails from "./js/components/mobile_news_details";
import MobileUserCenter from './js/components/mobile_usercenter';

export default class Root extends React.Component{
	render(){
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    < HashRouter>
                        <Switch>
                            <Route exact path="/" component={PCIndex}></Route>
                            <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
                            <Route path="/usercenter" component={PCUserCenter}></Route>
                        </Switch>
                    </ HashRouter>
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                    < HashRouter>
                        <Switch>
                            <Route exact path="/" component={MobileIndex}></Route>
                            <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
                            <Route path="/usercenter" component={MobileUserCenter}></Route>
                        </Switch>
                    </ HashRouter>
                </MediaQuery>
            </div>
        );
    }
}


ReactDOM.render(
    <Root />,
	document.getElementById('app')
	);



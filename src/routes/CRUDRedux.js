import React from 'react';
import { connect } from 'dva';
import styles from './CRUD.css';
import Searchata from '../components/Searchdata'
import Addata from '../components/Addata'
import Showdata from '../components/Showdata'

var Laozhang = React.createClass({

    getInitialState: function () {
        return {
            flowers: [
                [{ id: 0, flower: "红玫瑰", origin: "Iceland", count: 99, unitprice: 1, totalprice: 0 }],
                [{ id: 1, flower: "白玫瑰", origin: "Iceland", count: 50, unitprice: 10, totalprice: 0 }],
                [{ id: 2, flower: "蓝色妖姬", origin: "Iceland", count: 69, unitprice: 30, totalprice: 0 }],
                [{ id: 3, flower: "丁香", origin: "Neverland", count: 9, unitprice: 40, totalprice: 0 }],
                [{ id: 4, flower: "海棠", origin: "Neverland", count: 19, unitprice: 80, totalprice: 0 }],
                [{ id: 5, flower: "合欢", origin: "Neverland", count: 3, unitprice: 99, totalprice: 0 }],
                [{ id: 6, flower: "薰衣草", origin: "Iceland", count: 1, unitprice: 2, totalprice: 0 }],
            ]
        }
    },
    handleChange: function (rowdata) {
        this.setState({
            flowers: rowdata
        })
    },
    handleGO: function () {
       // console.log(this.props.crud);
      // console.log(flowersList)
        this.props.dispatch({ type: 'crud/test', payload: "123" });
    },
    render: function () {
        return (
            <div>
                <h1>老张花店</h1>
                <Searchata sea={this.handleChange} flowers={this.state.flowers}></Searchata>
                <Showdata del={this.handleChange} flowers={this.state.flowers}></Showdata>
                <Addata add={this.handleChange} flowers={this.state.flowers}></Addata>
                <button onClick={this.handleGO}>Test</button>
                <p>本页面已组建化并采用Redux进行状态管理</p>
                <p>Writed By Shawn</p>
                <p>Synnex 2017.11.29</p>
            </div>
        );
    }
})


Laozhang.propTypes = {
};

// 方法引入Redux  输入的是 namespace
function mapStateToProps({crud}) {
    return {crud}
}

// export default connect(({ crud }) => ({ crud }))(Laozhang);
export default connect(mapStateToProps)(Laozhang);







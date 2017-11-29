import React from 'react';
import { connect } from 'dva';
import EditableTable from '../components/table'

var AntedLaoZhang = React.createClass({

    getInitialState: function () {
        return {
            flowers: [
                [{ id: 0, flower: "红玫瑰", origin: "Iceland", count: 99, unitprice: 10 }],
                [{ id: 1, flower: "白玫瑰", origin: "Iceland", count: 99, unitprice: 10 }],
                [{ id: 2, flower: "蓝色妖姬", origin: "Iceland", count: 99, unitprice: 10 }],
                [{ id: 3, flower: "丁香", origin: "Iceland", count: 99, unitprice: 10 }],
                [{ id: 4, flower: "海棠", origin: "Iceland", count: 99, unitprice: 10 }],
                [{ id: 5, flower: "合欢", origin: "Iceland", count: 99, unitprice: 10 }],
                [{ id: 6, flower: "薰衣草", origin: "Iceland", count: 99, unitprice: 10 }],
            ]
        }
    },
    handleChange: function (rowdata) {
        this.setState({
            flowers: rowdata
        })
    },
    render: function () {
        return (
            <div>
                <h1>老张花店</h1>
                <EditableTable></EditableTable>
            </div>
        );
    }
})

AntedLaoZhang.propTypes = {
};

export default connect()(AntedLaoZhang);




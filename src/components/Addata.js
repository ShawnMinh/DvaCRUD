import React from 'react';
import { connect } from 'dva';
import styles from '../routes/CRUD.css';


var Addata = React.createClass({
    getInitialState: function () {
        return {
            MOMMOMflowers: this.props.flowers
        }
    },
    handleAdd: function (e) {
        e.preventDefault();
        var flowers = this.state.MOMMOMflowers;
        var data = [{ id: flowers.length, flower: "", origin: "", count: 0, unitprice: 0 }];
        //数据推入  数据更新
        flowers.push(data);
        console.log(flowers);
        this.props.add(flowers);
    },
    render: function () {
        return (
            <div className={styles.docrude}>
                <p className={styles.add}>
                    <span onClick={this.handleAdd}>增加一条数据</span>
                </p>
            </div>
        );
    }

})

Addata.propTypes = {
};
const Adddata = Addata
export default Adddata;

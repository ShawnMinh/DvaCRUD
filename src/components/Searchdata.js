
import React from 'react';
import { connect } from 'dva';
import styles from '../routes/CRUD.css';


var Searchata = React.createClass({
    getInitialState: function () {
        return {
            choice: 0,
            MoMflowers: this.props.flowers
        }
    },
    handleSearch: function (e) {
        var flowers = this.state.MoMflowers;
        var fliterflowers = [];
        if (this.refs.cho.value == "") {
            this.props.sea(this.state.MoMflowers);
            return;
        }
        if (this.state.choice == 0) {
            flowers.map(function (item, i) {
                if (item[0].id == this.refs.cho.value || item[0].flower == this.refs.cho.value || item[0].origin == this.refs.cho.value || item[0].count == this.refs.cho.value || item[0].unitprice == this.refs.cho.value) {
                    fliterflowers.push(item);
                    return;
                }
            }.bind(this))
        } else {
            flowers.map(function (item, i) {
                if (item[0][this.state.choice] == this.refs.cho.value) {
                    fliterflowers.push(item);
                    return;
                }
            }.bind(this))
        }

        this.props.sea(fliterflowers);
    },
    handleRadioChange: function (e) {
        var inp = e.target;
        if (inp.name != "condition") {
            return;
        }
        var selectvalue = this.refs.condition.options[this.refs.condition.selectedIndex].value;   //  selectvalue为选中的值
        this.setState({ choice: selectvalue });
        this.handleSearch();
        this.refs.cho.value = "";
        console.log(selectvalue)
    },
    handleReset: function () {
        this.refs.cho.value = "";
        var flowers = this.state.MoMflowers;
        this.props.sea(flowers);
    },
    render: function () {
        return (
            <div className={styles.choice}>
                <p className={styles.add}>
                    <input type="text" ref="cho" className={styles.cho} placeholder="需要筛选的内容" onChange={this.handleSearch} />
                    <div className={styles.cond} onClick={this.handleRadioChange}>
                        <select name="condition" id="xx" ref="condition">
                            <option value="0" checked>All</option>
                            <option value="id">id</option>
                            <option value="flower">flower</option>
                            <option value="origin">origin</option>
                            <option value="count">count</option>
                            <option value="unitprice">unitprice</option>
                        </select>
                    </div>
                    <span onClick={this.handleReset}>ReSet</span>

                </p>
            </div>
        );
    }

})


const Searchdata = Searchata;

export default Searchdata;
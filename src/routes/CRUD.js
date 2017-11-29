import React from 'react';
import { connect } from 'dva';
import styles from './CRUD.css';


var Laozhang = React.createClass({

    getInitialState: function () {
        return {
            flowers: [
                [{ id: 1, flower: "红玫瑰", origin: "Iceland", count: 99, unitprice: 1, totalprice: 0 }],
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
    render: function () {
        return (
            <div>
                <h1>老张花店</h1>
                <Searchata sea={this.handleChange} flowers={this.state.flowers}></Searchata>
                <Showdata del={this.handleChange} flowers={this.state.flowers}></Showdata>
                <Addata add={this.handleChange} flowers={this.state.flowers}></Addata>
                <p> Writed By Shawn </p>
                <p>Synnex 2017.11.29</p>
            </div>
        );
    }
})


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


var Showdata = React.createClass({
    getInitialState: function () {
        return {
            times: true,
            Save: false,
            editwhat: null,
            Fatherflowers: this.props.flowers
        }
    },
    handleDel: function (e) {
        e.preventDefault();
        var delwhat = e.target.getAttribute('data-key');
        this.props.flowers.splice(delwhat, 1);
        // console.log(this.props.flowers)
        this.props.del(this.props.flowers);
    },
    handlesort: function (e) {
        var what = e.target.getAttribute("data-key");
        // 每次重置 
        var flowers = this.props.flowers;
        for (var unfix = flowers.length - 1; unfix > 0; unfix--) {
            /*给进度做个记录，比到未确定位置*/
            for (var i = 0; i < unfix; i++) {
                if (flowers[i][0][what] > flowers[i + 1][0][what]) {
                    var temp = flowers[i];
                    flowers.splice(i, 1, flowers[i + 1]);
                    flowers.splice(i + 1, 1, temp);
                }
            }
        }

        if (this.state.times) {
            flowers.reverse();
            this.setState({ times: false })
        } else {
            this.setState({ times: true })
        }
        //借用删除设置
        this.props.del(flowers);


        //冒泡排序
        function bubbleSort(array) {
            /*给每个未确定的位置做循环*/
            for (var unfix = array.length - 1; unfix > 0; unfix--) {
                /*给进度做个记录，比到未确定位置*/
                for (var i = 0; i < unfix; i++) {
                    if (array[i] > array[i + 1]) {
                        var temp = array[i];
                        array.splice(i, 1, array[i + 1]);
                        array.splice(i + 1, 1, temp);
                    }
                }
            }
        }


    },
    componentWillMount: function () {
        var newf = this.state.Fatherflowers;
        newf.map(function (item, i) {
            item[0].totalprice = item[0].count * item[0].unitprice;
        });
        this.props.del(newf);
    },
    handleEdit: function (e) {
        var whatclu = parseInt(e.target.getAttribute('data-key'));
        var newf = this.state.Fatherflowers;
        this.setState({ editwhat: whatclu, Save: true });
    },
    handleUpdata: function (e) {
        var whatclu = parseInt(e.target.getAttribute('data-key'));
        var newf = this.state.Fatherflowers;
        if ( !this.refs.flowerX.value || !this.refs.originX.value || !this.refs.countX.value || !this.refs.unitpriceX.value) {
            alert("若想添加数据 每一项都不能为空");
            return;
        }
        newf[whatclu][0].flower = this.refs.flowerX.value;
        newf[whatclu][0].origin = this.refs.originX.value;
        newf[whatclu][0].count = parseInt( this.refs.countX.value);
        newf[whatclu][0].unitprice = parseInt( this.refs.unitpriceX.value);
        newf[whatclu][0].totalprice = newf[whatclu][0].count * newf[whatclu][0].unitprice;

        //借用del
        this.props.del(newf);
        this.setState({ editwhat: 999, Save: false })
    },
    handleTest: function () {
        console.log("Yes");
    },
    render: function () {
        return (
            <div className={styles.databox}>
                <p className={styles.tit}>
                    <span className={styles.sort} onClick={this.handlesort} data-key="id" >ID</span>
                    <span>Flower</span>
                    <span>Origin</span>
                    <span className={styles.sort} onClick={this.handlesort} data-key="count" >Count</span>
                    <span className={styles.sort} onClick={this.handlesort} data-key="unitprice" >UnitPrice</span>
                    <span className={styles.sort} onClick={this.handlesort} data-key="totalprice" >TotalPrice</span>
                    <span>DoSth</span>
                </p>

                <div className={styles.databoxmain}>
                    {
                        this.props.flowers.map(function (item, i) {
                            {/*必须出现key  */ }
                            return (
                                <div key={i} >
                                    {
                                        item.map(function (x, y) {
                                            return (
                                                <p key={y} className={styles.onedata} >
                                                    <span>  <input type="text" ref="id" value={x.id} readOnly />  </span>
                                                    {
                                                        this.state.editwhat != i ?
                                                            <div>
                                                                <span>  <input type="text" ref="flower" value={x.flower} readOnly />   </span>
                                                                <span>  <input type="text" ref="origin" value={x.origin} readOnly /> </span>
                                                                <span>  <input type="text" ref="count" value={x.count} readOnly />  </span>
                                                                <span>  <input type="text" ref="unitprice" value={x.unitprice} readOnly /></span>
                                                            </div>
                                                            :
                                                            <div>
                                                                <span>  <input type="text" ref="flowerX" className={styles.change} onChange={this.handleTest} />   </span>
                                                                <span>  <input type="text" ref="originX" className={styles.change} onChange={this.handleTest}/> </span>
                                                                <span>  <input type="text" ref="countX" className={styles.change} onChange={this.handleTest}/>  </span>
                                                                <span>  <input type="text" ref="unitpriceX" className={styles.change} onChange={this.handleTest}/></span>
                                                            </div>
                                                    }
                                                    <span>  <input type="text" ref="totalprice" value={x.count * x.unitprice} readOnly /> </span>
                                                    <span>
                                                        <span className={styles.delete} onClick={this.handleDel} data-key={i}>Delete</span>
                                                        {
                                                            this.state.Save && (this.state.editwhat == i) ?
                                                                <span className={styles.delete} onClick={this.handleUpdata} data-key={i} >Save</span>
                                                                :
                                                                <span className={styles.delete} onClick={this.handleEdit} data-key={i} >Change</span>
                                                        }
                                                    </span>
                                                </p>
                                            )
                                        }.bind(this))
                                    }

                                </div>
                            )
                        }.bind(this))
                    }
                </div>
            </div>
        );
    }
})


Laozhang.propTypes = {
};

export default connect()(Laozhang);




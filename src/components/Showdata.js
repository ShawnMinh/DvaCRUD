import React from 'react';
import { connect } from 'dva';
import styles from '../routes/CRUD.css';


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
        this.setState({ editwhat: whatclu, Save: true });
    },
    handleUpdata: function (e) {
        var whatclu = parseInt(e.target.getAttribute('data-key'));
        var newf = this.state.Fatherflowers;
        if (!this.refs.flowerX.value || !this.refs.originX.value || !this.refs.countX.value || !this.refs.unitpriceX.value) {
            alert("若想添加数据 每一项都不能为空");
            return;
        }
        newf[whatclu][0].flower = this.refs.flowerX.value;
        newf[whatclu][0].origin = this.refs.originX.value;
        newf[whatclu][0].count = parseInt(this.refs.countX.value);
        newf[whatclu][0].unitprice = parseInt(this.refs.unitpriceX.value);
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
                            console.log(this.props.flowers,item)
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
                                                                <span>  <input type="text" ref="originX" className={styles.change} onChange={this.handleTest} /> </span>
                                                                <span>  <input type="text" ref="countX" className={styles.change} onChange={this.handleTest} />  </span>
                                                                <span>  <input type="text" ref="unitpriceX" className={styles.change} onChange={this.handleTest} /></span>
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

const showdata = Showdata;
showdata.propTypes = {
};

export default showdata;

import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import CRUD from './routes/CRUD';
import AntdCRUD from './routes/AntdCRUD';
import testcrud from './routes/CRUDRedux';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={CRUD} />
        <Route path="/test" exact component={testcrud} />
        <Route path="/crud" exact component={AntdCRUD} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

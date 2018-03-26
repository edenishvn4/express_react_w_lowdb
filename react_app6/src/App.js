import React, { Component } from 'react';
import axios from 'axios';

import Getdata from './comp/Getdata';

class App extends Component {
  constructor(){
    super();
    this.state={
      nm:'',
      eml:'',
      pwd:''
    }
  }
  klik2(){
    this.setState({nm:this.refs.nama.value,eml:this.refs.email.value,pwd:this.refs.pass.value})
  }
  componentWillUpdate(x,y){
    var data={
      nama:y.nm,
      email:y.eml,
      password:y.pwd
    }
    console.log(data);
      axios.post('http://localhost:3002/api',data).then((res)=>{
        console.log("Response server :",res)
      })
  }
  render() {
    return (
      <div className="container">
      <form>
            <div className="form-group">
            <label htmlFor="exampleInputName">Name</label>
            <input type="text" className="form-control" ref="nama" id="exampleInputName" placeholder="Name"/>
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" ref="email" id="exampleInputEmail1" placeholder="Enter email"/>
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" ref="pass" id="exampleInputPassword1" placeholder="Password"/>
            </div>
          <button type="submit" className="btn btn-primary"onClick={()=>{this.klik2();}}>Post data</button>
        </form>  
        <Getdata />
      </div>
    );
  }
}
export default App;

import React, { Component } from 'react';
import axios from 'axios';

class Getdata extends Component{
    constructor(){
        super();
        this.state={
            dataUser:[]
        }
      }
      klik(){
        axios.get('http://localhost:3002/api').then((ambilData) => {
            console.log(ambilData);
            this.setState({
                dataUser: ambilData.data,
            });
          });
      }
    //   hapus(){
    //       var idx= this.refs.del;
    //       axios.delete('http://localhost:3002/api/'+idx);
    //   }
      render(){
        const data = this.state.dataUser.map((item, index) => {
            var nama = item.nama;
            var email = item.email;
            return <tr><td key={index}>{nama}</td><td key={index}>{email}</td><td key={index}><button type="submit" ref="del" className="btn btn-danger" onClick={()=>{this.hapus();}}>Delete</button></td></tr>;
          })
          return(
              <div>       
                <br/>     
                <button type="submit" className="btn btn-primary" onClick={()=>{this.klik();}}>Get data</button>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nama</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
               </div>
          )
      }
}
export default Getdata;
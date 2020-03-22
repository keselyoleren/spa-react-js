import React, {Component} from 'react'


class Users extends Component{
    constructor(props){
        super(props)
        this.state = {
            type : '',
            items:[],           
        }
        this.onSelectedTypeChange = this.onSelectedTypeChange.bind(this)
    }

    onSelectedTypeChange(event){
        this.setState({
            type: event.target.value
        })
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => this.setState({items:json}))
    }

    render(){
        const {items} = this.state
        return(   
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form>
                            <select className="form-control" onChange={this.onSelectedTypeChange} >
                                {items.map((item, index) => <option key={index} value={item.id}>{item.name}</option> )}    
                            </select>
                        </form>        
                    </div>
                    <div className="col-md-12">
                        <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Name</th>
                                <th scope="col">username</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index)=> 
                                <tr key={index}>
                                    <th>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                </tr>
                            )}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Users
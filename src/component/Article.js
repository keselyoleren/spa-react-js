import React, {Component} from 'react'

class Article extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => this.setState({posts:json}))
    }
    
    
    render() {
        const {posts} = this.state        
        return (
            <div className="container">
                {posts.map((item, index) => 
                    <div key={index} className="card">
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.body}</p>
                        </div>
                    </div>
                )}  
                <br></br>  
            </div>
        )
    }
}


export default Article
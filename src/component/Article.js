import React, {Component} from 'react'
import axios from 'axios'

class Article extends Component {
    constructor(props){
        super(props)
        this.state = {
            all_post: [],
            posts :{
                id:'',
                title:'',
                body:'',
                userId:1
            },
            isUpdate: false
        }
        this.deletePosts = this.deletePosts.bind(this)
    }

    getAllPost = () => {
        axios.get('http://localhost:3000/posts?_sort=id&_order=desc')
            .then((result) => {
                this.setState({
                    all_post: result.data
                })
            })
    }

    componentDidMount(){
        this.getAllPost()
    }
    
    postToApi = () => {
        axios.post('http://localhost:3000/posts', this.state.posts)
                .then((res) => {
                   this.getAllPost()
                   this.setState({
                        posts:{
                            title:'',
                            body:''
                        }
                   })
                })
    }

    deletePosts = (data) => {
        let id = data.id
        axios.delete("http://localhost:3000/posts/"+id).then((res) => {
            this.getAllPost()
        })
    }

    updatePost = (data) => {
        this.setState({
            posts:data,
            isUpdate:true
        })
    }


    saveUpdate = () => {
        let id = this.state.posts.id
        axios.put('http://localhost:3000/posts/' + id, this.state.posts)
            .then((res) => {
                this.getAllPost()
                this.setState({
                    isUpdate:false,
                    posts:{
                        title:'',
                        body:''
                    }
                })
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.state.isUpdate){
            this.saveUpdate()
         
        } else {
            this.postToApi()
         
        }
        
        
    }

    handleOnChagne = (event) => {
        let newPost = {...this.state.posts}
        let post_id = new Date().getTime()
        if(!this.state.isUpdate){
            newPost['id'] = post_id
        }
        newPost[event.target.name] = event.target.value
        this.setState({
            posts: newPost,
        })        
    }

    
    render() {
        const {all_post} = this.state        
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} id="post">
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Title</label>
                        <input type="text" value={this.state.posts.title} className="form-control" name="title" onChange={this.handleOnChagne} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">body</label>
                        <textarea type="text" name="body" value={this.state.posts.body} className="form-control" onChange={this.handleOnChagne} />
                    </div>
                    <div className="form-group">                        
                        <button className="btn btn-info form-control" type="submit" >save</button>
                    </div>
                </form>
            
                {all_post.map((item, index) => 
                    <div key={index} className="card">
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.body}</p>
                            <button className="btn btn-info" onClick={this.updatePost.bind(this, item)}>Update</button>
                            <button className="btn btn-danger" onClick={this.deletePosts.bind(this, item)}>Delete</button>
                        </div>
                    </div>
                )}  
                <br></br>  
            </div>
        )
    }
}


export default Article
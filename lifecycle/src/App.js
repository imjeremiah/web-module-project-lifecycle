import React from "react";
import axios from "axios";
import './App.css';

class App extends React.Component {
  state = {
    user: "",
    followers: []
  };

  componentDidMount() {
    Promise.all([
      axios.get(`https://api.github.com/users/imjeremiah`),
      axios.get("https://api.github.com/users/imjeremiah/followers")
    ]).then(([res1, res2]) => {
      this.setState({
        user: res1.data,
        followers: res2.data
      });
    })
    .catch(([err1, err2]) => {
      console.log(err1, err2);
    });
  };

  componentDidUpdate(prevState) {
    if (prevState.user !== this.state.user){
      axios.get(`https://api.github.com/users/${this.state.user}/followers`)
        .then(res => {
          this.setState({
            followers: res.data
          });
        })
        .catch(err => {
          console.log(err)
        });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.user}`)
      .then(res => {
        this.setState({
          user: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  };

  handleChange = e => {
    this.setState({
      user: e.target.value
    })
  };

  render(){
    const { user, followers } = this.state;
    return (
      <div className="App">
        <h1>{user.login}'s Github User Card</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input value={user.login} onChange={this.handleChange} placeholder="search users"/>
            <button>Search Users</button>
          </form><br/><br/>
          <img style={{width: "150px", borderRadius: "50%"}} src={user.avatar_url} alt={user.name}/>
          <h2>{user.name}</h2>
          <p>Repositories: {user.public_repos}</p>
          <p>Follower Count: {user.followers}</p>
          <h4>Contributions:</h4>
          <img src={`http://ghchart.rshah.org/${user.login}`} alt={`${user.login}'s GitHub chart`}/>
        </div><br/><br/>
        <h3>{user.login}'s Github Followers:</h3>
        <div>
          {
            followers.map(follower => (
              <div key={follower.id}> 
                <img style={{width: "80px", borderRadius: "50%"}} src={follower.avatar_url} alt={follower.login}/>
                <h4>{follower.login}</h4>
              </div>
            ))
          }
        </div>
      </div>
    );
  };
};

export default App;

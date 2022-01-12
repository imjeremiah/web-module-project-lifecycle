import React from "react";

import FollowerList from './FollowerList';

class User extends React.Component {

    render() {
        return (
            <>
            <div>
                <img width={150} src={this.props.userInfo.image} />
                <h3>{this.props.userInfo.name}</h3>
                <h4>({this.props.userInfo.handle})</h4>
                <h3>TOTAL REPOS: {this.props.userInfo.repos}</h3>
                <h3>TOTAL FOLLOWERS: {this.props.userInfo.followerCount}</h3>
            </div>
            <div>
                <h2>FOLLOWERS:</h2>
                <FollowerList user={this.props.user} followers={this.props.followers} />
            </div>
            </>
        )
    }
}

export default User;
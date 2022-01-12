import React from "react";

class Follower extends React.Component {
    render() {
        return(
            <div>
                <div width="10%" style={{ display: "flex" }}>
                    <img width={150} src={this.props.follower.avatar_url} />
                </div>
                <div>
                    <h4>{this.props.follower.login}</h4>
                </div>
            </div>
        )
    }
}

export default Follower;
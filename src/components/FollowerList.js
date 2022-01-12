import axios from "axios";
import React from "react";

import Follower from './Follower';

class FollowerList extends React.Component {

    render() {
        return(
            <div>
                {
                    this.props.followers.map(follower => {
                        return <Follower key={follower.id} follower={follower} />
                    })
                }
            </div>
        )
    }
}

export default FollowerList;
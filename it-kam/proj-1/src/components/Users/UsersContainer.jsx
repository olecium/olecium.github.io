import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import {unfollow, follow, requestUsers } from "./../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getFollowingInProgress, getIsFetching, getCurrentPage, getTotalUsersCount, getPageSize, getUsers } from "../../redux/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChange = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
                    {this.props.isFetching ? <Preloader /> : null}
                    
                    <Users  totalUsersCount={this.props.totalUsersCount}
                            pageSize={this.props.pageSize}
                            currentPage={this.props.currentPage}
                            users={this.props.users}
                            follow={this.props.follow}
                            unfollow={this.props.unfollow}
                            onPageChange={this.onPageChange}
                            followingInProgress={this.props.followingInProgress}
                    />
                </>
    }
}


let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { unfollow, follow, requestUsers })
)(UsersContainer);
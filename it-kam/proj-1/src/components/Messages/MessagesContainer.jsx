import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import MessageTemplate from "./MessageTemplate/MessageTemplate";
import Messages from "./Messages/Messages";
import {addMessage} from "./../../redux/messages-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsElements: state.messagesPage.dialogs.map( (d) => {
            return(<DialogItem name={d.name} avatar={d.avatar} key={d.id} id={d.id} active={d.active}/>);
        }),
        messageElements: state.messagesPage.messages.map( (m) => {
            return(<MessageTemplate key={m.id} id={m.id} date={m.date} from={m.from} message={m.message} />);
        })
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {addMessage})
)(Messages);


import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import jwt_decode from "jwt-decode";
import io from 'socket.io-client';
let socket;
const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: 71,
        right: 50
    },
    chat: {
        color: '#f9e513',
        right: -24,
        position: 'relative',
        fontWeight: 'bold'
    },
    chatTitel: {
        position: 'relative',
        textAlign: 'center',
        background: '#77b747',
        color: 'white',
        borderRadius: 4
    },
    wrapper: {
        width: 100 + theme.spacing(2),
    },
    paper: {
        zIndex: 1,
        position: 'relative',
        margin: theme.spacing(1),
        width: 445,
        right: 375
    },
    svg: {
        width: 100,
        height: 100,
    },
    messageDiv: {
        height: 35,
        background: '#83cbe645',
        width: '80%',
        margin: 'auto',
        borderRadius: 15,
        textAlign: 'center',
        margin: 10,
        marginLeft: 67,
        color: 'navy'
    },
    switcher: {
        background: '#77b748',
        borderRadius: 50,
        right: -30
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    chatInput: {
        width: '99%',
        height: 40

    },
    chatContainer: {
        height: 300
    }
}));
const ChatBox = () => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem("usertoken");
    const endPoint = 'http://localhost:8000';
    let room = 'ALL';
    let name = "";

    if (token) {
        const decoded = jwt_decode(token);
        name = decoded.userName
    }
    console.log(name)

    useEffect(() => {
        socket = io(endPoint);
        socket.emit('join', { name, room }, () => {
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [endPoint]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages])

    //function for sending message
    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    //console.log(message, messages);
    const handleChange = () => {
        setChecked(prev => !prev);
    };

    return (
        <div className={classes.root}>
            {token ?
                <div className={classes.wrapper}>
                    <p className={classes.chat}>CHAT</p>
                    <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange} className={classes.switcher} color="primary" />}
                    />
                    <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                        <Paper elevation={4} className={classes.paper}>
                            <h1 className={classes.chatTitel}>CHAT</h1>

                            <div>

                                <div className={classes.chatContainer}>
                                    {
                                        messages.map((message, i) =>
                                            <div key={i} className={classes.messageDiv}>
                                                <p>{message.user}:{message.text}</p>
                                            </div>
                                        )}
                                </div>

                                <div>
                                    <input placeholder="Type to chat ....." value={message} onChange={(event) => setMessage(event.target.value)}
                                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} className={classes.chatInput} />
                                </div>
                            </div>
                        </Paper>
                    </Slide>
                </div>
                : <div></div>}
        </div>
    );
}
export default ChatBox;
import HeaderNotificationPopover from './HeaderNotificationPopover'

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Popover from '@material-ui/core/Popover';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function HeaderBadge() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  // const [unreadNum, unreadNumSetter] = useState(null);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const notificationArr = useSelector((state) => state.otherReducer.notificationArr);
  const unreadNotificationNum = useSelector((state) => state.otherReducer.unreadNotificationNum);

  //fetch campaign base on the id from the params
  useEffect(() => {
    async function fetchNotification(){
        const res = await fetch (`/notifications?userId=${currentUser.id}`)
        if (res.ok){
        const data = await res.json()
        dispatch({ type: "SET_NOTIFICATION_ARR", playload:data })
        dispatch({ type: "SET_UNREAD_NOTIFICATION_NUM", playload: data.filter(n => n.read == false).length })
        }
    };
    fetchNotification();
  },[])

    if (!notificationArr ) return <h2>Loading...</h2>;
    if (!currentUser ) return <h2>Loading...</h2>;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    async function notificationRead () {
      const res = await fetch(`/notifications/${currentUser.id}`,{
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "SET_UNREAD_NOTIFICATION_NUM", playload: null })
      } else {
        const err = await res.json();
        alert(err.errors)
      }
    }
    notificationRead();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <div className={classes.root}>
      <Badge badgeContent={unreadNotificationNum} color="primary" onClick={handleClick}>
        <MailIcon />
      </Badge>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <HeaderNotificationPopover />
      </Popover>
    </div>
  );
}
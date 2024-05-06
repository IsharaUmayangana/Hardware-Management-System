import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { Home } from '@material-ui/icons';


export const salesManagerListItems = (
  <React.Fragment>
    <Link to={'/sales'}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="SalesMNG" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const customerListItems = (
  <React.Fragment>
    <Link to={'/cashier'}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Cashire Home" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);


export const guestListItems = (
  <React.Fragment>
    <Link to={''}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>


  </React.Fragment>
);


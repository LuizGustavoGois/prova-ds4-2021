import {AppBar, Avatar, IconButton, Toolbar, Typography} from '@material-ui/core';
import imgAvatar from '../../assets/images/avatar1.svg';

import './styles.scss';

export function Header() {
    return (
        <AppBar position="static">
            <Toolbar className="toolbar">
                <Typography variant="h6">
                    Reserva de Assentos
                </Typography>
                
                <IconButton
                    color="primary"
                    aria-controls="simple-menu"
                    aria-haspopup="true">
                    <Avatar
                        alt="usuario"
                        src={imgAvatar}
                    />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
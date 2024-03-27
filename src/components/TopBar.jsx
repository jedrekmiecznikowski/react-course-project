// create topbar component
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import {useState} from 'React';
import Drawer from './Drawer';

export default function TopBar({bagName}) {

    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AppBar position="static" sx={{ bgcolor: '#6c4731' }}>
                        <Toolbar>
                                <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{ mr: 2 }}
                                >
                                    <Drawer open={open} setOpen={setOpen} />
                                    <MenuIcon onClick={() => setOpen(true)} /> 

                                </IconButton>
                                {/* add github icon */}
                                <IconButton color="inherit" aria-label="github.com" onClick={() => window.open('https://github.com/jedrekmiecznikowski/react-course-project/tree/main')}>
                                        <GitHubIcon />
                                </IconButton>
                                <Typography variant="h6" sx={{flexGrow: 1}}>
                                        {bagName}
                                </Typography>
                        </Toolbar>
                </AppBar>
        </Box>
    );
}

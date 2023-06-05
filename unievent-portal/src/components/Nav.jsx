import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Nav = () => {
  const handleLogout = () => {
    // Perform logout logic here
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#9BA8A8 ' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Uni-Event
        </Typography>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Welcome, User!
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};


export default Nav
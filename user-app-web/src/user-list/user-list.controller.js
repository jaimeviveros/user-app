import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";

import {useState} from "react";
import { getAllService } from "./user-list.service";
import { CreateUserPage } from "../create-user/create-user.controller";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function createData(id, date, username, email, fullname) {
    return { id, date, username, email, fullname };
  }
  
  const rows = [
    { 
        id: 'asdas', 
        date: Date.now(), 
        username: 'mateo', 
        email: 'mateo.viveros@dstemuco.cl', 
        fullname: 'Mateo Viveros',
    },
    { 
        id: 'asdas3', 
        date: Date.now(), 
        username: 'jaime', 
        email: 'jaime.viveros@gmail.com', 
        fullname: 'Jaime Viveros',
    }
  ];
  
  function preventDefault(event) {
    event.preventDefault();
  }

export function UserListPage() {
  const [open, setOpen] = React.useState(true);

    const [rowsData, setRowsData] = useState([]);

    React.useEffect(() => {
        getAllService().then((rows) => {
            setRowsData(rows);
          })
          .catch((e) => console.error(e));
        
    }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                    <CreateUserPage />
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <React.Fragment>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Fecha creación</TableCell>
                          <TableCell>Usuario</TableCell>
                          <TableCell>Nombre completo</TableCell>
                          <TableCell>Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowsData.map((row) => (
                          <TableRow key={row._id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{row.fullname}</TableCell>
                            <TableCell>{row.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Link
                      color="primary"
                      href="#"
                      onClick={preventDefault}
                      sx={{ mt: 3 }}
                    >
                      See more orders
                    </Link>
                  </React.Fragment>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

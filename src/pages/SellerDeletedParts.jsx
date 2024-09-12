import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid , GridToolbar} from "@mui/x-data-grid";
import {  Button} from "@mui/material";

// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { useState, useEffect } from "react";
import AuthUser from "../components/AuthUser";
const SellerDeletedParts = () => {

  const [posts, setPosts] = useState([])

  const{http}= AuthUser();
  const [user, setUser] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);



  useState(() => {
    http.post('/me')
    .then((res)=>{setUser(res.data)})
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/showDeletedPart"+"/"+user.id)
    .then((data) => data.json())
    .then((data) => setPosts(data))
  })


  
  const handleUnDelete = (id) => {
    const url = "http://127.0.0.1:8000/api/unDeletedPart"+"/"+id
          fetch( url, { method: 'get'}).then((Response) => {
            if(!Response.ok){
              throw new Error('Something went wrong')
            }
            console.log('cool');
          }).then((posts) => {})
          .catch((e) => {
            console.log('cool');
    })
    setPosts(prevData => prevData.filter(row => row.id !== id));
    // console.log(id);
    };

    const UnDeleteAllParts=()=>{
      if (window.confirm("Are you sure you want to Delete?")) {
      http.get('/UnDeleteAllParts/'+user.id)  
    }
    else {
      setShowConfirmation(false);
    }
    
      }


  const columns = [
    {
      field: "id",
      headerName: "ID",
      valueGetter: params => params.row.id,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "name",
      headerName: "Part Name",
      flex: 1,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1
    },
    {
      field: "category_name",
      headerName: "Category Name",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
        field: "price",
        headerName: "Price",
        flex: 1,
    },
    {
        field: "description",
        headerName: "Description",
        flex: 1,
      },
    {
        field: "created_at",
        headerName: "Created At",
        flex: 1,
    },
    {
        field: "deleted_at",
        headerName: "Deleted At",
        flex: 1,
    },
    {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const id = params.row.id;
          return (
            <button className="btn"  onClick={() => handleUnDelete(id)}>UnDelete</button>
          );
        },
      }
  
];
  return (
    <Box m="20px">
      <button className="btn" style={{float:'right', backgroundColor:'orange' }} onClick={UnDeleteAllParts}>Un Delete All Parts</button><br/>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
          "& .MuiCheckbox-root": {
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          },
        }}
      >
        <DataGrid 
         rows={posts} 
         columns={columns}
         components={{ Toolbar: GridToolbar }}

         getRowId={(row) => row.id} />
      </Box>
    </Box>
  );
};

export default SellerDeletedParts;

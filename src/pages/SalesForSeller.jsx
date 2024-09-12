import { Box } from "@mui/material";
import { DataGrid , GridToolbar} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import AuthUser from "../components/AuthUser";
const SalesForSeller = () => {

  const [posts, setPosts] = useState([])
  const [totalMony,   settotalMony] = useState([])
  const{http}= AuthUser();
  const [user, setUser] = useState([]);

  useState(() => {
    http.post('/me')
    .then((res)=>{setUser(res.data)})
  } , []);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/showSalesForCertainSeller"+"/"+user.id)
    .then((data) => data.json())
    .then((data) => setPosts(data))
  })

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/totalSalesMony/"+user.id)
      .then((response) => response.json())
      .then((data) => settotalMony(data))
      .catch((error) => console.log(error));
  });
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
      field: "part_name",
      headerName: "Part Name",
      flex: 1,
    },
    {
      field: "customer_id",
      headerName: "Customer ID",
      flex: 1,
    },
    {
        field: "customer_name",
        headerName: "Customer",
        flex: 1,
    },
    {
      field: "customer_email",
      headerName: "Customer Email",
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
        field: "totalprice",
        headerName: "Total Price",
        flex: 1,
    },

    {
        field: "created_at",
        headerName: "Saled At",
        flex: 1,
    },

  
];
  return (
    <Box m="20px">
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
    <h3>Total Sales Mony:${totalMony}.00</h3>

        <DataGrid 
         rows={posts} 
         columns={columns}
         components={{ Toolbar: GridToolbar }}

         getRowId={(row) => row.id} />
      </Box>
    </Box>
  );
};

export default SalesForSeller;

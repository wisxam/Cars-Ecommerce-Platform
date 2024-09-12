import { Box } from "@mui/material";
import { DataGrid , GridToolbar} from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import AuthUser from "../components/AuthUser";

const SellerParts = () => {

  const navigate = useNavigate();

  const [posts, setPosts] = useState([])
  const{http}= AuthUser();
  const [user, setUser] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);


  
  
  useState(() => {
    http.post('/me')
    .then((res)=>{setUser(res.data)})
  },[]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/showPartSeller"+"/"+user.id)
    .then((data) => data.json())
    .then((data) => setPosts(data))
  })


  
  const handleDelete = (id) => {
    const url = "http://127.0.0.1:8000/api/deletePart"+"/"+id
          fetch( url, { method: 'get'}).then((Response) => {
            if(!Response.ok){
              throw new Error('Something went wrong')
            }
          }
          );
    setPosts(prevData => prevData.filter(row => row.id !== id));
    };

    const handleEdit=(id)=>{
      localStorage.setItem('Edit_part_id',id)
      navigate('/editpart')
    }
    const handleDetails=(id)=>{
      localStorage.setItem('part_id',id)
      navigate('/PartDetails');
    }



    const DeleteAllParts=()=>{
      if (window.confirm("Are you sure you want to Delete?")) {
      http.get('/DeleteAllParts/'+user.id)  
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
    // {
    //   field: "image",
    //   headerName: "Image",
    //   flex: 1,
    //   renderCell: (params) => {
    //     const imageUrl = params.value;
    //     return <img src={`http://localhost:8000/${imageUrl}`} alt="Part" width="50" height="50" />
    // }},
    
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
        flex: 3,
      },
    {
        field: "created_at",
        headerName: "Created At",
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
            <button className="btn"  onClick={() => handleDelete(id)}>Delete</button>
          );
        },
      },

      {
        field: 'edit',
        headerName: 'Edit',
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const id = params.row.id;
          return (
            <button className="btn"  onClick={() => handleEdit(id)}>Edit</button>
          );
        },
      },
      {
        field: 'details',
        headerName: 'Details',
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const id = params.row.id;
          return (
            <button className="btn" style={{ backgroundColor:'orange' }} onClick={() => handleDetails(id)}>Details</button>
          );
        },
      }
];


  return (
    <Box m="20px">
    <button className="btn" style={{float:'right', backgroundColor:'orange' }} onClick={DeleteAllParts}>Delete All Parts</button><br/>
      

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

export default SellerParts;

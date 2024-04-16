<<<<<<< HEAD
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import ProductDetailsModal from './supplier-management/productDetailsModal/productDetails';
import AddSupplierForm from './supplier-management/AddSupplierFormModal/AddSupplierForm';
import UpdateSupplierForm from './supplier-management/UpdateSupplierFormModal/UpdateSupplierForm';

const initialRows = [];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:8000/supply-management/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newSupplier = await response.json();
        newSupplier.id = newSupplier._id;
        newSupplier.phone = newSupplier.contact.phone;
        newSupplier.email = newSupplier.contact.email;
        newSupplier.address = newSupplier.contact.address;


        setRows((oldRows) => [newSupplier, ...oldRows]);


        setIsFormOpen(false);


        setRowModesModel((oldModel) => ({
          ...oldModel,
          [newSupplier.id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
      } else {
        console.error('Failed to add supplier');
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };
  const handleAddSupplierClick = () => {
    setIsFormOpen(true);
  };

  return (
    <React.Fragment>
      <GridToolbarContainer sx={{ width: 180, height: 50 }}>
        <Button
          sx={{
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
          startIcon={<AddIcon />} onClick={handleAddSupplierClick} >
          Add Supplier
        </Button>
      </GridToolbarContainer>
      <AddSupplierForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </React.Fragment>
  );
}

export default function SupplierList() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedSupplier, setSelectedSupplier] = React.useState(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = React.useState(false);




  const handleDeleteClick = (id) => async () => {
    console.log('deleting')
    try {
      const response = await fetch(`http://localhost:8000/supply-management/suppliers/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRows(rows.filter((row) => row.id !== id));
      } else {
        console.error('Failed to delete supplier');
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };



  const handleViewProducts = (id) => {
    const supplier = rows.find((row) => row.id === id);
    setSelectedSupplier(supplier);
    setModalOpen(true);
  };

  const handleEditClick = (id) => {
    const supplier = rows.find((row) => row.id === id);
    setSelectedSupplier(supplier);
    setIsUpdateFormOpen(true);
  };

  const handleUpdateFormClose = () => {
    setIsUpdateFormOpen(false);
  };

  const handleUpdateFormSubmit = async (formData) => {
    const id = formData.id;
    try {
      const response = await fetch(`http://localhost:8000/supply-management/suppliers/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedSupplierData = await response.json();

        updatedSupplierData.id = updatedSupplierData._id;
        updatedSupplierData.phone = updatedSupplierData.contact.phone;
        updatedSupplierData.email = updatedSupplierData.contact.email;
        updatedSupplierData.address = updatedSupplierData.contact.address;

        const updatedIndex = rows.findIndex((row) => row.id === id);
        if (updatedIndex !== -1) {

          const updatedRows = [...rows];

          updatedRows[updatedIndex] = updatedSupplierData

          setRows(updatedRows);

          setIsUpdateFormOpen(false);

          setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
          }));

          setSelectedSupplier(updatedSupplierData);
        } else {
          console.error('Failed to find updated supplier in the rows array');
        }
      } else {
        console.error('Failed to update supplier');
      }
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };


  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: false },
    { field: 'phone', headerName: 'Phone', width: 180, editable: false },
    {
      field: 'email', headerName: 'Email', width: 180, editable: false,
      renderCell: (params) => (
        <a href={`mailto:${params.value}`}>{params.value}</a>
      ),
    },
    { field: 'address', headerName: 'Address', width: 250, editable: false },
    {
      field: 'products',
      headerName: 'Products',
      width: 150,
      renderCell: (params) => (
        <Button
          onClick={() => handleViewProducts(params.row.id)}

        >
          View Products
        </Button>
      ),
    },
    { field: 'paymentTerms', headerName: 'Payment Terms', width: 150, editable: false },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem sx={{ width: 50, height: 50 }}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
            title='Edit row'
          />,
          <GridActionsCellItem sx={{ width: 50, height: 50 }}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            title='Delete row'
          />,
        ];
      },
    },
    {
      field: 'navigate',
      headerName: '',
      width: 150,
      type: 'actions',
      renderCell: (params) => (
        <Button
          endIcon={<ChevronRightIcon />}
          onClick={() => handleNavigate(params.row.id)}
        >
          View more
        </Button>
      ),
    },

  ];

  const handleNavigate = (id) => {

    navigate(`/suppliers/${id}`);
  };


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/supply-management/suppliers");
        if (response.ok) {
          const data = await response.json();
          const transformedData = data.map(supplier => ({
            id: supplier._id,
            name: supplier.name,
            phone: supplier.contact.phone,
            email: supplier.contact.email,
            address: supplier.contact.address,
            productsSupplied: supplier.productsSupplied.map(product => ({
              name: product.name,
              category: product.category
            })),
            paymentTerms: supplier.paymentTerms,

          }));
          setRows(transformedData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        marginTop: 10,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}

        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />

      <ProductDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        supplier={selectedSupplier}
      />

      <UpdateSupplierForm
        isOpen={isUpdateFormOpen}
        onClose={handleUpdateFormClose}
        onSubmit={handleUpdateFormSubmit}
        initialData={selectedSupplier}
      />

    </Box>
  );
}

=======
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from '@mui/x-data-grid';

const initialRows = []; // Initialize with empty array, will be populated with fetched data

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Math.random().toString();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', contact: {}, productsSupplied: '', paymentTerms: '', notes: '', isNew: true }
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer sx={{width:180, height: 50}}>
      <Button 
        sx={{
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the background color when hovering
          },
        }}
      startIcon={<AddIcon />} onClick={handleClick} >
        Add Supplier
      </Button>
    </GridToolbarContainer>
  );
}

export default function SupplierList() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'contactphone', headerName: 'Phone', width: 180, editable: true },
    { field: 'contactemail', headerName: 'Email', width: 180, editable: true },
    { field: 'contactaddress', headerName: 'Address', width: 250, editable: true },
    { field: 'productsSupplied', headerName: 'Products Supplied', width: 250, editable: true },
    { field: 'paymentTerms', headerName: 'Payment Terms', width: 150, editable: true },
    { field: 'notes', headerName: 'Notes', width: 250, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem 
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: 'primary.main', width:50, height: 50 }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem sx={{width:50, height: 50}}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem sx={{width:50, height: 50}}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem sx={{width:50, height: 50}}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  // Fetch data from the backend when the component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/supply-management/suppliers");
        if (response.ok) {
          const data = await response.json();
          // Transform fetched data into the format expected by the grid
          const transformedData = data.map(supplier => ({
            id: supplier._id,
            name: supplier.name,
            contactphone: supplier.contact.phone,
            contactemail: supplier.contact.email,
            contactaddress: supplier.contact.address,
            productsSupplied: supplier.productsSupplied.map(product => `${product.name} (${product.category})`).join(', '),
            paymentTerms: supplier.paymentTerms,
            notes: supplier.notes
          }));
          setRows(transformedData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Ensure this effect runs only once, similar to componentDidMount

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        marginTop:10,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

>>>>>>> 976cc275b49c8a4102df995a5812636b46677d9b

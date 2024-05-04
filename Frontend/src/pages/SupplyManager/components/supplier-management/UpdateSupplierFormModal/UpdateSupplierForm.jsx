import React from "react";
import { Modal, Box, TextField, Button, Stack } from "@mui/material";

function UpdateSupplierForm({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentTerms: "",
    products: [{ name: "", category: "" }],
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        address: initialData.address || "",
        paymentTerms: initialData.paymentTerms || "",
        products: initialData.productsSupplied || [{ name: "", category: "" }],
      });
    }
  }, [initialData]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    if (name === "productName" || name === "productCategory") {
      const newProducts = [...formData.products];
      newProducts[index] = { ...newProducts[index], [name]: value };
      setFormData({ ...formData, products: newProducts });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleProductsChange = (event, index) => {
    const { name, value } = event.target;
    const newProducts = [...formData.products];
    newProducts[index] = { ...newProducts[index], [name]: value };
    setFormData({ ...formData, products: newProducts });
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { name: "", category: "" }],
    });
  };

  const handleRemoveProduct = (index) => {
    const newProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: newProducts });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    const formattedData = {
      id: initialData.id,
      name: formData.name,
      contact: {
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
      },
      productsSupplied: formData.products,
      paymentTerms: formData.paymentTerms,
    };
    await onSubmit(formattedData);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          minWidth: 400,
          maxWidth: 600,
          overflowY: "auto", // Add scrollable behavior
          maxHeight: "80vh", // Limit maximum height
          zIndex: 9999, // Adjust z-index to keep modal above screen
        }}
      >
        <h2 id="update-supplier-modal-title">Update Supplier</h2>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {" "}
            {/* Add spacing between fields */}
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Payment Terms"
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleChange}
              fullWidth
              required
            />
            {formData.products.map((product, index) => (
              <Stack key={index} direction="row" spacing={2}>
                <TextField
                  label="Product Name"
                  name="name"
                  value={product.name}
                  onChange={(e) => handleProductsChange(e, index)}
                  fullWidth
                />
                <TextField
                  label="Product Category"
                  name="category"
                  value={product.category}
                  onChange={(e) => handleProductsChange(e, index)}
                  fullWidth
                />
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveProduct(index)}
                >
                  Remove Product
                </Button>
              </Stack>
            ))}
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update Supplier
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}

export default UpdateSupplierForm;

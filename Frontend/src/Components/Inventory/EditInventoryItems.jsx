import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './InventoryStyles.css';

const EditInventoryItems = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quantityLimit, setQuantityLimit] = useState('');
  const [image, setImage] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/inventory/${id}`);
        const data = await response.json();
        setProduct(data);
        setName(data.name);
        setCategory(data.category);
        setPrice(data.price);
        setQuantity(data.quantity);
        setQuantityLimit(data.quantityLimit);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInventoryEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('quantityLimit', quantityLimit);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:8000/inventory/${id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        window.alert('Product Detail successfully updated :-)');
        console.log('updated');
        navigate(`/selectedItem/${id}`);
      } else {
        window.alert('Product Detail not updated :-(');
        console.log('Data not updated');
        navigate(`/inventory`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error updating product. Please try again.");
    }
  };

  return (
    <div className="selectedProduct">
      {loading && <p>Loading...</p>}
      {!loading && !product && <p>No product found</p>}
      {!loading && product && (
        <form className="editItem-form" onSubmit={handleInventoryEdit}>
          <h2>Edit Item</h2>
          <hr />

          <div className="row1">
            <label>Item Name:</label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
            <br />

            <label>Item Category:</label>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
              <option value="Hand Tools"> Hand Tools </option>
              <option value="Power Tools"> Power Tools </option>
              <option value="Building Materials"> Building Materials </option>
              <option value="Paint and Painting Supplies"> Paint and Painting Supplies </option>
              <option value="Plumbing Supplies"> Plumbing Supplies </option>
              <option value="Electrical Supplies"> Electrical Supplies </option>
              <option value="Other"> Other </option>
            </select>
            <br />
          </div>

          <br />

          <div className="row2">
            <label>Unit Price:</label>
            <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} />
            <br />

            <label>Quantity:</label>
            <input type="number" onChange={(e) => setQuantity(e.target.value)} value={quantity} />
            <br />

            <label>Quantity Limit:</label>
            <input type="number" onChange={(e) => setQuantityLimit(e.target.value)} value={quantityLimit} />
            <br />

            <label>Image:</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <br />

          <button>Save</button>

          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default EditInventoryItems;

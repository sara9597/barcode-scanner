import createDataContext from "./createDataContext";
import barcodeApi from "../api/barcode";

const productNames = [
  "Banana",
  "Apple",
  "Orange Juice",
  "Bread",
  "Pasta",
  "Ketchup",
  "Rice",
  "Chocolate Pudding",
  "Tea",
  "Milk",
  "Eggs",
  "Cheese",
  "Ham"
];

const barcodeReducer = (state, action) => {
  //console.log("state:", state);
  switch (action.type) {
    case "getBarcodes":
      return { ...state, products: action.payload };
    case "createBarcode":
      return { ...state, products: [...state.products, action.payload] };

    case "deleteProduct":
      return {
        ...state,
        products: [
          state.products.filter(barcode => barcode.id !== action.payload)
        ]
      };
    default:
      return state;
  }
};

const deleteProduct = dispatch => {
  return async id => {
    try {
      await barcodeApi.delete(`/barcodes/${id}`);
      dispatch({ type: "deleteProduct", payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };
};
const getBarcodes = dispatch => async () => {
  const pro = [];

  const response = await barcodeApi.get("/barcodes");
  response.data.map(res => res.name && pro.push(res));

  //dispatch({ type: "getBarcodes", payload: response.data });
  dispatch({ type: "getBarcodes", payload: pro });
};

const createBarcode = dispatch => {
  return async (type, data) => {
    let price = Math.floor(Math.random() * 25) + 1;
    let weight = Math.floor(Math.random() * 100) + 1;
    let name =
      productNames[Math.floor(Math.random() * productNames.length) + 1];
    try {
      await barcodeApi.post("/barcodes", {
        id: data,
        type,
        data,
        price,
        weight,
        name
      });
      dispatch({
        type: "createBarcode",
        payload: { data, type, data, price, weight, name }
      });
    } catch (error) {
      console.log(error.message, error);
    }

    // if (callback) callback();
  };
};

export const { Provider, Context } = createDataContext(
  barcodeReducer,
  { getBarcodes, createBarcode, deleteProduct },
  { products: null }
);

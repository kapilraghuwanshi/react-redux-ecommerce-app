import React, { useEffect } from "react";
import axios from 'axios';
import { setProducts } from '../redux/actions/productActions'
import { useDispatch, useSelector } from "react-redux";
import ProductComponent from "./ProductComponent";


const ProductListing = () => {
    const products = useSelector((state) => state);
    const dispatch = useDispatch(setProducts);

    const fetchProducts = async () => {
        const resp = await axios
            .get('https://fakestoreapi.com/products')
            .catch((err) => {
                console.error(`Error in fetchProducts API call with ${err}`);
            });
        dispatch(setProducts(resp.data));
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="ui grid container">
            <ProductComponent />
        </div>
    )
}

export default ProductListing;
import React, { useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedProducts, removeSelectedProducts } from "../redux/actions/productActions";

const ProductDetail = () => {
    const product = useSelector((state) => state.product);
    const { productId } = useParams();
    const dispatch = useDispatch(selectedProducts);

    const { image, title, price, category, description } = product;

    const fetchProductDetails = async () => {
        const resp = await axios
            .get(`https://fakestoreapi.com/products/${productId}`)
            .catch((err) => {
                console.error(`Error in fetchProducts API call with ${err}`);
            });
        dispatch(selectedProducts(resp.data));
    }

    useEffect(() => {
        if (productId && productId !== "") {
            fetchProductDetails();
            return () => {
                dispatch(removeSelectedProducts());
            }
        }
    }, [productId])

    return (
        <div className='ui grid container'>
            {
                Object.keys(product).length === 0 ? (
                    <div>...Loading</div>
                ) : (
                    <div className="ui placeholder segment">
                        <div className="ui two column stackable center aligned grid">
                            <div className="ui vertical divider">AND</div>
                            <div className="middle aligned row">
                                <div className="column lp">
                                    <img className="ui fluid image" src={image} />
                                </div>
                                <div className="column rp">
                                    <h1>{title}</h1>
                                    <h2>
                                        <a className="ui teal tag label">${price}</a>
                                    </h2>
                                    <h3 className="ui brown block header">{category}</h3>
                                    <p>{description}</p>
                                    <div className="ui vertical animated button" tabIndex="0">
                                        <div className="hidden content">
                                            <i className="shop icon"></i>
                                        </div>
                                        <div className="visible content">Add to Cart</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductDetail;
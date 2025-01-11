import { Fragment } from "react";
import ProductCategoryRow from "./ProductCategoryRow/ProductoCategoryRow";
import ProductRow from "./ProductRow/ProductRow";

const TableProducts = ({ products }) => {

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product,index)=>{
                        return(
                            <Fragment key={product.name}>
                                {index ==0?<ProductCategoryRow category={product.category}/>:
                                product.category!==products[index-1].category&&(
                                    <ProductCategoryRow category={product.category}/>
                                )
                                }
                                <ProductRow product={product}/>
                            </Fragment>
                        )	
                    })}
                </tbody>
            </table>
            </div>
    );
}
export default TableProducts;
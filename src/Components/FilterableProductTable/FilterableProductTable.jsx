import Search from "./Search/Search"
import TableProducts from './ProductTable/ProductTable'
import data from '../../db/products.json'
const FilteralbleProductTable = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
                <Search />
                <TableProducts
                    products={data}
                />
            </div>

        </div>
    );
}

export default FilteralbleProductTable;
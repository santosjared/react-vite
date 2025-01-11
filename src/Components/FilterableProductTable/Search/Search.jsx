const Search = () => {
    return (
        <div style={{display:'flex', padding:'4px'}}>
            <form>
                <div style={{display:'flex'}}><input type="text" placeholder="Search..."/></div>
                <label>
                    <input type="checkbox" />
                    {' '}
                    Only show products in stock
                </label>
            </form>
        </div>
    );
}
export default Search;
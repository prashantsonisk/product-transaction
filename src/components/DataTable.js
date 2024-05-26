import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import product_transaction from '../product_transaction.json';
// import { ChartBar } from './ChartBar';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'


const DataTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inputVal, setInputVal] = useState("");
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [selectedMonth, setSelectedMonth] = useState("March");

    const itemsPerPage = 10;
  
    // Calculate the products to display on the current page
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = product_transaction.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const totalPages = Math.ceil(product_transaction.length / itemsPerPage);
  
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
  
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Month vice data filter    
    const getMonthIndex = (monthName) => {
        return months.findIndex(month => month === monthName);
    };

    const selectedMonthIndex = getMonthIndex(selectedMonth);
    const indexOfMonth = (selectedMonthIndex+1).toString().padStart(2, '0');

    // For getting only month
    const monthMatch =  product_transaction.filter((getMonth)=> getMonth.dateOfSale.slice(5, 7).includes(indexOfMonth));

    // Search functionality
    const filterData = monthMatch.filter((product)=>{
        return (
            product.title.toLowerCase().includes(inputVal) || 
            product.description.toLowerCase().includes(inputVal) ||
            product.price.toString().includes(inputVal)
        )
    }); 
        

    // Search input
    const handleSeacrhInput = (e) => {  
        setInputVal(e.target.value.toLowerCase());
    }

    // Select month from dropdown
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    // totlesell , soldItem, unSoldItem
    
    const soldItem   = filterData.filter((item) => item.sold)
    const totlesell  = soldItem.reduce((accumulator,current) => accumulator + current.price, 0)
    const unSoldItem = filterData.filter((item) => !item.sold)

    // Categorize the items into different price ranges
    const priceRanges = [
        { range: "0-100", min: 0, max: 100 },
        { range: "101-200", min: 101, max: 200 },
        { range: "201-300", min: 201, max: 300 },
        { range: "301-400", min: 301, max: 400 },
        { range: "401-500", min: 401, max: 500 },
        { range: "501-600", min: 501, max: 600 },
        { range: "601-700", min: 601, max: 700 },
        { range: "701-800", min: 701, max: 800 },
        { range: "801-900", min: 801, max: 900 },
        { range: "901 above", min: 901, max: Infinity }
    ];

    const barChartData = priceRanges.map(range => {
        const itemsInRange = soldItem.filter(item => item.price >= range.min && item.price <= range.max);
        return {
            priceRange: range.range,
            soldItems: itemsInRange.length
        };
    });
console.log(barChartData);
    return (
        <div style={{"width":"90%"}} className='m-auto pt-3'>
        <div className="d-flex justify-content-between my-3">
            <input className="form-control" type='text' onChange={handleSeacrhInput} placeholder='Search' style={{"width":"350px"}}/>
            <select className="form-control" value={selectedMonth} onChange={handleMonthChange} style={{"width":"350px"}}>
                {months.map((monthName, index)=>{
                    return <option value={monthName} key={index}>{monthName}</option>
                 })
                }
            </select>
        </div>
          <table className="table table-bordered table-striped">
              <thead>
                  <tr>
                      <th>Sr.No.</th>
                      <th style={{"width":"100px"}}>Month</th>
                      <th style={{"width":"250px"}}>Title</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Sold</th>
                      <th>Image</th>
                  </tr>
              </thead>
              <tbody>
                  {filterData.map((item, index) => (
                      <tr key={indexOfFirstProduct+index}>
                          <td>{indexOfFirstProduct + index + 1}</td>
                          <td>{item.dateOfSale.split('T')[0]}</td>
                          <td>{item.title}</td>
                          <td>{item.description}</td>
                          <td>{item.price}</td>
                          <td>{item.category}</td>
                          <td>{item.sold?"sold":"unsold"}</td>
                          <td><img src={item.image} style={{"height":"50px", "width":"50px"}}/></td>
                      </tr>
                  ))}
              </tbody>
          </table>
          <div className='d-flex justify-content-between'>
          <p>Page {currentPage} of {totalPages} (Total Products: {product_transaction.length})</p>
          <p>Per Page : 10</p>
          </div><br/>
          <div className="my-3 d-flex justify-content-between">
                  <button 
                      className="btn btn-primary" 
                      onClick={handlePrevPage} 
                      disabled={currentPage === 1}
                  >
                      Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button 
                      className="btn btn-primary" 
                      onClick={handleNextPage} 
                      disabled={currentPage === totalPages}
                  >
                      Next
                  </button>
              </div>
              <div><h3>Statistics - {selectedMonth}</h3> </div>
            <div className='p-4 border border-black bg-warning rounded inline-block d-inline-block'>
                <p>Total Sale ={totlesell}</p>
                <p>Total Sold item ={soldItem.length}</p>
                <p>Total not sold item ={unSoldItem.length}</p>
            </div>
          {/* Bar chart start from here*/}
          <div className='w-75 mx-auto my-5' style={{ height: 400 }}>
          <div><h1 className='text-center my-5 fw-bold' >Bar Chart Status - {selectedMonth}</h1> </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                    <XAxis dataKey="priceRange" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="soldItems" fill='cyan' />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    );
}

export default DataTable
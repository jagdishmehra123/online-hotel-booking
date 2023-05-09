import React from 'react'

const Pagination = ({ totalPosts, postPerPage, setCurrentPage }) => {
    let pageNos = []
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNos.push(i)
    }

    return (
        <div className='home-pagination' style={
        {
            // border:'1px solid black', 
            marginTop:'1rem',
            marginBottom:'1rem',
            display:'flex',
            justifyContent:'center'
        }} >
            {pageNos.map((pageNo) => {
                return (
                    <button key={pageNo}  style={
                        {
                            backgroundColor:'lightgrey',
                            borderRadius:'1.5rem'
                        }
                    }
                    onClick={() => setCurrentPage(pageNo)}>{pageNo}</button>
                )
            })}
        </div>
    )
}

export default Pagination
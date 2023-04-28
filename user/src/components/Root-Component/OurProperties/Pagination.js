import React, { useState } from 'react'

const Pagination = ({ totalPosts, postPerPage, setCurrentPage }) => {

    let pageNos = []
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNos.push(i)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            {
                pageNos.map((pageNo, i) => {
                    return (
                        <button key={i + 1} onClick={() => setCurrentPage(pageNo)}
                            style={{ marginLeft: '0.1rem' }}>{pageNo}</button>
                    )
                })
            }
        </div>
    )
}

export default Pagination
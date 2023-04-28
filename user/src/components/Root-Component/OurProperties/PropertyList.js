import React from 'react'
import './propertyList.css'
import PropertyCard from './Property-Card/PropertyCard'



const PropertyList = ({ currentList ,searchCity}) => {
  return (
    
    <div className='card-wrapper' >
      {/* {searchCity} */}
      {
        (currentList.length <=0) ?
          (<h3 style={{opacity:0.5}}>NO PROPERTIES LISTSED</h3>) :
          (currentList.filter(property=>{
            if(searchCity===' '){
              return property
            }
            else{
              if((property.resortLocation).includes(searchCity)){
                return property
              }
            }
          })
            .map((property, i) => {
            return (
              <PropertyCard property={property} key={i + 1} />
            )
          })
          )

      }
    </div>
  )
}

export default PropertyList
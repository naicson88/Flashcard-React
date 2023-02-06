import React from 'react'
import { Pagination } from 'semantic-ui-react'

const Paginations = ({totalPages, pageChange}) => {

 return (
   <Pagination
      boundaryRange={null}
      defaultActivePage={1}
      ellipsisItem={null}
      firstItem={null}
      onPageChange={pageChange}
      lastItem={null}
      siblingRange={1}
      totalPages={totalPages}
  /> )
 }

export default Paginations
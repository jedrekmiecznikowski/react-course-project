import {Route} from 'react-router-dom'
import {HomePage} from '../pages/HomePage'
import {BagPage} from '../pages/BagPage'
import {NotFoundPage} from '../pages/NotFoundPage'
import {InitiativePage} from '../pages/InitiativePage'


export const routes = 
   (
    <>
        
        <Route path="/bag/:id" element={<BagPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </>
  )


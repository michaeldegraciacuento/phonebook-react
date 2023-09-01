import {Routes, Route} from 'react-router-dom'

import Home from '../pages/Home.js'
import Archive from '../pages/Archive.js'
import Directory from '../pages/Directory.js'
import PhoneStore from '../pages/PhoneStore.js'
import PhoneEdit from '../pages/PhoneEdit.js'

function MyRouter(){ 
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/archive" element={<Archive />}/>
            <Route path="/directory" element={<Directory />}/>
            <Route path="/phones/store" element={<PhoneStore />}/>
            <Route path="/phones/:id/edit" element={<PhoneEdit />}/>
        </Routes>
    ) 
}

export default MyRouter;
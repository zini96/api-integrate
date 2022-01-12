import React from 'react';
import ApiUsers from './components/ApiUsers';
import ApiUsersReducer from './components/ApiUsersReducer';

function ApiExam(props) {
    return (
        <div>
            {/* <ApiUsers/> */}
            <ApiUsersReducer/>
        </div>
    );
}

export default ApiExam;
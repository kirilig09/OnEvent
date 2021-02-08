import React from 'react';
import ParseCompany from './ParseCompany';
import {
    useParams
} from 'react-router-dom';

function ParseCompId() {
    let {user_id} = useParams();

    return (
        <ParseCompany user_id={user_id} />
    );
}

export default ParseCompId;
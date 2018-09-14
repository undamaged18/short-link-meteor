import React from 'react';


import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLinks from './AddLinks';
import LinksFilter from './LinksFilters';
export default () => {
return (
    <div>
        <PrivateHeader title="Short Links"/>
        <div className="wrapper">
            <LinksFilter />
            <AddLinks />
            <LinksList />
        </div>
    </div>
)
};
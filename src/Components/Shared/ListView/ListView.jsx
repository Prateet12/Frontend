import React from 'react';
import RepositoryDocument from '../RepositoryDocument/RepositoryDocument';

const ListView = ({items, title}) => {

return (
    <div>
        <h2>{title}</h2>
        <ul>
            {items.map((document, index) => (
                <li><RepositoryDocument link={document.link} title={document.title} key={index}/></li>
            ))}
        </ul>
    </div>
);
};

export default ListView;

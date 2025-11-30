import React, { useState, useEffect } from "react";
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  const limit = 10;
  const defaultDataset = data.slice(0, limit);
  
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);
  const [filteredData, setFilteredData] = useState(data);

  // Filter products by tags
  const filterTags = (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      setFilteredData(data);
      setOffset(0);
      return;
    }

    const filtered = data.filter((product) => {
      // Check if tags array exists and search through tag titles
      if (product.tags && Array.isArray(product.tags)) {
        return product.tags.some(tag => 
          tag.title && tag.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      // Also check photo_tags as fallback
      if (product.photo_tags && Array.isArray(product.photo_tags)) {
        return product.photo_tags.some(tag => 
          tag.title && tag.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return false;
    });

    setFilteredData(filtered);
    setOffset(0);
  };

  // Unified pagination handler
  const handlePageChange = (direction) => {
    if (direction === 'next') {
      setOffset(offset + limit);
    } else if (direction === 'previous') {
      setOffset(Math.max(0, offset - limit));
    }
  };

  // Update products when offset or filteredData changes
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, limit, filteredData]);

  // Check if we're at the end or start of the list
  const isAtEnd = offset + limit >= filteredData.length;
  const isAtStart = offset === 0;

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      
      <div className="mt2 mb2">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} {...product} />
          ))
        ) : (
          <div className="tc pa4">
            <p className="f4 gray">No products found matching your search.</p>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-center pa4">
        <Button 
          text="Previous" 
          handleClick={() => handlePageChange('previous')}
          disabled={isAtStart}
        />
        <Button 
          text="Next" 
          handleClick={() => handlePageChange('next')}
          disabled={isAtEnd}
        />
      </div>
    </div>
  );
};

export default CardList;
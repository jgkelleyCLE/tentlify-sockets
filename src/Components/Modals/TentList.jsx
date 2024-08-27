import React, { useState } from 'react'
import { useGetTentsByCategoryQuery, useGetTentsQuery } from '../../redux/tentApi'
import { FlexColumn, FlexRow } from '../UI';
import { Spinner, Button, Input } from '@chakra-ui/react';
import TentBadge from './TentBadge';
import { MdGroups2 } from "react-icons/md";
import { FaCheck } from 'react-icons/fa'

const TentList = ({ selectedTents, setSelectedTents, loadId }) => {

    const [selectedCategory, setSelectedCategory] = useState('Navi Trac');
    const [filterText, setFilterText] = useState('');


    const { data: tents, isLoading, isSuccess, isError, error } = useGetTentsQuery()

    const encodedCategory = encodeURIComponent(selectedCategory); // this handles the "/" in pole/century
    const { data: categoryData, isLoading: isCategoryLoading, isSuccess: isCategorySuccess } = useGetTentsByCategoryQuery(encodedCategory);

    console.log(categoryData)

    

    let content;

    if (isLoading || isCategoryLoading) {
        content = <FlexColumn><Spinner /></FlexColumn>;
    } else if (isSuccess && isCategorySuccess) {
        const filteredData = categoryData.filter(item => item.product.toLowerCase().includes(filterText.toLowerCase()) || item.tags.toLowerCase().includes(filterText.toLowerCase()));
        content = filteredData.map(item => (
            <FlexRow key={item._id} className={`bg-gray-100 justify-between p-1 rounded-lg my-2 hover:bg-gray-300 transition duration-300 ${selectedTents.includes(item) ? 'bg-green-100 border-2 border-green-300 hover:bg-green-300 transition duration-300' : ''}`}>
                <h1>{item.product}</h1>
                <Button isDisabled={selectedTents.some(tent => tent._id === item._id)} colorScheme="green" onClick={() => handleAddTent(item)}>{selectedTents.some(tent => tent._id === item._id) ? <FlexRow><FaCheck className="mr-2" /><h1>Added</h1></FlexRow> : <FlexRow><h1>Add Tent</h1></FlexRow> }</Button>
            </FlexRow>
        ));
    }

    let tentInLoad

    const handleAddTent = (item) => {

        tentInLoad = tents.some(tent => tent._id === item._id && tent.inLoad);
        setSelectedTents([...selectedTents, item]);
    }

    const handleRemoveTent = (item) => {
        setSelectedTents(selectedTents.filter(tent => tent._id !== item._id));
    }

  return (
    <div>
        
        <FlexRow className="gap-2">
                <Button 
                    className="p-2" 
                    colorScheme={selectedCategory === 'Navi Trac' ? 'blue' : 'gray'} 
                    bg={selectedCategory === 'Navi Trac' ? 'blue.500' : 'gray.300'}
                    onClick={() => setSelectedCategory('Navi Trac')}
                >
                    Navi
                </Button>
                <Button 
                    className="p-2" 
                    colorScheme={selectedCategory === 'Pole/Century' ? 'blue' : 'gray'} 
                    bg={selectedCategory === 'Pole/Century' ? 'blue.500' : 'gray.300'}
                    onClick={() => setSelectedCategory('Pole/Century')}
                >
                    Century
                </Button>
                <Button 
                    className="p-2" 
                    colorScheme={selectedCategory === 'Festival' ? 'blue' : 'gray'} 
                    bg={selectedCategory === 'Festival' ? 'blue.500' : 'gray.300'}
                    onClick={() => setSelectedCategory('Festival')}
                >
                    Festival
                </Button>
                <Button 
                    className="p-2" 
                    colorScheme={selectedCategory === 'Stage' ? 'blue' : 'gray'} 
                    bg={selectedCategory === 'Stage' ? 'blue.500' : 'gray.300'}
                    onClick={() => setSelectedCategory('Stage')}
                >
                    Stages
                </Button>
            </FlexRow>
            <Input
                placeholder="Filter by title"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                mt={4}
                mb={4}
            />
        {content}
        {/* <div className="flex flex-wrap">
            {selectedTents.map(item => (
                <TentBadge key={item._id} item={item} handleFunction={()=> handleRemoveTent(item)} />
            ))}
        </div> */}
    </div>
  )
}

export default TentList
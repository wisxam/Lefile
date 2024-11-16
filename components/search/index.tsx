import { SearchCheck } from "lucide-react";
import React from "react";

type Props = {};

const Search = (props: Props) => {
	return (
		<div className='search'>
			<SearchCheck className='search-input-wrapper' />
			<input
				type='text'
				placeholder='Search'
				className='search-input'
			/>
		</div>
	);
};

export default Search;

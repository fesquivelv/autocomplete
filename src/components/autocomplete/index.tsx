import useAutocomplete from './useAutocomplete';

import './autocomplete.css';

const Autocomplete = () => {
    const { state, handleOptionClick, handleTextChange } = useAutocomplete();

    const higlightString = (option: string) => {
        const index = option.toLowerCase().indexOf(state.text.toLowerCase());
        return (
            <>
                {option.slice(0, index)}
                <span className='highlight'>
                    {option.slice(index, index + state.text.length)}
                </span>
                {option.slice(index + state.text.length)}
            </>
        );
    };

    const renderedOptions = state.filteredData.map((option) => {
        return (
            <div
                className='option'
                onClick={() => handleOptionClick(option)}
                key={option}
            >
                {higlightString(option)}
            </div>
        );
    });

    return (
        <div className='container'>
            <input onChange={handleTextChange} value={state.text} type='text' />
            <div className='resultPanel'>{renderedOptions}</div>
        </div>
    );
};

export default Autocomplete;

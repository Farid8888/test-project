import React from 'react';
import { render, screen } from '@testing-library/react';
import IngridientList from './IngridientList';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('Initial List',()=>{
    render(<IngridientList ings={[]} loading={false} error={false}/>)
    const l = screen.getByText (/Loaded Ingredients/i)
    expect(l).toBeInTheDocument()
})
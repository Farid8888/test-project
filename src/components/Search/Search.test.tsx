import React from 'react'
import {screen} from '@testing-library/react'
import Search from './Search'
import {renderWithProviders} from '../../utils/test-utils'

describe('Initial Search',()=>{
    test('check button text',async ()=>{
         renderWithProviders(<Search/>)
         expect(screen.getByText(/Filter By/i)).toBeInTheDocument()
    })
})
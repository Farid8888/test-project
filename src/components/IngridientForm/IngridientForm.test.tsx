import {screen} from '@testing-library/react'
import IngridientForm from './IngridientForm'
import {renderWithProviders} from '../../utils/test-utils'
import userEvent from '@testing-library/user-event'



describe('IngridientForm',()=>{
    test('click button',()=>{
        renderWithProviders(<IngridientForm/>)
        const b = screen.getByRole('button',{name:'Add Ingredient'})
        expect(b).toBeInTheDocument()
    })
    // test('fetch',()=>{
    //   window.fetch = jest.fn()
    //   window.fetch.mockResolvedValueOnce({
    //     json: async ()=> [{}]
    //   })
    //   renderWithProviders(<IngridientForm/>)
    // })
})
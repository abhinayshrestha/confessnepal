import React, { useEffect } from 'react'
import { Container, StyledNavLink, StyledButton } from './styles'
import Skeleton from '@material-ui/lab/Skeleton'
import { loadCategories } from '../../Store/Actions/categoriesAction/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

function Categories() {

    const { loader, categories }  = useSelector(state => state.categoriesReducer)
    const dispatch = useDispatch();  

    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch])

    return (
        <Container>
            <div className='fixed-flex'>
                  { !loader ?
                        categories && categories.map(category => 
                              <StyledNavLink key={category._id} 
                                    to={category.link} activeClassName='active-nav' exact>
                                    <StyledButton>
                                          {category.label}
                                    </StyledButton>
                              </StyledNavLink> 
                        )  
                       :
                      <>
                        <Skeleton  width='70%' variant="rect" height='40px' style={{ borderRadius : '25px', marginTop: '10px' }}/> 
                        <Skeleton width='70%' variant="rect" height='40px' style={{ borderRadius : '25px', marginTop: '10px' }}/> 
                      </>   
                  }
                 
            </div>  
        </Container>
    )
}

export default Categories

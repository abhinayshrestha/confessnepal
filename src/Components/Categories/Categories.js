import React, { useEffect } from 'react'
import { Container, StyledNavLink, StyledButton, StyledSkeleton } from './styles'
import { loadCategories } from '../../Store/Actions/categoriesAction/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

function Categories() {

    const { loader, categories }  = useSelector(state => state.categoriesReducer)
    const dispatch = useDispatch();  

    useEffect(() => {
        categories === null && dispatch(loadCategories());
    }, [dispatch, categories])

    return (
        <Container>
            <div className='fixed-flex'>
                  { !loader ?
                        categories && categories.map(category => 
                              <StyledNavLink key={category._id} 
                                    to={`/dashboard${category.link}`} activeClassName='active-nav' exact>
                                    <StyledButton>
                                          {category.label}
                                    </StyledButton>
                              </StyledNavLink> 
                        )  
                       :
                      <>
                        <StyledSkeleton variant="rect"/> 
                        <StyledSkeleton variant="rect"/> 
                        <StyledSkeleton variant="rect"/> 
                        <StyledSkeleton variant="rect"/> 
                        <StyledSkeleton variant="rect"/> 
                      </>   
                  }
                 
            </div>  
        </Container>
    )
}

export default Categories

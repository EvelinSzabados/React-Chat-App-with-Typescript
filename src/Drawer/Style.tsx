import styled from '@emotion/styled';

export const ProfileContainer = styled.div(() => ({

    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column'
}))

export const NameContainer = styled.p(() => ({

    color: '#51588e',
    margin: '1rem auto 0 auto',
    fontSize: 25,
    fontWeight: 'bold'
}))

export const ProfileDataLabel = styled.span(() => ({
    color: '#51588e',
    margin: '0.5rem',
    fontWeight: 'bold'

}))

export const ProfileDataItem = styled.p(() => ({
    padding: '0.5rem',
    border: '1px solid #f2f2f2',
    margin: '0.5rem auto'
}))

export const ProfileDataContainer = styled.div(() => ({

}))
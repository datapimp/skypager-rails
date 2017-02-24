import React from 'react'
import { Grid } from 'semantic-ui-react'

export class PortfolioList extends React.Component {
  render() {
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>OMG</Grid.Column>
          <Grid.Column>Bye</Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default PortfolioList

if (module.hot) {
  module.hot.accept()
}
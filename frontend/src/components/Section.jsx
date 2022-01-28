import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

function Section(props) {
  const { post } = props;

  return (
    <Grid item xs={6} md={6}>
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ boxSizing: "border-box", width: "100%", height: { xs: "50vh", sm: "50vh"}, display: { xs: 'block', sm: 'block' } }}
            src={`data:image/jpeg;base64,${post.image}`}
            alt={post.imageLabel}
          />
        </Card>
    </Grid>
  );
}

export default Section;
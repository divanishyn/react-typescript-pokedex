import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';  
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function PokemonList() {
  const classes = useStyles();
  interface IResponse {
    results: [];
  }
  interface IPokemon {
    name: string;
  }
  const [response, setResponse] = useState<IResponse>({results: []});

  async function fetchData() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    res
      .json()
      .then(res => setResponse(res))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, [])

  // const CustomLink = (to) => <Link to={to} />;

  return (
    <section>
        {/* Hero unit */}
        <div className={classes.heroContent}>
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Pokédex
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Pokedex of all existing Pokemon using the PokeAPI (https://pokeapi.co/).
            The App lists all Pokemon and offers the possibility to view Details.
            </Typography>
            <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
                <Grid item>
                <Button variant="contained" color="primary">
                    Main call to action
                </Button>
                </Grid>
                <Grid item>
                <Button variant="outlined" color="primary">
                    Secondary action
                </Button>
                </Grid>
            </Grid>
            </div>
        </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}

        <List>
          {response.results && response.results.map((pokemon: IPokemon) => (
            <ListItem component="a" href={`/details/${pokemon.name}`}>
              <ListItemText>{pokemon.name}</ListItemText>
            </ListItem>
          ))}
        </List>

        <Grid container spacing={4}>
            {response.results && response.results.map((pokemon: IPokemon) => (
            <Grid item key={pokemon.name} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Heading
                    </Typography>
                    <Typography>
                    This is a media card. You can use this section to describe the content.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                    View
                    </Button>
                    <Button size="small" color="primary">
                    Edit
                    </Button>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>
        </Container>
    </section>
  );
}

export default PokemonList;

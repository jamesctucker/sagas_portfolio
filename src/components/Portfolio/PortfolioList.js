
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PortfolioList.css';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


class PortfolioList extends Component {

    render() {
        return (
            <Grid item lg={3}>
                <Card id="project-card">
                    {/* {JSON.stringify(this.props.results.thumbnail)} */}
                    <CardActionArea>
                        <CardMedia
                            component='img'
                            alt='test'
                            id='card-media'
                            image={this.props.results.thumbnail} // this is where the project image will go
                            title={this.props.results.name}
                        />
                        <CardContent>
                            <Typography id='project-name' gutterBottom variant='h5' component='h2'>
                                {this.props.results.name}
                                {/* this is where the project title will go */}
                            </Typography>
                            <Typography id='project-tag' component='p'>
                                {this.props.results.tag_id}
                                {/* this is where the project title will go */}
                            </Typography>
                            <Typography id='project-description' component="p">
                                {this.props.results.description}
                                {/* this is where the project description will go */}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {/* link will eventually be {this.props.results.github} */}
                        <Link target='_blank' rel='noopener noreferrer' href={this.props.results.github} variant='contained'>
                            <Button size="small" color="primary" id='github-btn'>
                                Github
                            </Button>
                        </Link>
                        {/* link will eventually be {this.props.results.website} */}
                        <Link target='_blank' rel='noopener noreferrer' href={this.props.results.website} variant='contained'>
                            <Button size="small" color="primary" id='website-btn'>
                                Website
                            </Button>
                        </Link>
                    </CardActions>

                </Card>
            </Grid>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
});

export default connect(mapReduxStoreToProps)(PortfolioList);



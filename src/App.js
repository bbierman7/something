import React, { Component } from 'react';
import './App.css';
import Card from "./components/Card";
import Grid from "./components/Grid";
import Nav from "./components/Nav";
import sports from "./sports.json"
// import { isUpdateExpression } from '@babel/types';

class App extends Component {
  // Setting this.state.sports to the sports json array

  state = {
    sports,
    score:0,
    topScore:0,
    scoreStatus: "Click all images only once to win!"
  }
  
  handleCardClick = id => {
    let doubleClick = false;

    let update = {
      sports: [ ...this.state.sports],
      score: this.state.score,
      topScore: this.state.topScore,
      scoreStatus: this.state.scoreStatus
    }

    update.sports.forEach(sport => {
      if (sport.id === id){
        if (sport.clicked){
            doubleClick = true;
        } else {
          sport.clicked = true;
          update.score++;
          if(update.score > update.topScore){
            update.topScore = update.score;
          }
        }

      }
    })

    if(doubleClick){
      update.sports.forEach(sport => sport.clicked = false);
      update.scoreStatus = "You've already clicked on this one! You scored: " + update.score + " points";
      update.score = 0;
    } else if(update.score && !(update.score % update.sports.length)){
      update.sports.forEach(sport => sport.clicked = false);
      update.scoreStatus = "You won! You selected all correctly.";
      update.score = 0;
    } else {
      update.scoreStatus = "Click all images only once to win!"
    }

    update.sports = update.sports.sort(() => 0.5 - Math.random());

    this.setState({sports: update.sports, score: update.score, topScore: update.topScore, scoreStatus: update.scoreStatus});
  }
  render() {
    return (
      <div>
            <Nav score={this.state.score} topScore={this.state.topScore} scoreStatus={this.state.scoreStatus}/>
            <Grid shake={!this.state.score && this.state.topScore}>
              {this.state.sports.map(sport => (
                <Card 
                  key={sport.id}
                  id={sport.id}
                  finish={this.state.score && !(this.state.score % this.state.sports.length)}
                  image={sport.image}
                  handleCardClick={()=>this.handleCardClick(sport.id)}
                />
              ))}
            </Grid>
      </div>
        )
      }
    }
    
    export default App;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Button } from 'react-bootstrap';
import TextInput from './TextInput';

class Artifact extends Component {
  constructor(...args){
    super(...args);

    this.state = {
      artifactLevel: this.props.artifacts[this.props.name].level,
    }

    this.updateArtifact = this.updateArtifact.bind(this);
    this.updateArtifactLevel = this.updateArtifactLevel.bind(this);
  }

  updateArtifact(prop, value) {
    return this.props.dispatch({
      type: 'UPDATE_ARTIFACT',
      artifact: this.props.name,
      prop,
      value,
    });
  }

  updateArtifactLevel(e) {
    const artifactLevel = (e.target.value < 0) ? 0 : e.target.value;
    this.setState({ artifactLevel });
    this.updateArtifact('level', artifactLevel);
  }

  render() {
    const { name, checked } = this.props.artifacts[this.props.name];
    return (
      <Panel className='artifact-panel' bsStyle={checked ? 'success' : 'danger'}>
        <Panel.Heading>
          <Panel.Title style={{width:'100%'}}>
          <Button
            block
            bsStyle={checked ? 'success' : 'danger'}
            onClick={e => {
              e.preventDefault();
              return this.updateArtifact('checked', !checked)
            }}
          >
            <img
              style={{
                width:'40px',
                height:'40px',
              }}
              src={`${window.origin}/images/${name.replace(/ /g, '_')}.png`}
              alt={name}
            />
            {name}
            {' '}
            <i className={`fa fa${checked ? '-check' : ''}-square-o text-info`}/>
          </Button>
        </Panel.Title>  
        </Panel.Heading>
        <Panel.Body className='text-center'>
          <TextInput
            title='Level'
            type='number'
            value={this.state.artifactLevel}
            updateValue={this.updateArtifactLevel}
          />
          {
            this.props.showExtraDetails &&
              <div>
                <p>Cost To Upgrade: </p>
                <p>Priority: </p>
              </div>
          }
        </Panel.Body>
      </Panel>
    );
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => {
  return {
    artifacts: state.artifacts.artifactList,
    showExtraDetails: state.main.toggleGroup.includes('showExtraDetails'),
  }
};

export default connect(mapStateToProps)(Artifact);

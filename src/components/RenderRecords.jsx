import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import RecordItem from './RecordItem'
import LoadingSpinner from './LoadingSpinner'
import * as recordActions from '../actions/loadRecordsActions'

export class RenderRecords extends Component {
  constructor(props){
    super(props)
    this.state = {
      recordList: [''],
      hovering: false,
      isFetching: true,
    }

    this.loadingSpinner   = this.loadingSpinner.bind(this)
    this.openYoutubeVideo = this.openYoutubeVideo.bind(this)
    this.shuffle          = this.shuffle.bind(this)

  } 

  componentWillMount() {
    this.loadingSpinner()
  }

  componentDidMount() {
    this.props.actions.recordActions.getRecordsByUsername()
    this.state.isFetching = false
  } 

  componentDidUpdate(){
    let currentVideoIndex = this.props.app.loadYoutubeVideos.videos.length - 1
    let currentVideo = this.props.app.loadYoutubeVideos.videos[currentVideoIndex].response
    if(currentVideo){
      if(currentVideo.videos === undefined){ // If no videos have been uploaded to Discogs for this record
        return
      }
      if(currentVideo.videos.length > 1){ // If there is more than one video uploaded for this record, i.e. for multiple tracks, select one randomly to open
        var randomVideo = currentVideo.videos[Math.floor(Math.random()*currentVideo.videos.length)].uri;
        this.openYoutubeVideo(randomVideo)
      } else { // If there is only one video uploaded for this record, open it
        this.openYoutubeVideo(currentVideo.videos[0].uri)
      }
    }
  }

  openYoutubeVideo(video){
    var newTab = window.open(video, '_blank')
    newTab.focus()
  }

  loadingSpinner(){
    if(this.state.isFetching) {
      return(
        <LoadingSpinner />
        )
    } else {
      return
    }
  }

  shuffle(a){
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  renderRecords() {
    let records  = this.props.app.loadRecordsByUsername.records
    var counter = 1
    console.log('records ', records)
    for (var i = 0; i < records.length; i++){
      if (records.length > 1 && records[i].response !== undefined){
        return (
          records[i].response.map(item => {
            console.log('counter', counter)
            if(counter % 4 === 0){
              console.log('Multiple of 4, ', counter)
              counter++
              return (            
                <RecordItem 
                  id={item.id}
                  key={Math.random()}
                  year={item.basic_information.year}
                  recordTitle={item.basic_information.title} 
                  imgSrc={item.basic_information.cover_image} 
                  label={item.basic_information.labels[0].name}
                  resource_url={item.basic_information.resource_url} 
                  artistName={item.basic_information.artists[0].name}
                  handleChange={this.props.actions.recordActions.getRecordById} 
                  getYoutubeVideo={this.props.actions.recordActions.fetchYoutubeVideos}
                />
              )
            } else {
              counter++
              return (              
                <RecordItem 
                  id={item.id}
                  key={Math.random()}
                  year={item.basic_information.year}
                  recordTitle={item.basic_information.title} 
                  imgSrc={item.basic_information.cover_image} 
                  label={item.basic_information.labels[0].name}
                  resource_url={item.basic_information.resource_url} 
                  artistName={item.basic_information.artists[0].name}
                  handleChange={this.props.actions.recordActions.getRecordById} 
                  getYoutubeVideo={this.props.actions.recordActions.fetchYoutubeVideos}
                />
              )
            }
          }) 
        )
      }
    }
  }

  render() {
    return (
      <div className='container record-list-container'>
        <div className='row'>
          { this.loadingSpinner() }         
          { this.renderRecords() }
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    app: state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      recordActions: bindActionCreators(recordActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(RenderRecords)
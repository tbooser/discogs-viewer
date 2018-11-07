// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import DiscogsTable from "./DiscogsTable.jsx";
// import LoadingSpinner from "./LoadingSpinner";
// import * as recordActions from "../../actions/loadRecordsActions";
// import MusicPlayerBar from "./MusicPlayerBar.jsx";
// import RecordCollectionItem from "./RecordCollectionItem.jsx";
// const _ = require("underscore");

// export class DiscogsTableContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isFetching: true
//     };

//     this.loadingSpinner = this.loadingSpinner.bind(this);
//   }

//   componentWillMount() {
//     console.log("componentWillMount - DiscogsTableContainer");
//   }

//   componentDidMount() {
//     this.props.actions.recordActions.getRecordsByUsername();
//     console.log("componentDidMount - DiscogsTableContainer");
//   }

//   componentDidUpdate() {
//     console.log("DiscogsTableContainer updated", this.props);

//     if (this.state.isFetching === true) {
//       this.setState({ isFetching: false }, console.log("Set to false"));
//     }
//   }

//   renderCollection() {
//     const records = this.props.app.loadRecordsByUsername.records;
//     for (var i = 0; i < records.length; i++) {
//       if (records.length > 1 && records[i].response !== undefined) {
//         let shuffledRecords = _.shuffle(records[i].response);
//         console.log("renderCollection");
//         return shuffledRecords.map(item => {
//           return (
//             <RecordCollectionItem
//               id={item.id}
//               key={Math.random()}
//               year={item.basic_information.year}
//               recordTitle={item.basic_information.title}
//               imgSrc={item.basic_information.cover_image}
//               label={item.basic_information.labels[0].name}
//               resource_url={item.basic_information.resource_url}
//               artistName={item.basic_information.artists[0].name}
//             />
//           );
//         });
//       }
//     }
//   }
//   // getVideoId() {
//   //   let currentVideoIndex = this.props.app.loadYoutubeVideos.videos.length - 1;
//   //   let currentVideo = this.props.app.loadYoutubeVideos.videos[
//   //     currentVideoIndex
//   //   ].response;
//   //   if (currentVideo) {
//   //     if (currentVideo.videos === undefined) {
//   //       // If no videos have been uploaded to Discogs for this record
//   //       alert("No videos have been uploaded for this record!");
//   //       return;
//   //     }
//   //     if (currentVideo.videos.length > 1) {
//   //       // If there is more than one video uploaded for this record, i.e. for multiple tracks, select one randomly to open
//   //       var randomVideo =
//   //         currentVideo.videos[
//   //           Math.floor(Math.random() * currentVideo.videos.length)
//   //         ].uri;

//   //       var slicedRandomVideo = randomVideo.slice(
//   //         randomVideo.indexOf("=") + 1,
//   //         randomVideo.length
//   //       );
//   //       this.setState({ videoId: slicedRandomVideo });
//   //       return slicedRandomVideo;
//   //     } else {
//   //       // If there is only one video uploaded for this record, open it
//   //       var singleVideo = currentVideo.videos[0].uri;
//   //       var slicedSingleVideo = singleVideo.slice(
//   //         singleVideo.indexOf("=") + 1,
//   //         singleVideo.length
//   //       );
//   //       this.setState({ videoId: slicedSingleVideo });
//   //       return slicedSingleVideo;
//   //     }
//   //   }
//   // }

//   loadingSpinner() {
//     const collection = this.renderCollection();

//     if (this.state.isFetching) {
//       return (
//         <div className="container">
//           <div className="row">
//             <LoadingSpinner />
//           </div>
//         </div>
//       );
//     } else {
//       return [
//         <div className="table-container pt-4 container" key={Math.random()}>
//           <div className="row">
//             <DiscogsTable collection={collection} />
//           </div>
//         </div>,
//         <MusicPlayerBar key={Math.random()} />
//       ];
//     }
//   }

//   render() {
//     const loadingSpinner = this.loadingSpinner();

//     return <div className="">{loadingSpinner}</div>;
//   }
// }

// function mapStateToProps(state) {
//   return {
//     app: state
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       recordActions: bindActionCreators(recordActions, dispatch)
//     }
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(
//   DiscogsTableContainer
// );

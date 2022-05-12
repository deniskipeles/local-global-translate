import React, { useState, useEffect } from "react";


 
const Player = ({obj}) => {
  return(
    <div id="audiowrap">
      {obj.word_audio ? 
      <div id="audio0">
        <h4 class="card-title">{obj.from_language}</h4>
          <audio id="audio1" preload controls src={obj.word_audio}>Your browser does not support HTML5 Audio! 😢</audio>
      </div>
      : null}
      {obj.translate_audio ? 
      <div id="audio0">
        <h4 class="card-title">{obj.to_language}</h4>
          <audio id="audio1" preload controls src={obj.translate_audio}>Your browser does not support HTML5 Audio! 😢</audio>
      </div>
      : null}
  </div>
  )
}

export default Player;

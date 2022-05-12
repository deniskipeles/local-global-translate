import React, { useState, useEffect } from "react";


 


/*
const Player = () => {
  try {
      const AudioContext =
        window.OfflineAudioContext ||
        window.webkitOfflineAudioContex;
      const context = new AudioContext(1, 5000, 44100)
      
      const oscillator = context.createOscillator()
      oscillator.type = "triangle"
      oscillator.frequency.value = 1000
      
      const compressor = context.createDynamicsCompressor()
      compressor.threshold.value = -50
      compressor.knee.value = 40
      compressor.ratio.value = 12
      compressor.reduction.value = 20
      compressor.attack.value = 0
      compressor.release.value = 0.2
      
      oscillator.connect(compressor)
      compressor.connect(context.destination);
      
      oscillator.start()
      context.oncomplete = event => {
        // We have only one channel, so we get it by index
        const samples = event.renderedBuffer.getChannelData(0)
      };
      context.startRendering()
      
      function calculateHash(samples) {
        let hash = 0
        for (let i = 0; i < samples.length; ++i) {
          hash += Math.abs(samples[i])
        }
        return hash
      }
      
  } catch (err) {
    console.log("Oops, `window` is not defined")
  }

  return (
    <div>
      <button onClick={()=>{}}>Audio</button>
    </div>
  );
};
*/

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

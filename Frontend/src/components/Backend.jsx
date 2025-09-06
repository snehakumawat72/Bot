import React, { useEffect, useRef } from 'react';
import './VapiAssistant.css'; 

const VapiAssistant = () => {
  const containerRef = useRef(null);
  const vapiRef = useRef(null);

  useEffect(() => {
   const waitForVapi = setInterval(() => {
  if (window.vapiSDK) {
    clearInterval(waitForVapi);

    const vapi = window.vapiSDK.run({
      apiKey: '9ec4bdca-d9c4-406d-a16e-7d796dc2cffc',
      assistant: '26ebf173-6e0e-4c5f-bb82-5bd5123e16ba',
      config: {
        containerId: 'vapi-container',
        buttonText: '🎤 Start Interview',
      }
    });

    vapiRef.current = vapi;
  }
}, 300);


    return () => {
      clearInterval(waitForVapi);
    };
  }, []);



  return (
    <div className="vapi-wrapper">
      <h1 className="vapi-title">🎯 AceBOT: Backend Interview</h1>
      <p className="vapi-description">
        Get ready to ace your Backend interview with real-time voice interaction.
        Click below to start your mock session with our intelligent assistant!
      </p>
      <div id="vapi-container" ref={containerRef} className="vapi-button-container"></div>
    </div>
  );
};

export default VapiAssistant;


 
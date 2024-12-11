import { useState, useEffect, useRef } from 'react';
import { useSettings } from '../contexts/SettingsContext';

export function useVoiceChat() {
  const { settings } = useSettings();
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(settings?.voiceChat?.autoMute ?? true);
  const mediaStream = useRef(null);
  const audioContext = useRef(null);
  const analyzer = useRef(null);

  const connect = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      
      audioContext.current = new AudioContext();
      analyzer.current = audioContext.current.createAnalyser();
      const source = audioContext.current.createMediaStreamSource(stream);
      source.connect(analyzer.current);
      
      setIsConnected(true);
      
      // Voice activity detection
      const bufferLength = analyzer.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const checkAudio = () => {
        if (!analyzer.current) return;
        
        analyzer.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / bufferLength;
        setIsSpeaking(average > 30); // Threshold for voice detection
        
        requestAnimationFrame(checkAudio);
      };
      
      checkAudio();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const disconnect = () => {
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach(track => track.stop());
      mediaStream.current = null;
    }
    
    if (audioContext.current) {
      audioContext.current.close();
      audioContext.current = null;
      analyzer.current = null;
    }
    
    setIsConnected(false);
    setIsSpeaking(false);
  };

  const toggleMute = () => {
    if (mediaStream.current) {
      const audioTrack = mediaStream.current.getAudioTracks()[0];
      audioTrack.enabled = isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return {
    isConnected,
    isSpeaking,
    isMuted,
    connect,
    disconnect,
    toggleMute
  };
}
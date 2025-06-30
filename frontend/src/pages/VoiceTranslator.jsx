import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Languages, ArrowRightLeft } from 'lucide-react';
import { lang_for_translation } from '../constants';
const VoiceTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('es');
  const [recognition, setRecognition] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const languages=lang_for_translation;

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = fromLang;
      recog.interimResults = false;
      recog.onstart = () => setIsListening(true);
      recog.onend = () => setIsListening(false);
      recog.onerror = () => setIsListening(false);
      recog.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInputText(transcript);
      };
      setRecognition(recog);
      setSpeechSupported(true);
    }
  }, [fromLang]);

  const startListening = () => recognition?.start();
  const stopListening = () => recognition?.stop();

  const speakText = (text, lang) => {
    if ('speechSynthesis' in window && text.trim()) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }, 200);
    }
  };

  const translateText = async () => {
    if (!inputText.trim() || fromLang === toLang) {
      setTranslatedText(inputText);
      return;
    }

    setIsTranslating(true);
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${fromLang}|${toLang}`
      );
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText || 'Translation failed');
    } catch (e) {
      setTranslatedText('Error occurred while translating');
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    if (inputText.trim()) {
      const timeout = setTimeout(() => translateText(), 800);
      return () => clearTimeout(timeout);
    } else {
      setTranslatedText('');
    }
  }, [inputText, fromLang, toLang]);

  const swapLanguages = () => {
    setFromLang(prev => {
      setToLang(prev);
      return toLang;
    });
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const clearAll = () => {
    setInputText('');
    setTranslatedText('');
    window.speechSynthesis.cancel();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-800 mb-2 flex items-center justify-center gap-3">
            <Languages className="text-600" size={40} /> Voice Translator
          </h1>
          <p className="text--600">Speak, type, and translate instantly</p>
        </div>

        <div className="rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={swapLanguages}
              className="mt-6 p-3 rounded-full"
              title="Swap languages"
            >
              <ArrowRightLeft size={20} className="text-blue-600" />
            </button>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select
                value={toLang}
                onChange={(e) => setToLang(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-800">
                {languages.find(l => l.code === fromLang)?.name || 'Source'}
              </h3>
              <div className="flex gap-2">
                {speechSupported && (
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2 rounded-full ${isListening ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}
                  >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                )}
                <button
                  onClick={() => speakText(inputText, fromLang)}
                  disabled={!inputText.trim()}
                  className="p-2 bg-green-100 text-green-600 rounded-full disabled:opacity-50"
                >
                  <Volume2 size={20} />
                </button>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? 'Listening...' : 'Type or speak to translate...'}
              className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none"
              disabled={isListening}
            />

            {isListening && (
              <div className="mt-3 flex items-center gap-2 text-red-600">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-sm">Listening...</span>
              </div>
            )}
          </div>

          <div className=" rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-800">
                {languages.find(l => l.code === toLang)?.name || 'Translation'}
              </h3>
              <button
                onClick={() => speakText(translatedText, toLang)}
                disabled={!translatedText.trim()}
                className="p-2 bg-green-100 text-green-600 rounded-full disabled:opacity-50"
              >
                <Volume2 size={20} />
              </button>
            </div>

            <div className="w-full h-40 p-4 border border-gray-200 rounded-lg">
              {isTranslating ? (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  <span className="ml-2 text-sm">Translating...</span>
                </div>
              ) : (
                <p className="text-800 whitespace-pre-wrap">
                  {translatedText || 'Translation will appear here...'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-500 hover:bg-gray-600 text-white rounded-full"
          >
            Clear All
          </button>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>{speechSupported ? 'Click the microphone to use voice input' : 'Voice input not supported in your browser'}</p>
          <p className="mt-1">Powered by MyMemory Translation API</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceTranslator;

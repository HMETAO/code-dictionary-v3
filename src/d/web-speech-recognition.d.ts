// web-speech-recognition.d.ts

declare var webkitSpeechRecognition: {
    new(): SpeechRecognition;
};

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;

    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionError) => void) | null;
    onend: (() => void) | null;

    start(): void;

    stop(): void;

    abort(): void;
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionError extends Event {
    error: string;
}

interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;

    length: number;
}

interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;

    length: number;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

import { useState } from "react";

// Same-origin endpoint: api/ask.js (retrieval only, no LLM)
const API_URL = "";
const API_BASE = API_URL ? API_URL.replace(/\/$/, "") : "";

const GREETING =
    "👋 Hello! I'm <b>ADCET AI Assistant</b>.\n\nI can help you with admissions, courses, faculty, placements, hostel, scholarships and contact details.\n\nHow can I help you today?";

const QUICK_QUESTIONS = [
    { icon: "🎓", label: "Admissions", question: "How do I apply for admission?" },
    { icon: "📚", label: "Courses", question: "What courses are offered at ADCET?" },
    { icon: "👨‍🏫", label: "Faculty", question: "Who is the HOD of Computer Science?" },
    { icon: "💼", label: "Placements", question: "What is the highest package in placements?" },
    { icon: "🏠", label: "Hostel", question: "Does ADCET provide hostel facilities?" },
    { icon: "📞", label: "Contact", question: "How can I contact ADCET?" }
];


function AIAssistant() {

    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([
        { id: 1, text: GREETING, sender: "bot", html: true }
    ]);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const nextId = () => Date.now() + Math.random();


    /* --------------------------------------------------------
       ASK QUESTION
       -------------------------------------------------------- */

    async function askQuestion(questionText = null) {

        if (isLoading) return;

        const question = (questionText ?? input).trim();

        if (!question) return;

        setIsLoading(true);
        setMessages((prev) => [
            ...prev,
            { id: nextId(), text: question, sender: "user" }
        ]);
        setInput("");

        try {

            const response = await fetch(`${API_BASE}/api/ask`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question })
            });

            if (!response.ok) throw new Error("Server error");

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    id: nextId(),
                    text: data.answer,
                    sender: "bot",
                    source: data.title
                }
            ]);

        } catch {

            setMessages((prev) => [
                ...prev,
                {
                    id: nextId(),
                    text: "⚠️ Sorry, I couldn't connect to the assistant. Please try again in a moment.",
                    sender: "bot"
                }
            ]);

        } finally {
            setIsLoading(false);
        }
    }


    /* --------------------------------------------------------
       NEW CHAT
       -------------------------------------------------------- */

    function clearChat() {

        if (isLoading) return;

        setMessages([
            { id: nextId(), text: "👋 Hello again! I'm ADCET AI Assistant. How can I help you?", sender: "bot", html: true }
        ]);
    }


    /* --------------------------------------------------------
       RENDER
       -------------------------------------------------------- */

    return (
        <>
            <button
                className="ai-widget-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                🤖 {isOpen ? "Close AI" : "Ask ADCET AI"}
            </button>

            {isOpen && (
                <div className="ai-chat-box">

                    {/* HEADER */}

                    <div className="ai-header">

                        <div className="ai-clinic-info">

                            <div className="ai-logo">🎓</div>

                            <div>
                                <h1>ADCET AI Assistant</h1>
                                <p>Annasaheb Dange College of Engineering and Technology, Ashta</p>
                            </div>

                        </div>

                        <div className="ai-online">
                            <span className="ai-online-dot"></span>
                            Online
                        </div>

                    </div>


                    {/* QUICK QUESTIONS */}

                    <div className="ai-quick-area">

                        <div className="ai-quick-title">Quick questions</div>

                        <div className="ai-quick-buttons">

                            {QUICK_QUESTIONS.map((item) => (
                                <button
                                    key={item.label}
                                    className="ai-quick-btn"
                                    onClick={() => askQuestion(item.question)}
                                >
                                    {item.icon} {item.label}
                                </button>
                            ))}

                        </div>

                    </div>


                    {/* CHAT */}

                    <div className="ai-chat-body">

                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`ai-message ${message.sender}`}
                            >
                                <div className="ai-message-content">

                                    <div className="ai-avatar">
                                        {message.sender === "bot" ? "🤖" : "👤"}
                                    </div>

                                    <div>
                                        <div className="ai-bubble">
                                            {message.html
                                                ? message.text.split("\n").map((line, index) => (
                                                    <span key={index}>
                                                        {line.includes("<b>") ? (
                                                            <span
                                                                dangerouslySetInnerHTML={{ __html: line }}
                                                            />
                                                        ) : (
                                                            line
                                                        )}
                                                        <br />
                                                    </span>
                                                ))
                                                : message.text}
                                        </div>

                                        {message.source && (
                                            <div className="ai-source">
                                                📄 {message.source}
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))}


                        {/* TYPING */}

                        {isLoading && (
                            <div className="ai-message bot">
                                <div className="ai-message-content">

                                    <div className="ai-avatar">🤖</div>

                                    <div className="ai-bubble">
                                        <div className="ai-typing">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>


                    {/* INPUT */}

                    <div className="ai-input-area">

                        <div className="ai-input-row">

                            <input
                                type="text"
                                placeholder="Ask something about the college..."
                                value={input}
                                autoComplete="off"
                                onChange={(event) => setInput(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        askQuestion();
                                    }
                                }}
                            />

                            <button
                                className="ai-send-btn"
                                onClick={() => askQuestion()}
                                disabled={isLoading}
                            >
                                ➤
                            </button>

                        </div>

                        <div className="ai-bottom-row">

                            <span className="ai-powered">
                                Powered by ADCET AI
                            </span>

                            <button className="ai-clear-btn" onClick={clearChat}>
                                🔄 New Chat
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}

export default AIAssistant;

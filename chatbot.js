const { useState } = React;

const LifeLinkChatbot = () => {
    const [showChat, setShowChat] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { role: 'ai', text: 'Hello! I am your LifeLink Assistant. I can explain MELD scores, genetic matching, or help you with your organ pledge. How can I assist you today?' }
    ]);

    const handleChatSend = () => {
        if (!chatInput.trim()) return;
        const userMsg = { role: 'user', text: chatInput };
        setChatMessages(prev => [...prev, userMsg]);
        const input = chatInput.toLowerCase();
        setChatInput('');
        
        setTimeout(() => {
            let reply = "That's a great question. Are you interested in donor registration details or how our medical matching engine works?";
            if (input.includes('meld')) reply = "The MELD score measures liver disease severity from 6 to 40. Higher scores indicate greater urgency for transplant.";
            else if (input.includes('pledge') || input.includes('register')) reply = "Registration is easy! Just click 'Pledge' in the menu. Your data is synced directly with NOTTO.";
            else if (input.includes('match') || input.includes('hla')) reply = "Our BioMatch Engine uses HLA genetic markers and blood type compatibility to ensure the highest graft survival rate.";
            else if (input.includes('hospital')) reply = "The Hospital Portal is a secure dashboard for surgeons to perform real-time organ allocation.";
            
            setChatMessages(prev => [...prev, { role: 'ai', text: reply }]);
        }, 600);
    };

    return (
        <div className="fixed bottom-10 right-10 z-[100] font-sans">
            {showChat && (
                <div className="absolute bottom-24 right-0 w-80 md:w-96 bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5">
                    <div className="bg-[#2CA4CE] p-6 text-white flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <i data-lucide="message-square" className="w-5 h-5"></i>
                            <span className="font-bold uppercase text-xs tracking-widest">Assistant AI</span>
                        </div>
                        <i data-lucide="x" className="w-5 h-5 cursor-pointer opacity-50 hover:opacity-100" onClick={() => setShowChat(false)}></i>
                    </div>
                    <div className="h-80 p-6 overflow-y-auto space-y-4 bg-slate-50">
                        {chatMessages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-2xl text-xs max-w-[80%] ${msg.role === 'user' ? 'bg-[#006FB7] text-white shadow-md' : 'bg-white text-slate-600 shadow-sm border border-slate-100'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-white border-t flex gap-2">
                        <input 
                            type="text" 
                            className="flex-1 bg-slate-100 border-none rounded-xl p-3 text-xs outline-none focus:ring-1 ring-[#00A29E]" 
                            placeholder="Type your message..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                        />
                        <button onClick={handleChatSend} className="bg-[#00A29E] text-white p-3 rounded-xl shadow-lg hover:bg-[#00817d]">
                            <i data-lucide="send" className="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            )}
            <button 
                onClick={() => {
                    setShowChat(!showChat);
                    setTimeout(() => lucide.createIcons(), 50);
                }}
                className="w-16 h-16 bg-[#006FB7] text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition-transform group"
            >
                <i data-lucide="message-square" className="w-8 h-8 group-hover:rotate-12 transition-transform"></i>
            </button>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('chatbot-root'));
root.render(<LifeLinkChatbot />);
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, MessageCircle, Bot, Code, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch"; // Assuming you have a Switch component from shadcn/ui; install if needed: npx shadcn-ui@latest add switch
import { useState, useRef, useEffect, useMemo } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import promptData from "../data/sarvisPrompt.json"; // Adjusted: Move sarvisPrompt.json to src/data/ for this path to work

const Contact = () => {
  // --- Mode Toggle State ---
  const [mode, setMode] = useState("viewer"); // 'viewer' or 'dev'

  // --- Form state ---
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // --- Chatbot state ---
  const [chatSession, setChatSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sarvisPrompt, setSarvisPrompt] = useState(""); 
  const messagesEndRef = useRef(null);

  // --- Load prompt from JSON module (no fetch needed) ---
  useEffect(() => {
    setSarvisPrompt(promptData.prompt || "");
  }, []);

  // --- Animations ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.6 } },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };



  // --- Chatbot logic ---
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = useMemo(() => new GoogleGenerativeAI(GEMINI_API_KEY), []);

  useEffect(() => {
    const initChat = async () => {
      if (!sarvisPrompt) return; // Wait until prompt is loaded
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const session = await model.startChat({
        history: [
          { role: "user", parts: [{ text: sarvisPrompt }] },
          { role: "model", parts: [{ text: "Sarvis here 🚀 Ready to tell about my boss work ethics and evn more" }] },
        ],
      });
      setChatSession(session);
    };
    if (GEMINI_API_KEY && sarvisPrompt) initChat();
  }, [genAI, GEMINI_API_KEY, sarvisPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim() || !chatSession) return;
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setUserInput("");
    setIsTyping(true);

    try {
      const result = await chatSession.sendMessage(userInput);
      const botReply = result.response.text();
      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Oops! Something went wrong. Try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // --- Dev Mode Extras (Simple, Direct: Like a Web Dev Explaining Step-by-Step) ---
  const devRoadmapSnippet = `// Quick Build Guide: How I Made This Site (Ask Sarvis for Details!)
// 1. Start: npx create-vite fd1 --template react && npm i
// 2. Style: npx shadcn-ui init && add button, input, switch
// 3. Animate: npm i framer-motion lucide-react
// 4. AI: npm i @google/generative-ai && set VITE_GEMINI_API_KEY
// 5. Backend: JSON prompt for bot
// Deploy: vercel. Boom! 🚀`;

  const architectureDiagram = `Frontend (React/Vite) ←→ Backend (Express)
                  ↓
              Gemini AI (Chat)
                  ↓
             Local JSON (Prompts)`;

  // --- UI ---
  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-8 bg-gray-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/20 opacity-50"></div>
      
      {/* Mode Toggle - Sticky Top */}
      <div className="relative z-20 flex justify-end p-4 max-w-6xl mx-auto">
        <div className="flex items-center space-x-2 bg-slate-800/50 rounded-full p-2 border border-slate-700">
          <Button
            variant={mode === "viewer" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("viewer")}
            className="text-xs"
          >
            <Eye className="w-4 h-4 mr-1" /> Viewer Mode
          </Button>
          <Switch
            checked={mode === "dev"}
            onCheckedChange={() => setMode(mode === "viewer" ? "dev" : "viewer")}
            className="data-[state=checked]:bg-cyan-600"
          />
          <Button
            variant={mode === "dev" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("dev")}
            className="text-xs"
          >
            <Code className="w-4 h-4 mr-1" /> Dev Mode
          </Button>
        </div>
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* LEFT SIDE: Form in Viewer, Dev Extras in Dev Mode */}
        <motion.div variants={childVariants} className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Let’s Collaborate 🚀
          </h1>
          <p className="text-slate-400 text-lg">
            {mode === "viewer" 
              ? "Hi! I'm Saurabh, a passionate developer inspired by Tony Stark. Share your thoughts—let's connect simply and build something awesome together." 
              : "Dev View: This page uses React hooks for state and Gemini for chat. Toggle back for easy mode. Ask Sarvis: 'Walk me through the code?'"
            }
          </p>

          
          {/* Social Links: Always Visible */}
          <div className="flex gap-4 pt-6 border-t border-slate-700">
            <a href="https://github.com/DevSars24" target="_blank" rel="noopener noreferrer"><Github className="w-6 h-6" /></a>
            <a href="https://linkedin.com/in/saurabh-singh-25639a306" target="_blank" rel="noopener noreferrer"><Linkedin className="w-6 h-6" /></a>
            <a href="mailto:saurabhsingh10060@gmail.com"><Mail className="w-6 h-6" /></a>
            <a href="https://x.com/SaurabhSin15850" target="_blank" rel="noopener noreferrer"><Bot className="w-6 h-6" /></a>
          </div>

          {/* Dev Mode: Simple Extras (Web Dev Explaining Scenario) */}
          {mode === "dev" && (
            <div className="space-y-4 mt-6 p-4 bg-slate-800/50 rounded-xl border border-cyan-500/30">
              <h3 className="text-lg font-semibold flex items-center gap-2"><Code className="w-5 h-5" /> Build This Site (Step-by-Step Guide)</h3>
              <pre className="bg-black/20 p-3 rounded text-xs overflow-x-auto font-mono text-cyan-300">
                {devRoadmapSnippet}
              </pre>
              <h3 className="text-lg font-semibold flex items-center gap-2"><Code className="w-5 h-5" /> Flow at a Glance</h3>
              <pre className="bg-black/20 p-3 rounded text-xs overflow-x-auto font-mono text-purple-300">
                {architectureDiagram}
              </pre>
        
             
            </div>
          )}
        </motion.div>

        {/* CHATBOT: Always There, Mode-Aware */}
        <motion.div variants={childVariants} className="bg-slate-900/70 border border-slate-700 rounded-2xl flex flex-col overflow-hidden h-[550px]">
          <div className="flex items-center gap-3 p-4 border-b border-slate-700">
            <Bot className="w-6 h-6 text-cyan-400" />
            <h2 className="font-semibold text-lg">Sarvis – Your Guide</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-slate-400 text-center">
                {mode === "viewer" 
                  ? "Hey! Ask me about Saurabh's story, his Marvel love, or a quick hello. What's on your mind today?" 
                  : "Dev Chat: 'How's the React state managed here?' or 'Roadmap tweaks?' Sarvis knows—simple Q&A style."
                }
              </p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`p-3 rounded-xl max-w-[75%] ${msg.role === "user" ? "bg-cyan-600/20" : "bg-slate-700/50"}`}
                  dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, "<br>") }}
                />
              </div>
            ))}
            {isTyping && <p className="text-sm text-slate-500">Sarvis typing...</p>}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-slate-700 flex gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={mode === "viewer" ? "Type a message—like 'Tell me about your projects!'" : "Dev ask: 'Explain useEffect here?'"}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!userInput.trim() || isTyping}>
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, MessageCircle, Bot, Code, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Added for message input
import { useState, useRef, useEffect, useMemo } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import promptData from "../data/sarvisPrompt.json"; // JSON prompt

// --- Local Switch component (avoids import/build issues) ---
const Switch = ({ checked, onCheckedChange, className }) => (
  <button
    onClick={() => onCheckedChange(!checked)}
    className={`w-12 h-6 rounded-full ${checked ? "bg-cyan-400" : "bg-slate-600"} ${className || ""}`}
  >
    <span
      className={`block w-6 h-6 bg-white rounded-full transform ${
        checked ? "translate-x-6" : "translate-x-0"
      } transition-transform`}
    />
  </button>
);

const Contact = () => {
  const [mode, setMode] = useState("viewer");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [chatSession, setChatSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sarvisPrompt, setSarvisPrompt] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setSarvisPrompt(promptData.prompt || "");
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.6 } },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = useMemo(() => new GoogleGenerativeAI(GEMINI_API_KEY), []);

  useEffect(() => {
    const initChat = async () => {
      if (!sarvisPrompt) return;
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const session = await model.startChat({
        history: [
          { role: "user", parts: [{ text: sarvisPrompt }] },
          { role: "model", parts: [{ text: "Sarvis here 🚀 Ready to tell about my boss work ethics and even more" }] },
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

  const devRoadmapSnippet = `// Quick Build Guide: How I Made This Site
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

  // Form submission handler (added since formData is defined but not used)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call or email send
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-8 bg-gray-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/20 opacity-50"></div>

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
        {/* LEFT SIDE */}
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

          {/* Contact Form (added since formData suggests a form) */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleFormChange}
              rows={4}
              required
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Send className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
            {submitStatus === "success" && (
              <p className="text-green-400 text-sm">Message sent! I'll get back to you soon. 🚀</p>
            )}
          </form>

          <div className="flex gap-4 pt-6 border-t border-slate-700">
            <a href="https://github.com/DevSars24" target="_blank" rel="noopener noreferrer"><Github className="w-6 h-6" /></a>
            <a href="https://linkedin.com/in/saurabh-singh-25639a306" target="_blank" rel="noopener noreferrer"><Linkedin className="w-6 h-6" /></a>
            <a href="mailto:saurabhsingh10060@gmail.com"><Mail className="w-6 h-6" /></a>
            <a href="https://x.com/SaurabhSin15850" target="_blank" rel="noopener noreferrer"><Bot className="w-6 h-6" /></a>
          </div>

          {mode === "dev" && (
            <div className="space-y-4 mt-6 p-4 bg-slate-800/50 rounded-xl border border-cyan-500/30">
              <h3 className="text-lg font-semibold flex items-center gap-2"><Code className="w-5 h-5" /> Build This Site (Step-by-Step Guide)</h3>
              <pre className="bg-black/20 p-3 rounded text-xs overflow-x-auto font-mono text-cyan-300">{devRoadmapSnippet}</pre>
              <h3 className="text-lg font-semibold flex items-center gap-2"><Code className="w-5 h-5" /> Flow at a Glance</h3>
              <pre className="bg-black/20 p-3 rounded text-xs overflow-x-auto font-mono text-purple-300">{architectureDiagram}</pre>
            </div>
          )}
        </motion.div>

        {/* CHATBOT */}
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
                  className={`p-3 rounded-xl max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-700 text-slate-200"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-xl bg-slate-700 text-slate-200">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={sendMessage} disabled={!userInput.trim() || isTyping} size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
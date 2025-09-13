// src/components/ContactForm.tsx
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export const ContactForm = () => {
    return (
        <section id="contato" className="container mx-auto px-6 py-20">
            <motion.h2
                className="text-4xl font-bold text-center text-white mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Vamos Conversar?
            </motion.h2>
            <motion.form
                // IMPORTANTE: Substitua pelo seu endpoint do Formspree
                action="https://formspree.io/f/SEU_ENDPOINT_AQUI"
                method="POST"
                className="max-w-xl mx-auto space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name" // Atributo 'name' é necessário para o Formspree
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Seu nome completo"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email" // Atributo 'name' é necessário para o Formspree
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="seu.email@exemplo.com"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Mensagem</label>
                    <textarea
                        id="message"
                        name="message" // Atributo 'name' é necessário para o Formspree
                        rows={5}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                        placeholder="Deixe sua mensagem aqui..."
                        required
                    ></textarea>
                </div>
                <div className="text-center">
                    <motion.button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-indigo-600/30 transition-all"
                        whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Enviar Mensagem
                        <Send size={18} />
                    </motion.button>
                </div>
            </motion.form>
        </section>
    );
};
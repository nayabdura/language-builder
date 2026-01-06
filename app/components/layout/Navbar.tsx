"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Animation Variants
    const menuVariants = {
        closed: {
            opacity: 0,
            y: -20,
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: -10 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6">
            <nav className="mx-auto max-w-7xl relative">
                <div className="bg-[#FDF8F3]/95 backdrop-blur-md rounded-2xl border border-[#e8dfd5] px-6 py-3 shadow-sm flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        <div className="bg-[#582066] text-[#F3C178] w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                            LB
                        </div>
                        <span className="text-[#582066] font-bold text-xl tracking-tight hidden sm:block">
                            Language <span className="text-slate-800">Builders</span>
                        </span>
                    </Link>

                    {/* Desktop Menu (Laptops/Desktops) */}
                    <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium tracking-tight text-slate-700">
                        <li><Link href="/" className="hover:text-[#582066] transition-colors">Home</Link></li>
                        <li><Link href="/about" className="hover:text-[#582066] transition-colors">About</Link></li>
                        <li><Link href="/pricing" className="hover:text-[#582066] transition-colors">Pricing</Link></li>
                        <li><Link href="/reviews" className="hover:text-[#582066] transition-colors">Reviews</Link></li>

                        {/* Subjects Dropdown */}
                        <li className="group relative py-2">
                            <button className="flex items-center gap-1 hover:text-[#582066] outline-none cursor-default">
                                Subjects
                                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 opacity-70" />
                            </button>

                            {/* Mega Menu Container */}
                            {/* 'pt-4' creates a bridge so the mouse can move from the button to the menu without it closing */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50">
                                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 w-[800px] grid grid-cols-4 gap-8">

                                    {/* Column 1 */}
                                    <div className="space-y-4">
                                        <h3 className="text-[#582066] font-bold text-xs uppercase tracking-widest">Subject</h3>
                                        <ul className="space-y-2 text-sm text-gray-500">
                                            {['English', 'Mathematics', 'Science', 'General Knowledge', 'Speaking Skills', 'Writing Skills'].map((item) => (
                                                <li key={item}><Link href="#" className="hover:text-[#582066] transition-colors">{item}</Link></li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Column 2 */}
                                    <div className="space-y-4">
                                        <h3 className="text-[#582066] font-bold text-xs uppercase tracking-widest">Grade</h3>
                                        <ul className="space-y-2 text-sm text-gray-500">
                                            {['Early Years (5–6)', 'Primary (7–9)', 'Middle (10–12)', 'Secondary / O Level'].map((item) => (
                                                <li key={item}><Link href="#" className="hover:text-[#582066] transition-colors">{item}</Link></li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Column 3 */}
                                    <div className="space-y-4">
                                        <h3 className="text-[#582066] font-bold text-xs uppercase tracking-widest">Board</h3>
                                        <ul className="space-y-2 text-sm text-gray-500">
                                            {['Aga Khan Board', 'Cambridge', 'Local Curriculum', 'Homeschooling'].map((item) => (
                                                <li key={item}><Link href="#" className="hover:text-[#582066] transition-colors">{item}</Link></li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Column 4: Featured/Mode */}
                                    <div className="bg-slate-50 p-5 rounded-2xl space-y-4">
                                        <h3 className="text-[#582066] font-bold text-xs uppercase tracking-widest">Mode</h3>
                                        <ul className="space-y-3 text-sm text-slate-700 font-semibold">
                                            {['1-to-1 Sessions', 'Small Group'].map((item) => (
                                                <li key={item} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#582066]" />
                                                    <Link href="#" className="hover:text-[#582066]">{item}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    {/* Actions & Hamburger */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/contact"
                            className="hidden md:block px-5 py-2 text-sm rounded-xl border border-[#582066] text-[#582066] font-semibold hover:bg-[#582066] hover:text-white transition-all duration-300"
                        >
                            Contact Us
                        </Link>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 text-[#582066] hover:bg-purple-50 rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Framer Motion Mobile Drawer */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="absolute top-full left-0 right-0 mt-2 lg:hidden"
                        >
                            <div className="bg-[#FDF8F3] rounded-3xl border border-[#e8dfd5] p-8 shadow-2xl overflow-hidden">
                                <motion.ul className="flex flex-col gap-6">
                                    <motion.li variants={itemVariants}><Link href="/" className="text-2xl font-bold text-[#582066]" onClick={() => setIsMenuOpen(false)}>Home</Link></motion.li>
                                    <motion.li variants={itemVariants}><Link href="/about" className="text-2xl font-bold text-[#582066]" onClick={() => setIsMenuOpen(false)}>About</Link></motion.li>
                                    <motion.li variants={itemVariants}><Link href="/pricing" className="text-2xl font-bold text-[#582066]" onClick={() => setIsMenuOpen(false)}>Pricing</Link></motion.li>

                                    <motion.div variants={itemVariants} className="h-px bg-gray-200 my-2" />

                                    <motion.li variants={itemVariants}>
                                        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Popular Subjects</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['English', 'Math', 'Science', '1-to-1'].map(sub => (
                                                <Link key={sub} href="#" className="text-slate-700 font-medium hover:text-[#582066]">{sub}</Link>
                                            ))}
                                        </div>
                                    </motion.li>

                                    <motion.li variants={itemVariants} className="pt-4">
                                        <Link
                                            href="/contact"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block text-center w-full py-4 rounded-2xl bg-[#582066] text-white font-bold text-lg shadow-lg shadow-purple-200"
                                        >
                                            Contact Us
                                        </Link>
                                    </motion.li>
                                </motion.ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    )
}

export default Navbar;
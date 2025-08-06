"use client";
import { useState } from 'react';
import '../app/page.css';
import Link from "next/link"
import Image from "next/image"
import logoImg from '../public/Serhii_Shevchenko_Logo_transparent.png';
import { ChevronDown } from "lucide-react"
import LanguageSwitcher from './LanguageSwitcher';


export default function LandingPage() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex flex-col bg-white ">

            {/* Header Section v2 */}
            <header className="header z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="flex h-16 w-full items-center px-2 md:px-4 lg:px-6 xl:px-6">
                    <div className="branding flex items-center space-x-3">
                        <a href="https://serhiishevchenko.com/">
                            <Image
                                src={logoImg}
                                alt="Serhii Shevchenko website Logo"
                                width={70}
                                height={70}
                            />
                        </a>
                        <a href="https://serhiishevchenko.com/" className="mt-[-30px]">
                            <span className="site-description text-green-600">
                                <span className="block text-2xl font-semibold">SerhiiShevchenko.com</span>
                                <span className="block text-sm">Science-based nutrition, health, fitness, biohacking</span>
                            </span>
                        </a>
                    </div>
                    {/* Hamburger icon */}
                    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <nav className={`nav flex-1 flex items-center justify-end mr-[-18px] mb-[8px] space-x-1 md:space-x-4 ${menuOpen ? 'open' : ''}`}>

                        <Link href="https://serhiishevchenko.com/" className="menu-link font-normal transition-colors hover:text-green-400">
                            Home
                        </Link>
                        <Link href="https://serhiishevchenko.com/blog/" className="menu-link font-normal transition-colors hover:text-green-400">
                            Blog
                        </Link>
                        <div className="dropdown">
                            <Link href="/#" className="menu-link flex items-center font-normal transition-colors hover:text-green-400">
                                Products <ChevronDown className="ml-1 w-4 h-4" />
                            </Link>
                            <div className="dropdown-content">
                                <Link
                                    href="https://serhiishevchenko.com/pdf-science-based-nutrition-guide-for-health-fitness-biohacking"
                                    className="menu-link font-normal transition-colors hover:text-green-400 text-green-700"
                                    data-path="https://serhiishevchenko.com/pdf-science-based-nutrition-guide-for-health-fitness-biohacking"
                                >
                                    PDF Science-based nutrition guide for health, fitness, biohacking
                                </Link>
                            </div>
                        </div>

                        <div className="dropdown">
                            <Link href="#" className="menu-link flex items-center font-normal transition-colors hover:text-green-400 text-green-700">
                                Free Resources <ChevronDown className="ml-1 w-4 h-4" />
                            </Link>
                            <div className="dropdown-content">
                                <Link href="https://exercises.serhiishevchenko.com/" className="font-normal transition-colors hover:text-green-400 !text-green-700">
                                    Free tool: Exercises by name, muscle group, equipment
                                </Link>
                                <Link href="https://serhiishevchenko.com/free-pdf-science-based-oil-free-vegan-recipes-in-30-min-or-less/" className="font-normal transition-colors hover:text-green-400">
                                    Free PDF: Oil-free Vegan Recipes
                                </Link>
                                <Link href="https://serhiishevchenko.com/4-science-based-steps-to-lose-weight-fast-without-exercising/" className="font-normal transition-colors hover:text-green-400">
                                    Free Weight Loss Guide
                                </Link>
                            </div>
                        </div>
                        <Link href="https://serhiishevchenko.com/about-me/" className="menu-link font-normal transition-colors hover:text-green-400">
                            About me
                        </Link>
                        <Link href="https://serhiishevchenko.com/contact-me/" className="menu-link font-normal transition-colors hover:text-green-400">
                            Contact me
                        </Link>
                        <LanguageSwitcher />
                    </nav>
                </div>
            </header>
        </div>
    )
}

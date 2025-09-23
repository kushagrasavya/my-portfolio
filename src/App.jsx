import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';

// --- SVG Icons (Existing code - no changes) ---

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.238-2.082.193.616 1.921 2.396 3.313 4.522 3.352-1.796 1.407-4.066 2.246-6.522 2.246-.423 0-.84-.025-1.25-.073 2.323 1.493 5.078 2.366 7.994 2.366 9.593 0 14.85-7.954 14.85-14.85 0-.226 0-.452-.015-.678.966-.698 1.8-1.57 2.464-2.548z" />
  </svg>
);

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);


// --- Animated Component Wrapper ---

const AnimatedSection = ({ children, customClass = "" }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={customClass}
        >
            {children}
        </motion.div>
    );
};


// --- Components ---

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = ['Work', 'About', 'Blog', 'Contact'];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#" className="text-white font-bold text-xl tracking-wider">KUSHAGRA CHOUDHARY</a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">{link}</a>
                            ))}
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                            {isOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                             <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">{link}</a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

const Hero = () => {
    return (
        <section id="home" className="min-h-screen bg-black text-white flex flex-col justify-center relative overflow-hidden pt-20">
            <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 gap-px opacity-10">
                {Array.from({ length: 400 }).map((_, i) => (
                    <div key={i} className="bg-gray-800"></div>
                ))}
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-left">
                    <motion.h1 
                        className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        SOCIAL MEDIA MARKETER
                    </motion.h1>
                    <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl">
                        <motion.p 
                            className="text-lg text-gray-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            I create engaging content strategies and campaigns that drive visibility and audience growth, applying these skills to promote events and boost engagement at Ignatius SNU.
                        </motion.p>
                        <motion.p 
                            className="text-lg text-gray-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            I’m a passionate digital marketer who combines creativity, strategy, and analytics to craft engaging content and campaigns that grow and connect with audiences.
                        </motion.p>
                    </div>
                    <motion.div 
                        className="mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <a href="#contact" className="group inline-block text-lg font-semibold text-white border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                            Get in Touch <ArrowIcon />
                        </a>
                    </motion.div>
                </div>
            </div>
            <motion.div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 z-20"
                initial={{ opacity: 0, scale: 0.5, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, type: 'spring' }}
            >
                <img 
                    src="/profile_pic.jpg" 
                    alt="Kushagra Choudhary" 
                    className="rounded-full object-cover w-full h-full border-8 border-black"
                />
            </motion.div>
        </section>
    );
};

// --- NEW 'Work' Component ---
const projects = [
    {
        image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Project+One',
        title: 'QuantumLeap CRM',
        description: 'A complete redesign of a B2B CRM platform, focusing on user-friendly workflows and data visualization.',
        tags: ['UX Research', 'UI Design', 'Prototyping'],
        url: '#'
    },
    {
        image: 'https://placehold.co/600x400/2a2a2a/ffffff?text=Project+Two',
        title: 'Aura Meditation App',
        description: 'A mobile app designed to promote mindfulness through guided meditations and calming soundscapes.',
        tags: ['Mobile App Design', 'Branding', 'User Testing'],
        url: '#'
    },
    {
        image: 'https://placehold.co/600x400/0a0a0a/ffffff?text=Project+Three',
        title: 'Helios E-commerce',
        description: 'Crafting a seamless online shopping experience for a high-end fashion brand with a focus on conversion.',
        tags: ['E-commerce', 'Web Design', 'Interaction Design'],
        url: '#'
    }
];

const ProjectCard = ({ image, title, description, tags, url }) => {
    return (
        <motion.div
            className="bg-gray-900 rounded-lg overflow-hidden group"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <a href={url} target="_blank" rel="noopener noreferrer" className="block">
                <img src={image} alt={title} className="w-full h-64 object-cover" />
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-gray-400 mb-4">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span key={tag} className="bg-gray-800 text-cyan-400 text-sm font-semibold px-3 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

const Work = () => {
    return (
        <section id="work" className="min-h-screen bg-black text-white flex items-center">
            <AnimatedSection customClass="w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 text-center">Selected Work</h2>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                        ))}
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
};

const services = [
    { text: 'DIGITAL CONTENT STRATEGY', details: '', color: 'bg-cyan-400', rotation: '-rotate-3' },
    { text: 'MARKETING & CAMPAIGN MGMT', details: '', color: 'bg-pink-500', rotation: 'rotate-2' },
    { text: 'VIDEO PRODUCTION & EDITING', details: '', color: 'bg-teal-400', rotation: 'rotate-3' },
    { text: 'COMMUNITY & AUDIENCE GROWTH', details: '', color: 'bg-yellow-400', rotation: '-rotate-2' },
    { text: 'UI/UX Design', details: '', color: 'bg-orange-500', rotation: 'rotate-1' },
    { text: 'FRONT-END Development', details: '', color: 'bg-lime-400', rotation: '-rotate-1' },
];

const ServiceSticker = ({ text, details, color, rotation }) => {
    return (
        <motion.div
            className={`p-4 md:p-6 rounded-2xl shadow-lg text-black font-bold text-center cursor-pointer ${color} ${rotation}`}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <h3 className="text-xl md:text-2xl uppercase tracking-tight">{text}</h3>
            {details && <p className="text-sm md:text-base font-normal mt-1">{details}</p>}
        </motion.div>
    )
}

const Services = () => {
    return (
        <section id="work" className="py-24 bg-black">
            <AnimatedSection>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                        {services.map((service, index) => (
                            <ServiceSticker key={index} {...service} />
                        ))}
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
};

const About = () => {
    const skills = ['Content Strategy','Content Creation', 'Social Media Marketing','UI/UX','Figma','Canva', 'Video Editing','DaVinci Resolve','Adobe','Google Analytics', 'Photoshop', 'Community Building', 'HTML/CSS', 'JavaScript','React', 'Python', 'Kali Linux', 'Pentesting'];
    return (
        <section id="about" className="min-h-screen bg-black text-white flex items-center">
            <AnimatedSection customClass="w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">About Me</h2>
                            <p className="text-lg text-gray-300 mb-4">
                                I'm a Computer Science student with a passion for storytelling in the digital age. I believe the most powerful connection between a brand and its audience is built at the intersection of creative content and smart data.
                            </p>
                            <p className="text-lg text-gray-300 mb-4">
                                My journey into the world of tech has always been intertwined with a love for creative expression. This led me to co-found my university's media club, where I dove headfirst into digital content strategy. There, I discovered the thrill of transforming raw data into engaging narratives, growing our community through high-impact social campaigns and crafting over 20 trend-based reels with tools like DaVinci Resolve and CapCut.
                            </p>
                            <p className="text-lg text-gray-300 mb-4">
                               While my technical toolkit includes Python and JavaScript for robust problem-solving, my true passion lies in blending that analytical mindset with creative intuition. I thrive on figuring out why a piece of content works and how to make the next one even better. 
                            </p>
                            <p className="text-lg text-gray-300">
                                I am currently seeking a internship where I can contribute my unique mix of technical skills and creative strategy to help a team achieve digital growth.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold mb-6">My Skillset</h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill) => (
                                    <span key={skill} className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
};


const blogPosts = [
    {
        image: '/img1.png',
        category: 'Content Ideation',
        title: 'Promotion for Ignatius SNU',
        excerpt: 'Developing a creative content plan from the ground up to boost visibility and drive audience engagement for Ignatius SNU.',
        link: 'https://www.instagram.com/reel/DGHfLOyMeGj/?utm_source=ig_web_copy_link&igsh=MWc4MWFvMnl2YzhrbQ=='
    },
    {
        image: '/img2.png',
        category: 'Story Telling',
        title: 'The Story Only I Could Tell',
        excerpt: 'This project showcases how the best ideas come from personal experience, detailing the creative process of turning a childhood memory into a compelling digital story.',
        link: 'https://www.instagram.com/reel/DK1QEaUMYOo/?utm_source=ig_web_copy_link&igsh=cTVlZDNxcGZuZWVl'
    },
    {
        image: '/img3.png',
        category: 'Cybersecurity',
        title: 'Internship at Employbility.life',
        excerpt: 'An overview of my hands-on experience as an Experiential Learner at Employability.life. This project highlights my technical internship in security testing. I applied analytical skills to test APIs with Kali Linux and Postman, providing a strong foundation in technical problem-solving that complements my creative work.',
        link: 'https://www.linkedin.com/posts/kushagra-savya-choudhary-2b2152255_cybersecurity-apisecurity-securitytesting-activity-7310875779825876992-Pc-o?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD7ZACYBS_bGYNeix0e5PuUCE-P2O3bNPro'
    }
];

const BlogPostCard = ({ image, category, title, excerpt, link}) => {
    return (
        <motion.div 
            className="bg-gray-900 rounded-lg overflow-hidden group"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <a href={link} 
            className="block"
            target="_blank"
            rel="noopener noreferrer"
            >
            
                <img src={image} alt={title} className="w-full h-56 object-cover" />
                <div className="p-6">
                    <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">{category}</p>
                    <h3 className="mt-2 text-2xl font-bold text-white group-hover:text-pink-500 transition-colors duration-300">{title}</h3>
                    <p className="mt-3 text-gray-400">{excerpt}</p>
                </div>
            </a>
        </motion.div>
    );
};

const Blog = () => {
    return (
        <section id="blog" className="min-h-screen bg-black text-white flex items-center">
             <AnimatedSection customClass="w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 text-center">From the Blog</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <BlogPostCard key={index} {...post} />
                        ))}
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
};


const Footer = () => {
    return (
        <footer id="contact" className="bg-black text-gray-400 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <AnimatedSection>
                    <h2 className="text-4xl font-bold text-white mb-4">Let's Connect</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        I am actively seeking internship opportunities in digital marketing, content strategy, and social media management. Please feel free to get in touch via email or connect with me on LinkedIn.
                    </p>
                    <a href="mailto:kushagrasavya.choudhary@gmail.com" className="inline-block text-lg font-semibold bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300">
                        kushagrasavya.choudhary@gmail.com
                    </a>
                    <div className="flex justify-center space-x-6 mt-12">
                        <a href="https://x.com/Kushagra_Savya"><TwitterIcon /></a>
                        <a href="https://www.linkedin.com/in/kushagra-savya-choudhary-2b2152255/"><LinkedInIcon /></a>
                        <a href="https://github.com/kushagrasavya"><GitHubIcon /></a>
                    </div>
                    <p className="mt-12 text-sm">&copy; {new Date().getFullYear()} Kushagra Savya Choudhary. All Rights Reserved.</p>
                </AnimatedSection>
            </div>
        </footer>
    );
};

// --- FINAL App Component (UPDATED) ---

export default function App() {
  return (
    <div className="bg-black font-sans">
        <Helmet>
        {/* Meta Title */}
        <title>Kushagra Savya Choudhary - Social Media Marketer</title>

        {/* Meta tags with the 'name' attribute */}
        <meta name='title' content='Kushagra Savya Choudhary - Social Media Marketer' />
        <meta name="description" content="Explore the portfolio of Kushagra Savya Choudhary, a digital strategist and content creator who blends data-driven marketing with compelling video to build and engage online communities." />
        <meta name="keywords" content="Kushagra Savya Choudhary, Portfolio, Social Media Marketer, Content Creator, Digital Strategist, Video Production, Audience Growth, Community Building, Campaign Management, Digital Marketing, Kushagra Choudhary " />

        {/* Open Graph (og) tags */}
        <meta property="og:title" content="Kushagra Savya Choudhary - Social Media Marketer" />
        <meta property="og:description" content="Explore the portfolio of a digital strategist who blends data-driven marketing with compelling video to build and engage online communities." />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About /> 
        <Blog />
        <Footer />
      </main>
    </div>
  )
}



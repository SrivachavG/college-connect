/**
 * Data.js - Centralized Engineering Data Repository
 * Enhanced for College Connect v5.1 - Full Edition
 */
const Data = {
    colleges: [
        {
            id: 'iitb',
            name: 'IIT Bombay',
            loc: 'Mumbai, MH',
            students: '12K+',
            color: '#065f46',
            glow: 'rgba(6, 95, 70, 0.4)',
            desc: 'The prestigious Indian Institute of Technology Bombay, a global hub for Aerospace Engineering and Computer Science research.',
            established: '1958',
            ranking: '#1 Engineering',
            website: 'iitb.ac.in'
        },
        {
            id: 'bits',
            name: 'BITS Pilani',
            loc: 'Pilani, RJ',
            students: '5K+',
            color: '#1e3a8a',
            glow: 'rgba(30, 58, 138, 0.4)',
            desc: 'The Birla Institute of Technology and Science, synonymous with innovation and the strongest alumni startup ecosystem in Asia.',
            established: '1964',
            ranking: '#2 Private',
            website: 'bits-pilani.ac.in'
        },
        {
            id: 'nitk',
            name: 'NIT Surathkal',
            loc: 'Mangalore, KA',
            students: '6K+',
            color: '#b91c1c',
            glow: 'rgba(185, 28, 28, 0.4)',
            desc: 'National Institute of Technology Karnataka, legendary for its coastal research facilities and core engineering excellence.',
            established: '1960',
            ranking: '#3 NIT',
            website: 'nitk.ac.in'
        },
        {
            id: 'iisc',
            name: 'IISc Bangalore',
            loc: 'Bengaluru, KA',
            students: '4K+',
            color: '#5b21b6',
            glow: 'rgba(91, 33, 182, 0.4)',
            desc: 'The Indian Institute of Science, India\'s premier destination for advanced scientific and technological research.',
            established: '1909',
            ranking: '#1 Research',
            website: 'iisc.ac.in'
        },
        {
            id: 'dtu',
            name: 'DTU Delhi',
            loc: 'New Delhi, DL',
            students: '10K+',
            color: '#0f172a',
            glow: 'rgba(15, 23, 42, 0.4)',
            desc: 'Delhi Technological University, one of India\'s oldest and most respected engineering powerhouses.',
            established: '1941',
            ranking: '#4 State',
            website: 'dtu.ac.in'
        },
        {
            id: 'mit',
            name: 'MIT Manipal',
            loc: 'Manipal, KA',
            students: '8K+',
            color: '#9d174d',
            glow: 'rgba(157, 23, 77, 0.4)',
            desc: 'Manipal Institute of Technology, known for its diverse academic culture and world-class campus infrastructure.',
            established: '1957',
            ranking: '#5 Private',
            website: 'manipal.edu'
        },
        {
            id: 'iitd',
            name: 'IIT Delhi',
            loc: 'New Delhi, DL',
            students: '11K+',
            color: '#047857',
            glow: 'rgba(4, 120, 87, 0.4)',
            desc: 'IIT Delhi excels in multidisciplinary research and entrepreneurship with state-of-the-art labs.',
            established: '1961',
            ranking: '#2 IIT',
            website: 'iitd.ac.in'
        },
        {
            id: 'iitm',
            name: 'IIT Madras',
            loc: 'Chennai, TN',
            students: '9K+',
            color: '#dc2626',
            glow: 'rgba(220, 38, 38, 0.4)',
            desc: 'IIT Madras is renowned for its excellence in technology and cutting-edge AI research.',
            established: '1959',
            ranking: '#1 Overall',
            website: 'iitm.ac.in'
        },
        {
            id: 'vit',
            name: 'VIT Vellore',
            loc: 'Vellore, TN',
            students: '15K+',
            color: '#ea580c',
            glow: 'rgba(234, 88, 12, 0.4)',
            desc: 'Vellore Institute of Technology offers world-class education with strong industry connections.',
            established: '1984',
            ranking: '#6 Private',
            website: 'vit.ac.in'
        },
        {
            id: 'nitt',
            name: 'NIT Trichy',
            loc: 'Tiruchirappalli, TN',
            students: '7K+',
            color: '#4f46e5',
            glow: 'rgba(79, 70, 229, 0.4)',
            desc: 'NIT Trichy is a premier engineering institution with robust placement records and research output.',
            established: '1964',
            ranking: '#1 NIT',
            website: 'nitt.edu'
        },
        {
            id: 'rvce',
            name: 'RVCE Bangalore',
            loc: 'Bengaluru, KA',
            students: '6K+',
            color: '#0891b2',
            glow: 'rgba(8, 145, 178, 0.4)',
            desc: 'RV College of Engineering is known for academic excellence and strong alumni networks.',
            established: '1963',
            ranking: '#7 State',
            website: 'rvce.edu.in'
        },
        {
            id: 'coep',
            name: 'COEP Pune',
            loc: 'Pune, MH',
            students: '5K+',
            color: '#be123c',
            glow: 'rgba(190, 18, 60, 0.4)',
            desc: 'College of Engineering Pune, one of the oldest engineering colleges in India with rich heritage.',
            established: '1854',
            ranking: '#8 State',
            website: 'coep.ac.in'
        },
        {
            id: 'nitw',
            name: 'NIT Warangal',
            loc: 'Warangal, TS',
            students: '7K+',
            color: '#7c3aed',
            glow: 'rgba(124, 58, 237, 0.4)',
            desc: 'NIT Warangal is recognized for quality education and vibrant campus culture.',
            established: '1959',
            ranking: '#2 NIT',
            website: 'nitw.ac.in'
        },
        {
            id: 'iitk',
            name: 'IIT Kanpur',
            loc: 'Kanpur, UP',
            students: '9K+',
            color: '#0369a1',
            glow: 'rgba(3, 105, 161, 0.4)',
            desc: 'IIT Kanpur is a leader in aerospace and computer science programs with extensive research facilities.',
            established: '1959',
            ranking: '#3 IIT',
            website: 'iitk.ac.in'
        },
        {
            id: 'anna',
            name: 'Anna University',
            loc: 'Chennai, TN',
            students: '20K+',
            color: '#059669',
            glow: 'rgba(5, 150, 105, 0.4)',
            desc: 'Anna University is a major state university with a vast network of affiliated engineering colleges.',
            established: '1978',
            ranking: '#9 State',
            website: 'annauniv.edu'
        }
    ],

    courses: [
        { id: 'CS101', name: 'Quantum Information Systems', prof: 'Dr. Aris T.', cat: 'CompSci', level: 'Advanced', credits: 4, duration: '14 weeks' },
        { id: 'ME302', name: 'Computational Fluid Dynamics', prof: 'Prof. Sarah L.', cat: 'Physics', level: 'Core', credits: 3, duration: '12 weeks' },
        { id: 'MA201', name: 'Relativity & Spacetime Math', prof: 'Dr. Vikram S.', cat: 'Math', level: 'Core', credits: 4, duration: '16 weeks' },
        { id: 'AI404', name: 'Neural Network Architectures', prof: 'Prof. Alan T.', cat: 'CompSci', level: 'Special', credits: 3, duration: '10 weeks' },
        { id: 'PHYS101', name: 'Classical Mechanics II', prof: 'Dr. Newton G.', cat: 'Physics', level: 'Core', credits: 4, duration: '14 weeks' },
        { id: 'EE202', name: 'Nano-Semiconductor Logic', prof: 'Dr. Moore J.', cat: 'CompSci', level: 'Hardware', credits: 3, duration: '12 weeks' },
        { id: 'CS201', name: 'Data Structures & Algorithms', prof: 'Dr. Knuth D.', cat: 'CompSci', level: 'Core', credits: 4, duration: '14 weeks' },
        { id: 'ME101', name: 'Engineering Thermodynamics', prof: 'Prof. Carnot S.', cat: 'Physics', level: 'Core', credits: 3, duration: '12 weeks' },
        { id: 'EC301', name: 'Digital Signal Processing', prof: 'Dr. Fourier J.', cat: 'CompSci', level: 'Advanced', credits: 4, duration: '14 weeks' },
        { id: 'CE201', name: 'Structural Analysis', prof: 'Prof. Beam R.', cat: 'Physics', level: 'Core', credits: 3, duration: '14 weeks' },
        { id: 'CS305', name: 'Machine Learning Fundamentals', prof: 'Dr. Turing A.', cat: 'CompSci', level: 'Advanced', credits: 4, duration: '12 weeks' },
        { id: 'MA301', name: 'Complex Analysis', prof: 'Dr. Euler L.', cat: 'Math', level: 'Advanced', credits: 3, duration: '12 weeks' },
        { id: 'EE101', name: 'Circuit Theory', prof: 'Prof. Kirchhoff G.', cat: 'Physics', level: 'Core', credits: 3, duration: '14 weeks' },
        { id: 'CS401', name: 'Computer Networks', prof: 'Dr. Cerf V.', cat: 'CompSci', level: 'Core', credits: 4, duration: '14 weeks' },
        { id: 'ME401', name: 'Robotics & Automation', prof: 'Prof. Asimov I.', cat: 'Physics', level: 'Special', credits: 4, duration: '12 weeks' },
        { id: 'CH101', name: 'Engineering Chemistry', prof: 'Dr. Curie M.', cat: 'Physics', level: 'Core', credits: 3, duration: '12 weeks' },
        { id: 'CS302', name: 'Database Management Systems', prof: 'Dr. Codd E.', cat: 'CompSci', level: 'Core', credits: 4, duration: '14 weeks' },
        { id: 'MA101', name: 'Linear Algebra', prof: 'Prof. Gauss C.', cat: 'Math', level: 'Core', credits: 4, duration: '14 weeks' },
        { id: 'EE301', name: 'Control Systems', prof: 'Dr. Nyquist H.', cat: 'CompSci', level: 'Advanced', credits: 3, duration: '12 weeks' },
        { id: 'CS501', name: 'Blockchain Technology', prof: 'Prof. Nakamoto S.', cat: 'CompSci', level: 'Special', credits: 3, duration: '10 weeks' }
    ],

    files: [
        { id: 'f1', name: 'Quantum_Eng_Thesis.pdf', type: 'pdf', size: '4.2 MB', uploadedBy: 'You', date: '2 days ago', category: 'Research' },
        { id: 'f2', name: 'ML_Notes_Semester5.pdf', type: 'pdf', size: '2.8 MB', uploadedBy: 'You', date: '1 week ago', category: 'Notes' },
        { id: 'f3', name: 'CFD_Project_Report.docx', type: 'docx', size: '1.5 MB', uploadedBy: 'You', date: '3 days ago', category: 'Project' },
        { id: 'f4', name: 'Circuit_Design_Lab.pdf', type: 'pdf', size: '3.1 MB', uploadedBy: 'You', date: '5 days ago', category: 'Lab' },
        { id: 'f5', name: 'Algorithm_Analysis.pdf', type: 'pdf', size: '5.6 MB', uploadedBy: 'You', date: '1 day ago', category: 'Research' },
        { id: 'f6', name: 'Thermodynamics_Summary.pdf', type: 'pdf', size: '1.9 MB', uploadedBy: 'You', date: '1 week ago', category: 'Notes' }
    ],

    notifications: [
        { id: 1, title: 'New Course Available: Blockchain Technology', desc: 'CS501 is now open for enrollment', time: '5 min ago', type: 'course', read: false },
        { id: 2, title: 'Assignment Due Tomorrow', desc: 'CS305 Machine Learning - Project submission', time: '2 hours ago', type: 'reminder', read: false },
        { id: 3, title: 'AI Research Grant Phase II', desc: 'Unified network nodes eligible for funding', time: '1 day ago', type: 'announcement', read: true },
        { id: 4, title: 'New File Uploaded', desc: 'Algorithm_Analysis.pdf added to your vault', time: '1 day ago', type: 'file', read: true },
        { id: 5, title: 'System Maintenance Scheduled', desc: 'Platform will be offline for 2 hours on Sunday', time: '2 days ago', type: 'system', read: true }
    ],

    announcements: [
        { id: 1, title: 'AI Research Grant Phase II', desc: 'Unified network nodes eligible for funding.', time: 'Just now', type: 'announcement' },
        { id: 2, title: 'Strategic Maintenance: Node C', desc: 'Cluster C offline for vector indexing.', time: '2h ago', type: 'system' }
    ]
};

window.Data = Data;
